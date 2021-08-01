import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

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
                            <a href="https://github.com/Final-project-group/Jogo"><GitHubIcon
                                style={{
                                    width: '5vw',
                                    color: "rgb(75,105,40)"
                                }}
                            /></a>
                            <a href="https://twitter.com"><TwitterIcon
                                style={{
                                    width: '5vw',
                                    color: "rgb(75,105,40)"
                                }}
                            /></a>
                            <a href="https://instagram.com"><InstagramIcon
                                style={{
                                    width: '5vw',
                                    color: "rgb(75,105,40)"
                                }}
                            /></a>
                            <a href="https://www.linkedin.com/in/jose-mendez-fraga/"><LinkedInIcon
                                style={{
                                    width: '5vw',
                                    color: "rgb(75,105,40)"
                                }}
                            /></a>
                        </div>
                    </div>
                    <div class="link-boxes">
                        <ul class="box">
                            <li class="link_name">Links</li>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Get Started</a></li>
                        
                        </ul>
                        <ul class="box">
                            <li class="link_name">Services</li>
                            <li><a href="#">App Design</a></li>
                            <li><a href="#">Web Design</a></li>
                            <li><a href="#">Logo Design</a></li>
                            <li><a href="#">Banner Design</a></li>
                        
                        </ul>
                <ul class="box">
                            <li class="link_name">Other services</li>
                            <li><a href="#">SEO</a></li>
                            <li><a href="#">Content Marketing</a></li>
                            <li><a href="#">Prints</a></li>
                            <li><a href="#">Social Media</a></li>
                        
                        </ul>
                        <ul class="box">
                            <li class="link_name">Contact</li>
                            <li><a href="#">+91 8879887262</a></li>
                            <li><a href="#">+325 3133740318</a></li>
                            <li><a href="#">contact@jogo.com</a></li>
                            
                        
                        </ul>
                        
                    </div>
                </div>
                    <div class="bottom-details">
                <div class="bottom_text">
                    <span class="copyright_text">Copyright © 2021 <a href="#">Jogo Inc.</a></span>
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