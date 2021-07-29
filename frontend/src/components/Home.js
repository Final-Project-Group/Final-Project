import { useEffect, useState, useContext} from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios'
import actions from '../api'
import TheContext from "../TheContext";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Navbar from "./Navbar"
import '../App.css';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';

function Home(props) {

    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
        },
      });

    const classes = useStyles();
    
    const [currSport, setCurrSport] = useState('all');
    const [sport, setSport] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const { user } = useContext(TheContext);

    useEffect( () => {
        (async () => {
            let res = await actions.getEvents()
            console.log(res)
            setAllEvents(res.data);
            setSport(res.data)
        }) ()
    }, [])

    const handleChange = (e, value) => {
        console.log(value);
        setCurrSport(value);

    }

    console.log(user);

    const showEvents = () => sport.map(event => {

        if (currSport) {
            if(event.sport === currSport) {
                return (
                    <li className="home-event-link">
                        <Link 
                            to={`/eventDetails/${event._id}`} key={`${event.userId}+${event._id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Card
                                className={classes.root}
                            >
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    alt="Image is not working"
                                    height="140"
                                    image={event.image}
                                    title="Sport Image"
                                    />
                                    <CardContent>
                                        <Typography className="home-event-card" gutterBottom variant="h5" component="h2" style={{fontFamily: 'Roboto'}}>
                                            <div className="home-event-typography">
                                                <h4>{event.eventName} {event.sport === 'soccer' ? <SportsSoccerIcon/> : event.sport === 'baxsketball' ? <SportsBasketballIcon/> :  <SportsTennisIcon/>}</h4>
                                            </div>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <div className="home-event-info">
                                    <div className="home-event-info-row">
                                        <span>{event.date.split('T', 1)}</span>
                                        <span>{event.sport}</span>
                                    </div>
                                    <div className="home-event-info-row">
                                        <span>{event.creator.name}</span>
                                        <span>spots: {event.spots - event.members.length}/{event.spots}</span>
                                    </div>
                                </div>
                            </Card>
                            <br/>
                        </Link>
                    </li>
                )
            } else if (currSport === 'all') {
                return (
                    <li className="home-event-link">
                        <Link 
                            to={`/eventDetails/${event._id}`} key={`${event.userId}+${event._id}`}
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
                                    image={event.image}
                                    title="Sport Image"
                                    />
                                    <CardContent style={{backgroundColor: 'rgb(75,105,40)'}}>
                                        <Typography className="home-event-card" gutterBottom variant="h5" component="h2" color="textPrimary" style={{fontFamily: 'Roboto', backgroundColor: 'rgb(75,105,40)'}}>
                                            <div className="home-event-typography">
                                                <h4>{event.eventName} {event.sport === 'soccer' ? <SportsSoccerIcon/> : event.sport === 'basketball' ? <SportsBasketballIcon/> :  <SportsTennisIcon/>}</h4>
                                            </div>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <Typography className="home-event-info" color="textPrimary" style={{ backgroundImage: 'linear-gradient(rgb(75,105,40), black)'}}>
                                    <div className="home-event-info-row">
                                        <span> {event.date.split('T', 1)}</span>
                                        <h5 className="home-event-location-text">{event.location}</h5>
                                    </div>
                                    <div className="home-event-info-row">
                                        <span>creator: {event.creator.name}</span>
                                        <span>spots: {event.spots - event.members.length}/{event.spots}</span>
                                    </div>
                                </Typography>
                            </Card>
                            <br/>
                        </Link>
                    </li>
                )
            }
        } 
    })
    

    return (
        <div className="home-container">
            <div className="home-container-first">
                <div className="home-container-dropdown">
                {/* <img className="home-image" src="https://images.squarespace-cdn.com/content/v1/5b46c74312b13f1c549339d0/1531794639136-WPV66CSSBMIPM2QPYEFP/Soccer-Field-Night.jpg?format=2500w" /> */}
                    {/* <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="soccer"
                        value={currSport}
                        onChange={handleChange}
                    >
                        <MenuItem value="soccer">Soccer</MenuItem>
                        <MenuItem value="basketball">Basketball</MenuItem>
                        <MenuItem value="tennis">Tennis</MenuItem>
                        <MenuItem value="all">All</MenuItem>
                    </Select> */}
                    <Tabs
                        value={currSport}
                        onChange={handleChange}
                        // indicatorColor="primary"
                        // textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        >
                        <Tab label="All" value="all" />
                        <Tab label="Soccer" value="soccer" />
                        <Tab label="Basketball" value="basketball" />
                        <Tab label="Tennis" value="tennis" />
                    </Tabs>
                </div>
                <div className="home-container-create-button">
                    <Link to="/createEvent" style={{ textDecoration: 'none' }}><Button variant="outlined" style={{border: '4px solid white', borderRadius: '40px', width: '15vw', height: '8vh', fontSize: '3vh'}}>Create Event</Button></Link>
                    <br/>
                    <h2>- OR -</h2>
                    <h2>JOIN EVENT</h2>
                </div>
            </div>
            <div className="home-container-event-list">
                <ul className="home-events-ul">
                    {showEvents()}
                </ul>
            </div>
        </div>
    );
}

export default Home;