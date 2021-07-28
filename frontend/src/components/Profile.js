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
import '../App.css';

function Profile(props) {
  const { user, setUser } = useContext(TheContext);
  const [userUpdated, setUserUpdated] = useState({});
  const [allEvents, setAllEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      console.log("anything");
      let res = await actions.getUser(props);
      setUserUpdated(res.data);
      let ras = await actions.getEvents()
      console.log(ras.data)
      setAllEvents(ras.data);
    })();
  }, [props]);


  const showActivities = () => {
    return allEvents?.map((eachEvent) => {
      return eachEvent.members.map((eachMember) => {
        if (eachMember._id === user._id) {
          return (
            <li className="profile-li">
              <Card style={{backgroundColor: ""}}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {eachEvent.eventName}
                  </Typography>
                  <Typography variant="body2" component="p" color="textSecondary">
                    {eachEvent.description}
                    <br />
                  </Typography>
                </CardContent>
              </Card>
            </li>
          )
        }
      })
    })
  }

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    history.push("/Auth");
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
       
            <img className="profile-container-image" src={userUpdated.imageUrl} />
            <div className="profile-container-name-and-country">
              <h2 className="profile-container-name">{userUpdated.name}</h2>
              <h2 className="profile-container-country">country: {userUpdated.country}</h2>
            </div>

            <ul className="profile-container-ul">
              <h2>Sports:</h2> {showSports()}
            </ul>

            <div className="profile-container-buttons">
              <div className="profile-container-edit-button">
                <Link to="/UserInfo" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<EditIcon />}
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
                  >
                  Log out
                </Button>
              </div>
            </div>
        
      </div>
      <div>
                    <h2 className="profile-container-activities">Activities:</h2>
            <ul className="profile-ul">
              {showActivities()}
            </ul>
          
      </div>
    </div>
  );
}

export default Profile;
