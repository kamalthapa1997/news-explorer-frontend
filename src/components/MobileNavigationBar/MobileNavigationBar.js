import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./MobileNavigationBar.css";
import logoutBtnWhite from "../../images/logout.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";

const MobileNavigationBar = ({
  handleSignOut,
  handleLoginModal,
  loggedIn,
  handleCloseMenuBar,
  handleMobileIsSaved,
}) => {
  const currentUserContextValue = useContext(CurrentUserContext);
  const currentUser =
    currentUserContextValue.currentUserContextValue.currentUser;

  return (
    <div className="mobilenavigationbar">
      <div className="mobilenavigationbar__menu">
        <div className="mobilenavigationbar__heading">
          <h1 className="mobilenavigationbar__title"> NewsExplorer</h1>
        </div>

        {loggedIn ? (
          <div className="mobilenavigationbar__header ">
            <Link className="mobilenavigationbar__home-link" to="/">
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
            <button
              onClick={handleSignOut}
              className={`mobilenavigationbar__profile `}
            >
              {currentUser.name}
              <img
                src={logoutBtnWhite}
                alt="Logout Icon"
                // FIX
                className="mobilenavigationbar__logout-logo"
              />
            </button>
          </div>
        ) : (
          <div className="mobilenavigationbar__infos">
            <Link className="mobilenavigationbar__home-link" to="/">
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
