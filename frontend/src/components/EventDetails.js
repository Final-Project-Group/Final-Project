import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import actions from "../api";
import TheContext from "../TheContext";

function EventDetails(props) {
  const [details, setDetails] = useState({});
  const { user } = useContext(TheContext);

  useEffect(async () => {
    let res = await actions.getDetail(props);
    console.log(res.data);
    setDetails(res.data);
  }, [props, user]);

  // console.log(props.match.params.dynamicId);
  const memberJoin = () => {
    //console.log(details.members);
    if (details.members?.length < details.spots) {
      //console.log(!details.members?.includes( user))
      let doesUserExist = false;
      details.members.map((eachMember) => {
        if (eachMember._id === user._id) {
          doesUserExist = true;
          return;
        }
      });
      if (!doesUserExist) {
        let copy = { ...details };
        console.log(user);
        copy.members.push(user);
        copy.memberIds.push(user._id)
        setDetails(copy);
        actions.joinEvent(copy);
      } else {
        console.log("you already joined dummy!");
      }
    } else {
      console.log("party is full!");
    }
  };

  const showEvent = () => {
    // console.log(details);
    return (
      <div>
        <img src={details.image}></img>
        <div>
          <h3>{details.eventName}</h3>
          <p>Sport: {details?.sport}</p>
          <p>Address: {details?.location}</p>
          <p>Date & time: {details?.date}</p>
          <p>Ages: {details?.age}</p>
          <p>Level: {details?.level}</p>
          <p>
            spots / filled spots: {details.spots} / {details.members?.length}
          </p>
          <p>members: Jhonson</p>
          <p>Description: {details?.description}</p>
          <button onClick={memberJoin}>Join Event</button>
          <br />
          <br />
          <span>MAP</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>EVENT DETAILS</h1>
      {showEvent()}
    </div>
  );
}

export default EventDetails;
