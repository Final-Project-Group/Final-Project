import React, { useEffect, useState } from "react";
import axios from "axios";

function EventDetails(props) {
  const [details, setDetails] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/get-event-details/${props.match.params.dynamicId}`
      )
      .then((res) => {
        setDetails(res.data)
        console.log(res.data);
      });
  }, [props.match.params.dynamicId]);

  console.log(props.match.params.dynamicId);

  return (
    <div>
      <h1>EVENT DETAILS</h1>
    </div>
  );
}

export default EventDetails;
