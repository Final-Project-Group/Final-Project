import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import actions from "../api";
import TheContext from "../TheContext";
import { Link } from 'react-router-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

function EventDetails(props) {
  const defaultLocation = {  lat: 25.7617, lng: 80.1918  };
  const [marketPosition, setMarketPosition] = useState(defaultLocation)
  const [details, setDetails] = useState({});
  const { user } = useContext(TheContext);

  useEffect( () => {
    (async() => {
      let res = await actions.getDetail(props);
      console.log(res.data);
      console.log(user);
      setDetails(res.data);
    })()

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setMarketPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
    });

  }, [props, user]);

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
        console.log(user);
        console.log(user._id);
        copy.members.push(user);
        copy.memberIds.push(user._id)
        console.log(copy.members);
        
        setDetails(copy);
        
        console.log(details);
        actions.joinEvent(copy);
      } else {
        console.log("you already joined dummy!");
      }
    } else {
      console.log("party is full!");
    }
  };

  console.log(props.google)

  const showEvent = (props) => {
    return (
      <div>
        <img src={details?.image}></img>
        <div>
          <h3>{details?.eventName}</h3>
          <p>Sport: {details?.sport}</p>
          <p>Address: {details?.location}</p>
          <p>Date & time: {details?.date}</p>
          <p>Ages: {details?.age}</p>
          <p>Level: {details?.level}</p>
          <p>
            {`Total: ${details?.spots} / Available: ${details?.spots - details?.members?.length}`}
          </p>
          <ul>
            Members:
            {details?.members?.map((member) => {
              return (
                <li key={member._id}><h5>{member.name}</h5></li>
              )
            })}
          </ul>
          <p>Description: {details?.description}</p>
          { user._id === details?.creator?._id ? <Link to={`/editEvent/${details?._id}`}> <button> Edit </button> </Link> : <button onClick={memberJoin}>Join Event</button>}
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
        google={props.google} zoom={4}
        // defaultZoom={marketPosition}
        zoomControl={true}
      >
    
      <Marker onClick={props.onMarkerClick}
        name={'Current location'} 
        position={marketPosition}
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
  apiKey: ("AIzaSyAf6-uRnVV8NM67T9FobkbcynWfDGe-0oY")
})(EventDetails)
