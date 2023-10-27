import NavigationBar from "../NavigationBar/NavigationBar";
import MobileMenuBar from "../MobileMenuBar/MobileMenuBar";

const Header = ({
  handleLoginModal,
  handleMenuBar,
  menuBarOpen,
  loggedIn = { loggedIn },
  handleIsSaved,
  isSaved,
}) => {
  return (
    <>
      <NavigationBar
        menuBarOpen={menuBarOpen}
        handleLoginModal={handleLoginModal}
        loggedIn={loggedIn}
      />
      <MobileMenuBar
        handleIsSaved={handleIsSaved}
        isSaved={isSaved}
        menuBarOpen={menuBarOpen}
        handleMenuBar={handleMenuBar}
      />
    </>
  );
};

export default Header;
