import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../App.css";
import video from '../assets/video.mp4';

function Splash(props) {
  console.log(video);
  return (
    <div className="splash">
    
    <div className="splash-video">
      <video autoPlay muted loop className="video-size">
        <source src={video} type="video/mp4"/>
      </video>
    </div>

      <h1>Jogo</h1>
      <p>By the players, for the players.</p>
      <Link to="/signin" style={{ textDecoration: "none" }}>
        <button>GET STARTED</button>
      </Link>
    </div>
  );
}

export default Splash;
