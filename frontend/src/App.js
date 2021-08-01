import logo from "./logo.svg";
import { useEffect, useState } from "react";
import actions from "./api";
import "./App.css";
import { Switch, Link, Route } from "react-router-dom";
import TheContext from "./TheContext";
import Home from "./components/Home";
import Auth from "./components/Auth";
import SignIn from "./components/SignIn";
import AddPost from "./components/AddPost";
import Profile from "./components/Profile";
import Splash from "./components/Splash";
import UserInfo from "./components/UserInfo";
import CreateEvent from "./components/CreateEvent";
import EventDetails from "./components/EventDetails";
import EditEvent from "./components/EditEvent";
import Navbar from "./components/Navbar";
import {
  ThemeProvider,
  makeStyles,
  createTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Footer from "./components/Footer";

const themeLight = createTheme({
  palette: {
    primary: {
      dark: "rgb(75,105,40)",
      main: "rgb(75,105,40)",
    },
    secondary: {
      // dark: "rgb(75,105,40)",
      main: "rgb(75,105,40)",
    },
    background: {
      default: "#e4f0e2",
    },
    text: {
      // primary: "#000000",
      secondary: "#000000",
    },
  },
});

const themeDark = createTheme({
  palette: {
    primary: {
      // dark: "rgb(75,105,40)",
      main: "rgb(75,105,40)",
    },
    secondary: {
      // dark: "rgb(75,105,40)",
      main: "rgb(75,105,40)",
    },
    background: {
      default: "#000000",
    },
    text: {
      primary: "#ffffff",
      // secondary: "#000000",
    },
  },
});

function App() {
  let [user, setUser] = useState({});
  const [light, setLight] = useState(false);
  const [token, setToken] = useState();

  const getTheUser = async () => {
    let res = await actions.getUser();
    console.log(res);
    setUser(res.data);
    // console.log(res.data)
  };

  console.log(user);

  useEffect(() => {
    getTheUser();
  }, []);

  // function debugNavbar() {
  //   return (
  //     <div>
  //       <nav>
  //         <Link to="/home">Home</Link>
  //         <Link to='/'>Splash</Link>
  //         <Link to="/CreateEvent">Create Event</Link>
  //         <Link to="/UserInfo">User info</Link>

  //         {user?.name ?
  //         <>
  //           <Link to="/Profile">Profile</Link>
  //           <Link to="/AddPost">AddPost</Link>
  //         </>
  //         : <Link to='/Auth'>Login/Signup</Link>}
  //       </nav>
  //     </div>
  //   );
  // }

  // handler for dark theme toggle button
  const updateState = () => {
    setLight((prev) => !prev);
  };

  // if(!token) {
  //   return <SignIn setToken={setToken} />
  // }

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <TheContext.Provider value={{ user, setUser, getTheUser }}>
        <div className="App">
          {/* {Navbar()} */}
          {/* {user?.name ? <Navbar handler={updateState} /> : null} */}
          {user?._id ? <Navbar handler={updateState} light={light} /> : null}
          {/* <Button onClick={() => setLight((prev) => !prev)}>Toggle Theme</Button> */}

          {/* <i>{user?.name}</i> */}
          {/* Development navbar, comment when done! */}
          {/* <nav>
            <Link to='/home'>Home</Link>
            <Link to='/'>Splash</Link>
            <Link to='/CreateEvent'>Create Event</Link>
            <Link to='/UserInfo'>User info</Link>
            {user?.name ?
              <>
                <Link to='/Profile'>Profile</Link>
                <Link to='/AddPost'>AddPost</Link>
              </>
              : <Link to='/Auth'>Login/Signup</Link>}
          </nav> */}
          {/* {user?.name ? debugNavbar() : null} */}
          <Switch>
            <Route
              exact
              path="/editEvent/:dynamicId"
              render={(props) => <EditEvent {...props} />}
            />
            <Route
              exact
              path="/eventDetails/:dynamicId"
              render={(props) => <EventDetails {...props} />}
            />
            <Route
              exact
              path="/createEvent"
              render={(props) => <CreateEvent {...props} />}
            />
            <Route exact path="/" render={(props) => <Splash {...props} />} />
            <Route
              exact
              path="/UserInfo"
              render={(props) => <UserInfo {...props} />}
            />
            <Route exact path="/home" render={(props) => <Home {...props} />} />
            <Route
              exact
              path="/AddPost"
              render={(props) => <AddPost {...props} />}
            />
            <Route
              exact
              path="/Auth"
              render={(props) => <Auth setToken={setToken} {...props} />}
            />
            <Route
              exact
              path="/signin"
              render={(props) => <SignIn {...props} />}
            />
            <Route
              exact
              path="/Profile"
              render={(props) => <Profile {...props} user={user} />}
            />
          </Switch>
        </div>        
        {user?._id ? <Footer/> : null}
      </TheContext.Provider>
    </ThemeProvider>
  );
}

export default App;
