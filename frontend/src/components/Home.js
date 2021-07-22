import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios'
import actions from '../api'

function Home(props) {

    const [allEvents, setAllEvents] = useState([])

    useEffect(async () => {
        let res = await actions.getEvents()
        console.log(res)
        setAllEvents(res.data)
    }, [])



    const showEvents = () => allEvents.map(event => {
        return (
            <li key={event.userId}>
                <br/>
                {event.description} 
                <br/>
                {event.location}
                <br/>
                {event.date.split('T', 1)}
                <br/>
                <i>{event.userId}</i>
            </li>
        )
    })
    

    return (
        <div>
            Home<br/>
            <Link to="/createEvent"><button>Create event</button></Link>
            {showEvents()}
            
        </div>
    );
}

export default Home;