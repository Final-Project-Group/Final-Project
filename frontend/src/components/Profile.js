import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import TheContext from "../TheContext";
import actions from "../api";
import { useHistory } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';
import '../App.css';

function Profile(props) {
  const { user, setUser } = useContext(TheContext);
  const [userUpdated, setUserUpdated] = useState({});
  const [allEvents, setAllEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  const history = useHistory();

  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

const classes = useStyles();

  useEffect(() => {
    (async () => {
      console.log("anything");
      let res = await actions.getUser(props);
      setUserUpdated(res.data);
      let ras = await actions.getEvents()
      console.log(ras.data)
      setAllEvents(ras.data);
      console.log(user.imageUrl)
      if(!user.imageUrl) {
        let copyOfUser = { ...user };
        copyOfUser.imageUrl = 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
        setUser(copyOfUser);
      }
    })();
  }, [props]);


  const showActivities = () => {
    return allEvents?.map((eachEvent) => {
      return eachEvent.members.map((eachMember) => {
        if (eachMember._id === user._id) {
          return (
            <li className="profile-li">
                <Link 
                    to={`/eventDetails/${eachEvent._id}`} key={`${eachEvent.userId}+${eachEvent._id}`}
                    style={{ textDecoration: 'none' }}                            
                >
              <Card 
                className={classes.root}
                id="card" 
                style={{
                    borderRadius: '5%',
                    // border: '6px solid rgb(13,92,30)'
                }}
            >
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt="Image is not working"
                    height="140"
                    image={eachEvent.image}
                    title="Sport Image"
                    />
                    <CardContent style={{backgroundColor: 'rgb(75,105,40)'}}>
                        <Typography className="home-event-card" gutterBottom variant="h5" component="h2" color="textPrimary" style={{fontFamily: 'Roboto', backgroundColor: 'rgb(75,105,40)'}}>
                            <div className="home-event-typography">
                                <h4 style={{color:'white'}}>{eachEvent.eventName} {eachEvent.sport === 'soccer' ? <SportsSoccerIcon/> : eachEvent.sport === 'basketball' ? <SportsBasketballIcon/> :  <SportsTennisIcon/>}</h4>
                            </div>
                        </Typography>
                        <Typography className="home-event-info-1" color="textPrimary" style={{ background: 'rgb(75,105,40)'}}>
                            <div><span style={{color:'white'}}>{eachEvent.location}</span></div>
                            <span className="home-event-span" style={{color:'white'}}> {eachEvent.date.split('T', 1)}</span>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Typography className="home-event-info" color="textPrimary" style={{ backgroundImage: 'linear-gradient(rgb(75,105,40), black)'}}>
                    <div className="home-event-info-row">
                        <span lassName="home-event-span" style={{color:'white'}} >Creator  <br/>  {eachEvent.creator.name}</span>
                        <span style={{color:'white'}}>Spots   <br/> {eachEvent.spots - eachEvent.members.length}/{eachEvent.spots}</span>
                    </div>
                    <div className="home-event-info-middle">                                    
                    </div>
                </Typography>
              </Card>
              </Link>
              {/* <Card style={{backgroundColor: ""}}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {eachEvent.eventName}
                  </Typography>
                  <Typography variant="body2" component="p" color="textSecondary">
                    {eachEvent.description}
                    <br />
                  </Typography>
                </CardContent>
              </Card> */}
            </li>
          )
        }
      })
    })
  }

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    history.push("/signin");
  };

  const showSports = () => {
    // console.log(userUpdated.sports[1].name) // WHY THIS DOESN'T WORK??

    return userUpdated?.sports?.map((sport) => {
      return sport?.favorite ? (
        <li><h2>{`${sport?.name} >> ${sport?.level}`}</h2></li>
      ) : (
        ""
      );
    });
  };

  console.log(user);

  return (
    <div className="profile-container">
      <div className="profile-container-user-info">
          <div className="profile-border">
            <img className="profile-container-image"
              src={userUpdated.imageUrl ? userUpdated.imageUrl : user.imageUrl} 
              border="5px solid"  
            />
            <div className="profile-container-name-and-country">
              <h2 className="profile-container-name">{ userUpdated?.name ? userUpdated?.name[0].toUpperCase() + userUpdated?.name.slice(1) : userUpdated.name }</h2>
              <div 
                className="profile-container-country"
              > 
                {userUpdated.country ? userUpdated?.country[0].toUpperCase() + userUpdated?.country.slice(1) : userUpdated?.country}
              </div>
            </div>

            <ul className="profile-container-ul">
              <h2>Sports:</h2> {showSports()}
            </ul>

            <div className="profile-container-buttons">
              <div className="profile-container-edit-button">
                <Link to="/UserInfo" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      border: '4px solid rgb(75,105,40)',
                      borderRadius: '40px',
                    }}
                  >
                  Edit
                  </Button>
                </Link>
              </div>
              <div>
                <Button
                    variant="contained"
                    color="default"
                    onClick={logOut}
                    startIcon={<ExitToAppIcon />}
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      border: '4px solid rgb(75,105,40)',
                      borderRadius: '40px',
                    }}
                  >
                  Log out
                </Button>
              </div>
          </div>      
      <div className="activities">
          <h2 className="profile-container-activities">Activities:</h2>
          <ul className="profile-ul">
            {showActivities()}
          </ul>
      </div>
      </div>
      </div>
    </div>

  );
}

export default Profile;
