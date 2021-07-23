import { useState, useContext, useEffect } from 'react';
import TheContext from '../TheContext';
import actions from '../api';
import { useHistory } from 'react-router-dom';


function Profile(props) {
    const { user, setUser } = useContext(TheContext)
    const [userUpdated, setUserUpdated] = useState('')
    const history = useHistory();

    useEffect( () => {
        (async () => {            
            let res = await actions.getUser(props)
            setUserUpdated(res.data)
          })()
    })

    const logOut = () => {
        localStorage.removeItem('token')
        setUser(null)
        history.push('/Auth')
    }

    console.log(user);

    return (
        <div>
            <h2>Profile {userUpdated.name}</h2>
            <img src={userUpdated.imageUrl} />
            <h2>country: {userUpdated.country}</h2>
            <button onClick={logOut}>Log out</button>
        </div>
    );
}

export default Profile;