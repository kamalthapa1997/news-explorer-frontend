import github from "../../images/icon-github.svg";
import facebook from "../../images/icon-facebook.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <div className=" footer">
      <div className="footer__infos">
        <p className=" footer__texts">
          &copy; 2021 Supersite, Powered by News API
        </p>

        <div className="footer__sublinks">
          <div className="footer__subtexts">
            <p className="footer__subtext">Home</p>
            <p className="footer__subtext">Practicum</p>
          </div>
          <div className="footer__icons">
            <img className="footer__icon" src={github} alt="github"></img>

            <img className="footer__icon" src={facebook} alt="facebook"></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
