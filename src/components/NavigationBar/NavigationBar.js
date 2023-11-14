import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./NavigationBar.css";
import currentPageContext from "../../contexts/CurrentLocationContext";
import { useContext } from "react";

const NavigationBar = ({
  handleLoginModal,
  loggedIn,
  isSaved,
  menuBarOpen,
  handlelogOut,
}) => {
  const currentPage = useContext(currentPageContext);

  const setTextColor = isSaved
    ? "navigationbar__text-black"
    : ".navigationbar__text-white";

  const setBorderButtom = isSaved
    ? "navigationbar-border-black"
    : "navigationbar-border-white";
  const setBorderRadius = isSaved ? "navigationbar__profile-dark" : "";

  const setLogoutBtn = isSaved ? "navigationbar__logout-btn-dark" : "";

  const setBorderColor =
    currentPage.currentPage === "/articles"
      ? isSaved
        ? "navigationbar__text-border-black"
        : "navigationbar__text-border-white"
      : "";

  const setHomeBorder =
    currentPage.currentPage === "/"
      ? isSaved
        ? "navigationbar__text-border-black"
        : "navigationbar__text-border-white"
      : "";

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
            <p
              className={`navigationbar__homepage ${setHomeBorder} ${setTextColor} `}
            >
              Home
            </p>{" "}
          </Link>
          <Link className="navigationbar__savednews-link" to="/articles">
            <p
              className={`navigationbar__saved-article ${setBorderColor} ${setTextColor}`}
            >
              {" "}
              Saved articles
            </p>
          </Link>

          <div className={`navigationbar__profile  ${setBorderRadius}`}>
            <p className={`navigationbar__username ${setTextColor}`}>Lotus</p>
            <button
              onClick={handlelogOut}
              className={`navigationbar__logout-btn ${setLogoutBtn}`}
            ></button>
          </div>
        </div>
      ) : (
        <div className={`navigationbar__infos `}>
          <p className={` navigationbar__homepage ${setHomeBorder}`}>Home</p>
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
