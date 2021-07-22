import { useEffect, useState, useContext} from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios'
import actions from '../api'
import TheContext from "../TheContext";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

function Home(props) {

    const [currSport, setCurrSport] = useState('');
    const [sport, setSport] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const { user } = useContext(TheContext);

    useEffect(async () => {
        let res = await actions.getEvents()
        console.log(res)
        setAllEvents(res.data);
        setSport(res.data)
    }, [])

    const handleChange = (e) => {
        console.log(e.target.value);
        setCurrSport(e.target.value);

    }

    console.log(user);

    const showEvents = () => sport.map(event => {
        if (currSport) {
            if(event.sport === currSport) {
                return (
                    <Link to={`/eventDetails/${event._id}`}>
                        <li key={`${event.userId}+${event._id}`}>
                            <br/>
                            {event.description}
                            <br/>
                            {event.location}
                            <br/>
                            {event.date.split('T', 1)}
                            <br/>
                            {event.creator.name}
                            <br/>
                            <i>{event.userId}</i>
                        </li>
                    </Link>
                )
            } else if (currSport === 'all') {
                return (
                    <Link to={`/eventDetails/${event._id}`}>
                        <li key={`${event.userId}+${event._id}`}>
                            <br/>
                            {event.description} 
                            <br/>
                            {event.location}
                            <br/>
                            {event.date.split('T', 1)}
                            <br/>
                            {event.creator.name}
                            <br/>
                            <i>{event.userId}</i>
                        </li>
                    </Link>
                )
            }
        } 
    })
    

    return (
        <div>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="soccer"
          value={currSport}
          onChange={handleChange}
        >
          <MenuItem value="soccer">soccer</MenuItem>
          <MenuItem value="basketball">basketball</MenuItem>
          <MenuItem value="tennis">tennis</MenuItem>
          <MenuItem value="all">all</MenuItem>
        </Select>
            <br/>
            Home<br/>
            <Link to="/createEvent"><button>Create event</button></Link>
            {showEvents()}
            
        </div>
    );
}

export default Home;