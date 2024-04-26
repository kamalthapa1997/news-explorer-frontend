import "./MobileMenuBar.css";
import currentPageContext from "../../contexts/CurrentLocationContext";
import React, { useContext } from "react";

const MobileMenuBar = ({ handleMenuBar, menuBarOpen }) => {
  const setMenuIcon = menuBarOpen ? "mobilemenubar__close-icon" : "";
  const currentPage = useContext(currentPageContext);

  return (
    <div className="mobilemenubar">
      <button
        className={`mobilemenubar__icon   ${
          currentPage.currentPage === "/articles"
            ? "mobilemenubar__icon-dark"
            : "mobilemenubar__icon-white"
        } ${setMenuIcon}`}
        onClick={handleMenuBar}
      >
        {" "}
      </button>
    </div>
  );
};

export default MobileMenuBar;
