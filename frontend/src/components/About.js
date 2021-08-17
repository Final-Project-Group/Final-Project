import React from "react";
import pic from "../assets/sample-pic.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

function About(props) {
  return (
    <div>
      <h1>Our Team</h1>
      <div className="about-us">
        <div>
          <img src={pic} />
          <h2>Mario Cardenas</h2>
          <h4>Full Stack Web Developer</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis
            justo sit amet purus condimentum pharetra eget ut neque. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Praesent eleifend
            tempus neque facilisis scelerisque. Vestibulum posuere ante ut
            tellus venenatis, et ultricies lectus ultrices. Proin pharetra
            convallis orci, ac rutrum arcu. Ut condimentum lectus et libero
            mattis varius.
          </p>
          <div class="media-icons-new">
            <a href="https://github.com/Mario-paul" target="_blank" rel="noreferrer">
              <GitHubIcon
                style={{
                  width: "5vw",
                  color: "rgb(75,105,40)",
                }}
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <TwitterIcon
                style={{
                  width: "5vw",
                  color: "rgb(75,105,40)",
                }}
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <InstagramIcon
                style={{
                  width: "5vw",
                  color: "rgb(75,105,40)",
                }}
              />
            </a>
            <a href="https://www.linkedin.com/in/m-cardenas/" target="_blank" rel="noreferrer">
              <LinkedInIcon
                style={{
                  width: "5vw",
                  color: "rgb(75,105,40)",
                }}
              />
            </a>
          </div>
        </div>
        <div>
          <img src={pic} />
          <h2>Jose Mendez</h2>
          <h4>Full Stack Web Developer</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis
            justo sit amet purus condimentum pharetra eget ut neque. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Praesent eleifend
            tempus neque facilisis scelerisque. Vestibulum posuere ante ut
            tellus venenatis, et ultricies lectus ultrices. Proin pharetra
            convallis orci, ac rutrum arcu. Ut condimentum lectus et libero
            mattis varius.
          </p>
          <div class="media-icons-new">
            <a href="https://github.com/jose-fraga" target="_blank" rel="noreferrer">
              <GitHubIcon
                style={{
                  width: "5vw",
                  color: "rgb(75,105,40)",
                }}
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <TwitterIcon
                style={{
                  width: "5vw",
                  color: "rgb(75,105,40)",
                }}
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <InstagramIcon
                style={{
                  width: "5vw",
                  color: "rgb(75,105,40)",
                }}
              />
            </a>
            <a href="https://www.linkedin.com/in/jose-mendez-fraga/" target="_blank" rel="noreferrer">
              <LinkedInIcon
                style={{
                  width: "5vw",
                  color: "rgb(75,105,40)",
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
