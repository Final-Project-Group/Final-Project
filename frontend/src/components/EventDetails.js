import React, { useEffect, useState } from "react";
import axios from "axios";
import actions from "../api";

function EventDetails(props) {
  const [details, setDetails] = useState({});

  useEffect(async () => {
    let res = await actions.getDetail(props);
    //console.log(res.data);
    setDetails(res.data);
  }, [props]);

  // console.log(props.match.params.dynamicId);

  const showEvent = () => {
    console.log(details);
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
          <p>spots / filled spots: 2 / 1</p>
          <p>members: Jhonson</p>
          <p>Description: {details?.description}</p>
          <button>join button</button>
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
