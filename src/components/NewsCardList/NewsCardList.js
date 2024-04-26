import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import SavedNewsListContext from "../../contexts/SavedNewsListContext";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./NewsCardList.css";

const NewsCardList = ({ article, handleDeleteSaved, handleSaveNews }) => {
  const { savedArticles } = useContext(SavedNewsListContext);

  const [showIcon, setShowIcon] = useState(false);
  const { currentUserContextValue } = useContext(CurrentUserContext);

  const loggedIn = currentUserContextValue.loggedIn;

  const reactLocation = useLocation();
  const currentLocation = reactLocation.pathname;

  const handleHideIcon = () => setShowIcon(false);
  const handleShowIcon = () => setShowIcon(true);

  // const isArticleSaved =
  //   loggedIn && savedArticles.some((newsCard) => newsCard.link === article.url);
  const isArticleSaved =
    loggedIn &&
    Array.isArray(savedArticles) &&
    savedArticles.some((newsCard) => newsCard.link === article.url);

  return (
    <div key={article.url || article.link} className="newscardlist__article">
      {currentLocation === "/" ? (
        <div className="newscardlist__bookmarks">
          {showIcon && !loggedIn && (
            <p className="newscardlist__bookmarks-message">
              Sign in to save argicles
            </p>
          )}

          <button
            onMouseOver={handleShowIcon}
            onMouseOut={handleHideIcon}
            onClick={() => {
              handleSaveNews(article);
            }}
            className={`${
              isArticleSaved
                ? "newscardlist__bookmark-saved"
                : "newscardlist__bookmark-unsaved"
            }  newscardlist__bookmark `}
          />
        </div>
      ) : (
        <div className=" newscardlist__type-and-delete">
          <p className="newscardlist__typeof">{article.keyword}</p>

          <button
            onClick={() => {
              handleDeleteSaved(article._id);
            }}
            className="newscardlist__delete-btn"
          ></button>
        </div>
      )}
      <a
        href={article.url || article.link}
        className="newscardlist__links"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="newscardlist__img"
          src={article.urlToImage || article.image}
          alt={article.source.name || article.source}
        />

        <div className="newscardlist__infos">
          <div className="newscardlist__details">
            <p className="newscardlist__dates">
              {article.publishedAt || article.date}
            </p>
            <h2 className="newscardlist__subheading"> {article.title}</h2>
            <p className="newscardlist__paragraph">
              {article.description || article.text}
            </p>
          </div>

          <p className="newscardlist__footer">
            {article.source.name || article.source}
          </p>
        </div>
      </a>
    </div>
  );
};

export default NewsCardList;
