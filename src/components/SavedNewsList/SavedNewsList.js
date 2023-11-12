import SavedNewsListContext from "../../contexts/SavedNewsListContext";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import NewsCardList from "../NewsCardList/NewsCardList";

const SavedNewsList = ({ handleDeleteSaved }) => {
  const { savedArticles } = useContext(SavedNewsListContext);
  const { currentUserContextValue } = useContext(CurrentUserContext);

  const loggedIn = currentUserContextValue.loggedIn;

  return (
    <div className="newscards__articles">
      {loggedIn &&
        savedArticles.map((article, index) => (
          <NewsCardList
            handleDeleteSaved={handleDeleteSaved}
            article={article}
            index={index}
            key={article._id}
          />
        ))}
    </div>
  );
};

export default SavedNewsList;
