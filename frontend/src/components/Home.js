import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios'
import actions from '../api'

function Home(props) {

    const [allPosts, setAllPosts] = useState([])

    useEffect(async () => {
        let res = await actions.getAllPosts()
        console.log(res)
        setAllPosts(res.data)
    }, [])

    //const ShowPosts = () => allPosts.map(eachPost => <li key={eachPost._id}>{eachPost.post} <i>created by ...{eachPost.userId?.name}</i></li>)
    

    return (
        <div>
            Home
          
            <Link to="/createEvent"><button>Create event</button></Link>
                {/* <ShowPosts /> */}
            
        </div>
    );
}

export default Home;