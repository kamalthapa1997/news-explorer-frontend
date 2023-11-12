import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./MobileNavigationBar.css";

const MobileNavigationBar = ({
  handleSignOut,
  handleLoginModal,
  loggedIn,
  handleCloseMenuBar,
  handleMobileIsSaved,
}) => {
  return (
    <div className="mobilenavigationbar">
      <div className="mobilenavigationbar__menu">
        <div className="mobilenavigationbar__heading">
          <h1 className="mobilenavigationbar__title"> NewsExplorer</h1>
        </div>

        {loggedIn ? (
          <div className="mobilenavigationbar__header ">
            <Link className="navigation__home-link" to="/">
              <p
                onClick={() => {
                  handleCloseMenuBar();
                }}
                className="mobilenavigationbar__home"
              >
                Home
              </p>{" "}
            </Link>
            <Link
              onClick={() => {
                handleMobileIsSaved();
                handleCloseMenuBar();
              }}
              className="mobilenavigationbar__savednews-link"
              to="/articles"
            >
              <p className="mobilenavigationbar__saved-article ">
                {" "}
                Saved articles
              </p>
            </Link>
            <div className="mobilenavigationbar__profile">
              <p className="mobilenavigationbar__username">Elise</p>

              <button
                onClick={handleSignOut}
                className="mobilenavigationbar__logout-btn"
              ></button>
            </div>
          </div>
        ) : (
          <div className="mobilenavigationbar__infos">
            <Link className="navigation__home-link" to="/">
              <p className="mobilenavigationbar__home"> Home</p>
            </Link>
            <button
              className="mobilenavigationbar__signin"
              onClick={handleLoginModal}
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavigationBar;
