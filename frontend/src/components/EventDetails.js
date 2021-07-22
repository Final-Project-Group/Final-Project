import React, { useEffect, useState } from "react";
import axios from "axios";
import actions from "../api";

function EventDetails(props) {
  const [details, setDetails] = useState({});

  useEffect(async () => {
    let res = await actions.getDetail(props)
    console.log(res.data)
  }, [props.match.params.dynamicId]);

  console.log(props.match.params.dynamicId);

  return (
    <div>
      <h1>EVENT DETAILS</h1>
      
    </div>
  );
}

export default EventDetails;
