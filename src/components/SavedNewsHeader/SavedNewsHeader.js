import NavigationBar from "../NavigationBar/NavigationBar";
import SavedNews from "../SavedNews/SavedNews";
const SavedNewsHeader = ({
  savedKeywordsLists,
  handleLoginModal,
  loggedIn,
  isSaved,
  handleDeleteSaved,
  handleSignOut,
}) => {
  return (
    <>
      <NavigationBar
        handleLoginModal={handleLoginModal}
        loggedIn={loggedIn}
        isSaved={isSaved}
        handlelogOut={handleSignOut}
      />
      <SavedNews
        savedKeywordsLists={savedKeywordsLists}
        handleDeleteSaved={handleDeleteSaved}
      />
    </>
  );
};

export default SavedNewsHeader;
