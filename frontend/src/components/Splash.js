import React from 'react';
import {Link} from 'react-router-dom'

function Splash(props) {

    return (
        <div className="splash">
            <h1>Jogo</h1>
            <Link to="/signin"><button>Get Started</button></Link>
        </div>
    );
}

export default Splash;