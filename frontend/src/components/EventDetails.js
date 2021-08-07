import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import actions from "../api";
import TheContext from "../TheContext";
import { Link } from "react-router-dom";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import NodeGeocoder from "node-geocoder";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

const JOSE_API_KEY = process.env.REACT_APP_API_KEY;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    // color:"white",
    background: "white",
    color: "black",
    borderRadius: "40px",
  },
}));

function EventDetails(props) {
  const classes = useStyles();

  // const defaultLocation = {  lat: 25.7617, lng: 80.1918  };
  const [userPosition, setUserPosition] = useState(""); // user coordinates (from browser location)
  const [eventPosition, setEventPosition] = useState(""); // event coordinates (from geocode API call)
  const [details, setDetails] = useState({}); // event info from database, store here
  const { user } = useContext(TheContext); // user from App.js
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [commentSection, setCommentSection] = useState([]); //DELETE ONCE POST FEATURE IS IMPLEMENTED
  const [allPosts, setAllPosts] = useState([]);

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  useEffect(() => {
    (async () => {
      let res = await actions.getDetail(props); //get event info from database
      console.log(res.data);
      console.log(user);
      setDetails(res.data);
      getGeocode(res.data);
      // console.log(address)
    })();

    (async () => {
      let res = await actions.getAllPosts();
      console.log(res);
      setAllPosts(res.data);
    })();

    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("User Latitude is :", position.coords.latitude);
      console.log("User Longitude is :", position.coords.longitude);
      setUserPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [props, user]);

  // Convert event address to coordinates using Google geocode API
  const getGeocode = async (details) => {
    let convert = details?.location;
    // console.log(details?.location);
    // console.log(typeof details?.location);
    // Convert from spaces to + signs:
    // console.log(convert);
    convert = convert
      ?.split("")
      ?.map((char) => (char === " " ? "+" : char))
      .join("");
    // console.log(convert);
    // setAddress(convert)
    let ras = await axios.get(
      // `https://maps.googleapis.com/maps/api/geocode/json?address=29+champs+elys%C3%A9e+paris&key=AIzaSyAf6-uRnVV8NM67T9FobkbcynWfDGe-0oY`
      `https://maps.googleapis.com/maps/api/geocode/json?address=${convert}&key=${JOSE_API_KEY}`
    );
    console.log(ras.data);

    /* ACTIVATE THE MAP */
    // setEventPosition(
    //   ras.data.results.length === 0
    //     ? alert(
    //         "Can not read address. Change and do not forget the state and country"
    //       )
    //     : ras.data.results[0].geometry.location
    // );
    // console.log("Event coordinates: ", ras.data.results[0].geometry.location);
  };

  // console.log(process.env);
  // console.log(props.match.params.dynamicId);
  const memberJoin = () => {
    console.log(details.members);
    if (details?.members?.length < details?.spots) {
      //console.log(!details.members?.includes( user))
      let doesUserExist = false;
      details?.members.map((eachMember) => {
        if (eachMember._id === user._id) {
          doesUserExist = true;
          return;
        }
      });
      if (!doesUserExist) {
        let copy = { ...details };
        //console.log(user);
        // console.log(user._id);
        copy.members.push(user);
        copy.memberIds.push(user._id);
        // console.log(copy.members);

        setDetails(copy);

        console.log(copy.memberIds);
        // console.log(details);
        actions.joinEvent(copy);
      } else {
        alert("you already joined dummy!");
      }
    } else {
      alert("party is full!");
    }
  };
  //console.log(details?.members?.map((each) => each._id === user._id).includes(true));

  const leave = () => {
    let copy = { ...details };
    //console.log(user);
    // console.log(user._id);
    for (var i = 0; i < copy.members.length; i++) {
      if (copy.members[i]._id === user._id) {
        console.log("hahahahah");
        copy.members.splice(i, 1);
        copy.memberIds.splice(i, 1);
      }
    }
    // console.log(copy.members);
    // console.log(user);
    // console.log(copy.members);

    setDetails(copy);

    // console.log(details);
    actions.leaveEvent(copy);

    console.log(details);
    // actions.joinEvent(copy);
  };

  function AddPost(props) {
    let [post, setPost] = useState("");
    let [eventId, setEventId] = useState("");
    let history = useHistory();

    const handleChange = (e) => {
      setPost(e.target.value);
      setEventId(details?._id);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      console.log(post);
      let res = await actions.addPost({ post, eventId });
      setPost("");
      history.push(`/eventDetails/${details?._id}`); //props.history.push is also an option
    };

    return (
      <div>
        <h3>Add Comment</h3>
        <form onSubmit={handleSubmit}>
          <div className="commentBox">

              <TextField
              label="Comment"
              name="comment"
              id="filled-size-small"
              variant="filled"
              size="small"
              onChange={handleChange}
              value={post}
              style={{
                borderRadius: "40px",
                backgroundColor: "white",
              }}
              InputProps={{
                className: classes.input,
              }}
            />
            <br/>
            <Button
              // size="small"
              variant="contained"
              type="submit"
              style={{
                  backgroundColor: 'rgb(75,105,40)',
                  color: 'white',
                  borderRadius: '40px'
                }}
            >
              Send
            </Button>
          </div>
        </form>
        <br />
      </div>
    );
  }

  //ONLY FOR REFERENCE, DELETE ONCE POST FEATURE IS IMPLEMENTED!
  const showCommentSection = () => {
    return commentSection.map((eachComment) => {
      // console.log(anime.mal_id);
      // console.log(eachComment.animeId);
      if (
        eachComment?.animeId === props.match.params.dynamicId &&
        eachComment?.type === "comments"
      ) {
        return (
          <div style={{ background: "white", margin: "10px" }}>
            <h3>{eachComment?.user}</h3>
            <p>{eachComment?.comment}</p>
          </div>
        );
      }
    });
  };

  const ShowPosts = () => {
    return allPosts.map((eachPost) => {
      const deletePost = async () => {
        actions.deletePost(eachPost);
        // eslint-disable-next-line no-restricted-globals
        props.history.push(`/eventDetails/${details?._id}`);

        // let res = await actions.getAllPosts();
        // setAllPosts(res.data);
      };
      if (eachPost.eventId === details?._id) {
        console.log(eachPost.userId._id);
        return (
          <li key={eachPost._id} className="eventDetails-comments">
            <i>{eachPost.userId?.name}: </i> {eachPost.post}{" "}
            {eachPost.userId._id === user?._id ? (
              <Button
                size="small"
                variant="outlined"
                style={{
                  // backgroundColor: 'white',
                  border: '1px solid rgb(75,105,40)',
                  color: 'rgb(75,105,40)',
                  borderRadius: '40px'
                }}
                onClick={deletePost}
              >
                Delete
              </Button>
            ) : null}
          </li>
        );
      }
    });
  };

  const showEvent = (props) => {
    return (
      <div className="event-details-card">
        <Card
          style={{
            borderRadius: '40px',
            width: '80vw',
            border: '6px solid rgb(75,105,40)',
            backgroundImage: 'linear-gradient(0deg, #cfd6e6 1%, #e7eff9  60%)'
          }}
        >
          <CardContent>
          <CardMedia
            component="img"
            alt="Image is not working"
            height="550"
            image={details?.image}
            style={{
              borderRadius: '40px',
            }}
            title="Sport Image"
            />
            <br/>
            <br/>
            <br/>
            <Typography clsasName="text" color="textSecondary" gutterBottom>
              <p className="detailsText-sport">{details?.sport ? details?.sport[0].toUpperCase() + details?.sport.slice(1) : details?.sport}</p>
            <h1 className="event-details-card-h1">{details?.eventName}</h1>
            <div className="detailsText">
              <p className="detailsText-address">{details?.location}</p>
              {console.log(details?.location)}
              <p className="detailsText-date">{details?.date ? details?.date.split('T', 1) : details?.date} {details?.date ? details?.date.split("T").pop() : details?.date}</p>
              <div className="detailsText-row">
                <p className="detailsText-ages">Ages <br/> { details?.age ? details?.age[0].toUpperCase() + details?.age.slice(1) : details?.age}</p>
                <p className="detailsText-ages">Level <br/> { details?.level ? details?.level[0].toUpperCase() + details?.level.slice(1) : details?.level} </p>
              </div>
              <p className="detailsText-spots">
                {`Total: ${details?.spots} / Available: ${
                  details?.spots - details?.members?.length
                }`}
              </p>
              <ul className="detailsText-ul">
                Members:
                {details?.members?.map((member) => {
                  return (
                    <li key={member._id}>
                      {member.name}
                    </li>
                  );
                })}
              </ul>
              <p className="detailsText-description">Description <br/> {details?.description}</p>
            </div>
            {user._id === details?.creator?._id ? (
              <Link 
                to={`/editEvent/${details?._id}`}
                style={{ textDecoration: 'none'}}
              >
                {" "}
                <Button variant="contained" 
                style={{
                  backgroundColor: 'rgb(75,105,40)',
                  color: 'white',
                  borderRadius: '40px',
                }}>
                  Edit
              </Button>
              </Link>
            ) : details?.members
                ?.map((each) => each._id === user._id)
                .includes(true) ? (
              <Button variant="contained" 
                style={{
                  backgroundColor: 'rgb(75,105,40)',
                  color: 'white',
                  borderRadius: '40px'
                }} onClick={leave}>
                Leave Event
              </Button>
            ) : (
              <Button variant="contained" style={{
                backgroundColor: 'rgb(75,105,40)',
                color: 'white',
                borderRadius: '40px'
              }} onClick={memberJoin}>
                Join Event
              </Button>
            )}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="eventdetails-container">
      {/* <h1>EVENT DETAILS</h1> */}
      {showEvent()}
      {AddPost()}
      <ShowPosts />

      <br />
      <div className="eventdetails-container-map">
        <Map
          google={props.google}
          zoom={13}
          zoomControl={true}
          center={eventPosition}
          scrollwheel={false}
          style={{
            width: '70%',
            height: '70%',
            marginLeft: '15%',
            marginRight: '15%',
            borderRadius: '40px',
            border: '10px solid white',
            color: 'black'
          }}
        >
          <Marker
            onClick={onMarkerClick}
            name={"User location"}
            position={userPosition}
            streetViewControl={true}
          />
          <Marker
            onClick={onMarkerClick}
            name={"Event location"}
            position={eventPosition}
            streetViewControl={true}
          />
          <InfoWindow 
            marker={activeMarker}
            visible={showingInfoWindow}
            style={{
              color: 'black',
            }}>
            <div>
              <h3 className="location-marker">
                {activeMarker.name === "Event location"
                  ? details?.location
                  : "Your location"}
              </h3>
            </div>
          </InfoWindow>
        </Map>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: JOSE_API_KEY,
})(EventDetails);
