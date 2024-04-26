import React, { useContext } from "react";
import SavedNewsList from "../SavedNewsList/SavedNewsList";
import SavedNewsListContext from "../../contexts/SavedNewsListContext";
import SavedKeywords from "../SavedKeywords/SavedKeywords";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./SavedNews.css";

const SavedNews = ({ handleDeleteSaved, savedKeywordsLists }) => {
  const { savedArticles } = useContext(SavedNewsListContext);
  const currentUserContextValue = useContext(CurrentUserContext);
  const currentUser =
    currentUserContextValue.currentUserContextValue.currentUser;

  return (
    <section className="savednews">
      {/* savednewsheader */}
      <div className="savednews__titles">
        <p className="savednews__text">Saved articles</p>
        <h2 className="savednews__subtext">{`${currentUser.name}, you have ${savedArticles.length} saved articles`}</h2>
        <SavedKeywords items={savedKeywordsLists} />
      </div>
      <SavedNewsList handleDeleteSaved={handleDeleteSaved} />
    </section>
  );
};

export default SavedNews;
