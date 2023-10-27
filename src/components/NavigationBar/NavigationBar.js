import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./NavigationBar.css";
const NavigationBar = ({
  handleLoginModal,
  loggedIn,
  isSaved,
  menuBarOpen,
}) => {
  const setTextColor = isSaved
    ? "navigationbar__text-black"
    : ".navigationbar__text-white";

  const setBorderButtom = isSaved
    ? "navigationbar-border-black"
    : "navigationbar-border-white";
  const setBorderRadius = isSaved ? "navigationbar__profile-dark" : "";

  const setLogoutBtn = isSaved ? "navigationbar__logout-btn-dark" : "";

  return (
    <div className={`navigationbar  ${setBorderButtom}`}>
      <Link className="navigationbar__title-link" to="/">
        <h1 className={`navigationbar__title ${setTextColor}  `}>
          NewsExplorer
        </h1>
      </Link>
      {loggedIn ? (
        <div className={`navigationbar__infos `}>
          <Link onClick={menuBarOpen} className="navigation__home-link" to="/">
            <p className={`navigationbar__homepage ${setTextColor} `}>Home</p>{" "}
          </Link>
          <Link className="navigationbar__savednews-link" to="/saved-news">
            <p className={`navigationbar__saved-article ${setTextColor}`}>
              {" "}
              Saved articles
            </p>
          </Link>
          <div className={`navigationbar__profile  ${setBorderRadius}`}>
            <p className={`navigationbar__username ${setTextColor}`}>Elise</p>
            <button
              className={`navigationbar__logout-btn ${setLogoutBtn}`}
            ></button>
          </div>
        </div>
      ) : (
        <div className={`navigationbar__infos `}>
          <p className={`navigationbar__homepage `}>Home</p>
          <p className="navigationbar__login" onClick={handleLoginModal}>
            {" "}
            Signin
          </p>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
