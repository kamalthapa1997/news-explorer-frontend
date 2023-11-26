import SavedNewsListContext from "../../contexts/SavedNewsListContext";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SavedNewsList.css";

import NewsCardList from "../NewsCardList/NewsCardList";

const SavedNewsList = ({ handleDeleteSaved }) => {
  const { savedArticles } = useContext(SavedNewsListContext);
  const { currentUserContextValue } = useContext(CurrentUserContext);

  const loggedIn = currentUserContextValue.loggedIn;
  const reversedSavedArticles = savedArticles.reverse();
  console.log(reversedSavedArticles);

  return (
    // <div className="savednewslist">
    <section className="newscards__articles">
      {loggedIn &&
        reversedSavedArticles.map((article, index) => (
          <NewsCardList
            handleDeleteSaved={handleDeleteSaved}
            article={article}
            // index={index}
            key={index}
          />
        ))}
    </section>
    // </div>
  );
};

export default SavedNewsList;
