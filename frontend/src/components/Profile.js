import { useState, useContext, useEffect } from 'react';
import TheContext from '../TheContext';
import actions from '../api';


function Profile(props) {
    const { user, setUser } = useContext(TheContext)
    const [userUpdated, setUserUpdated] = useState('')

    useEffect( () => {
        (async () => {            
            let res = await actions.getUser(props)
            setUserUpdated(res.data)
          })()
    })

    const logOut = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    console.log(user);
    return (
        <div>
            <h2>Profile {props.user?.name}</h2>
            <img src={user?.imageUrl} />
            <h2>country: {userUpdated.country}</h2>
            <button onClick={logOut}>Log out</button>
        </div>
    );
}

export default Profile;