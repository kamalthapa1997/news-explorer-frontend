import github from "../../images/icon-github.svg";
import facebook from "../../images/icon-facebook.svg";
import "./Footer.css";
import { Link } from "react-router-dom";

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
              <p className="footer__subtext">Home</p>
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
            <img className="footer__icon" src={github} alt="github"></img>

            <img className="footer__icon" src={facebook} alt="facebook"></img>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
