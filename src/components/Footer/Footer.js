import github from "../../images/icon-github.svg";
import facebook from "../../images/icon-facebook.svg";
import "./Footer.css";
import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <footer className=" footer">
      <div className="footer__infos">
        <p className=" footer__texts">
          &copy; 2021 Supersite, Powered by News API
        </p>

        <div className="footer__sublinks">
          <div className="footer__subtexts">
            <Link className="footer__links" to="/">
              {/* <a className="footer__links" href="#main"> */}
              <p className="footer__subtext">Home</p>
              {/* </a> */}
            </Link>
            <a
              className="footer__links"
              href="http://www.tripleten.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="footer__subtext">Practicum</p>
            </a>
          </div>
          <div className="footer__icons">
            <a
              className="footer__links"
              href="https://github.com/kamalthapa1997"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="footer__icon" src={github} alt="github"></img>
            </a>
            <a
              className="footer__links"
              href="https://www.facebook.com/kamal.thapamagar.1806253?mibextid=LQQJ4d"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="footer__icon" src={facebook} alt="facebook"></img>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
