import { useEffect } from "react";
import "./MobileMenuBar.css";
const MobileMenuBar = ({ handleMenuBar, menuBarOpen, isSaved }) => {
  const setMenuIcon = menuBarOpen ? "mobilemenubar__close-icon" : "";
  console.log(isSaved, "menubar");
  console.log("menubar ", menuBarOpen);

  return (
    <>
      <button
        className={` ${isSaved ? "" : "mobilemenubar__icon"} ${setMenuIcon}`}
        onClick={handleMenuBar}
      >
        {" "}
      </button>
    </>
  );
};

export default MobileMenuBar;
