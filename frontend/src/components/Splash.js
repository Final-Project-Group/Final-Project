import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../App.css";

function Splash(props) {
  return (
    <div className="splash">
      <h1>Jogo</h1>
      {/* <p>asdasdasdsa  asdas</p> */}
      <Link to="/signin" style={{ textDecoration: "none" }}>
        <button>GET STARTED</button>
      </Link>
    </div>
  );
}

export default Splash;
