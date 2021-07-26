import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import actions from "../api";
import TheContext from "../TheContext";
import { Link } from "react-router-dom";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import NodeGeocoder from "node-geocoder";

const JOSE_API_KEY = process.env.REACT_APP_API_KEY;

function EventDetails(props) {
  // const defaultLocation = {  lat: 25.7617, lng: 80.1918  };
  const [userPosition, setUserPosition] = useState("");
  const [eventPosition, setEventPosition] = useState("");
  const [details, setDetails] = useState({});
  const { user } = useContext(TheContext);

  useEffect(() => {
    (async () => {
      let res = await actions.getDetail(props);
      console.log(res.data);
      console.log(user);
      setDetails(res.data);
      getGeocode(res.data);
      // console.log(address)
    })();

    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setUserPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [props, user]);

  const getGeocode = async (details) => {
    let convert = details?.location;
    // console.log(details?.location);
    // console.log(typeof details?.location);
    // console.log(convert);
    convert = convert
      ?.split("")
      ?.map((char) => (char === " " ? "+" : char))
      .join("");
    console.log(convert);
    // setAddress(convert)
    let ras = await axios.get(
      // `https://maps.googleapis.com/maps/api/geocode/json?address=29+champs+elys%C3%A9e+paris&key=AIzaSyAf6-uRnVV8NM67T9FobkbcynWfDGe-0oY`
      `https://maps.googleapis.com/maps/api/geocode/json?address=${convert}&key=${JOSE_API_KEY}`
    );
    console.log(ras);
    setEventPosition(ras.data.results.length === 0 ? (alert('Can not read address. Change and do not forget the state and country')) : ras.data.results[0].geometry.location);
  };

  // console.log(process.env);
  // console.log(props.match.params.dynamicId);
  const memberJoin = () => {
    //console.log(details.members);
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

  const showEvent = (props) => {
    return (
      <div>
        <img src={details?.image}></img>
        <div>
          <h3>{details?.eventName}</h3>
          <p>Sport: {details?.sport}</p>
          <p>Address: {details?.location}</p>
          {console.log(details?.location)}
          <p>Date & time: {details?.date}</p>
          <p>Ages: {details?.age}</p>
          <p>Level: {details?.level}</p>
          <p>
            {`Total: ${details?.spots} / Available: ${
              details?.spots - details?.members?.length
            }`}
          </p>
          <ul>
            Members:
            {details?.members?.map((member) => {
              return (
                <li key={member._id}>
                  <h5>{member.name}</h5>
                </li>
              );
            })}
          </ul>
          <p>Description: {details?.description}</p>
          {user._id === details?.creator?._id ? (
            <Link to={`/editEvent/${details?._id}`}>
              {" "}
              <button> Edit </button>{" "}
            </Link>
          ) : details?.members
              ?.map((each) => each._id === user._id)
              .includes(true) ? (
            <button onClick={leave}>Leave Event</button>
          ) : (
            <button onClick={memberJoin}>Join Event</button>
          )}
          <br />
          <br />
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>EVENT DETAILS</h1>
      {showEvent()}
      <Map
        google={props.google}
        zoom={13}
        zoomControl={true}
        center={eventPosition}
      >
        <Marker
          onClick={props.onMarkerClick}
          name={"Current location"}
          position={userPosition}
          streetViewControl={true}
        />
        <Marker
          onClick={props.onMarkerClick}
          name={"Current location"}
          position={eventPosition}
          streetViewControl={true}
        />

        <InfoWindow onClose={props.onInfoWindowClose}>
          <div>
            <h1>Coral Park Miami</h1>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: JOSE_API_KEY,
})(EventDetails);
