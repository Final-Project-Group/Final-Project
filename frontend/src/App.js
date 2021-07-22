import logo from './logo.svg';
import { useEffect, useState } from 'react';
import actions from './api';
import './App.css';
import { Switch, Link, Route } from 'react-router-dom';
import TheContext from './TheContext';
import Home from './components/Home'
import Auth from './components/Auth'
import AddPost from './components/AddPost'
import Profile from './components/Profile'
import Splash from './components/Splash'
import UserInfo from './components/UserInfo';
import CreateEvent from './components/CreateEvent';
import EventDetails from './components/EventDetails';

function App() {

  let [user, setUser] = useState({})

  const getTheUser = async () => {
    let res = await actions.getUser()
    setUser(res.data)
    // console.log(res.data)
  }

  useEffect(() => {
    getTheUser()
  }, [])

  return (
    <TheContext.Provider value={{ user, setUser, getTheUser }}>
      <div className="App">
        <i>{user?.name}</i>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/splash'>Splash</Link>
          <Link to='/CreateEvent'>Create Event</Link>
          <Link to='/UserInfo'>User info</Link>

          {user?.name ?
            <>
              <Link to='/Profile'>Profile</Link>
              <Link to='/AddPost'>AddPost</Link>
            </>
            : <Link to='/Auth'>Login/Signup</Link>}
        </nav>
        <Switch>
          
          <Route exact path="/eventDetails/:dynamicId" render={(props) => <EventDetails {...props} />} />
          <Route exact path="/createEvent" render={(props) => <CreateEvent {...props} />} />
          <Route exact path="/splash" render={(props) => <Splash {...props} />} />
          <Route exact path="/UserInfo" render={(props) => <UserInfo {...props} />} /> 
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/AddPost" render={(props) => <AddPost {...props} />} />
          <Route exact path="/Auth" render={(props) => <Auth {...props} />} />
          <Route exact path="/Profile" render={(props) => <Profile {...props} user={user} />} />

        </Switch>

      </div>
    </TheContext.Provider>
  );
}

export default App;
