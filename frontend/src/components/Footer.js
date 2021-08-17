import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

function Footer(props) {
  return (
    <div>
      <footer>
        <div class="content">
          <div class="top">
            <div class="logo-details">
              <span class="logo_name">Jogo</span>
            </div>
            <div class="media-icons-new">
              <a
                href="https://github.com/Final-project-group/Jogo"
                target="_blank"
                rel="noreferrer"
              >
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
            </div>
          </div>
        </div>
        <div class="bottom-details">
          <div class="bottom_text">
            <span class="copyright_text">
              Copyright © 2021 <a href="#">Jogo Inc.</a>
            </span>
            <span class="policy_terms">
              <a href="#">Privacy policy</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
