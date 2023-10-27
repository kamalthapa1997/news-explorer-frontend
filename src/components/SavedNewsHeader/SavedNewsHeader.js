import NavigationBar from "../NavigationBar/NavigationBar";
import SavedNews from "../SavedNews/SavedNews";
const SavedNewsHeader = ({ handleLoginModal, loggedIn, isSaved }) => {
  return (
    <>
      <NavigationBar
        handleLoginModal={handleLoginModal}
        loggedIn={loggedIn}
        isSaved={isSaved}
      />
      <SavedNews />
    </>
  );
};

export default SavedNewsHeader;
