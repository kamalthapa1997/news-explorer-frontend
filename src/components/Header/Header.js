import NavigationBar from "../NavigationBar/NavigationBar";
import React from "react";

import MobileMenuBar from "../MobileMenuBar/MobileMenuBar";

const Header = ({
  handleLoginModal,
  handleMenuBar,
  menuBarOpen,
  loggedIn,
  handleSignOut,
}) => {
  return (
    <>
      <NavigationBar
        menuBarOpen={menuBarOpen}
        handleLoginModal={handleLoginModal}
        loggedIn={loggedIn}
        handlelogOut={handleSignOut}
      />
      <MobileMenuBar menuBarOpen={menuBarOpen} handleMenuBar={handleMenuBar} />
    </>
  );
};

export default Header;
