import { useState, useContext } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import SavedNewsListContext from "../../contexts/SavedNewsListContext";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const NewsCardList = ({ article, handleDeleteSaved, handleSaveNews }) => {
  const { savedArticles } = useContext(SavedNewsListContext);

  const [showIcon, setShowIcon] = useState(false);
  const { currentUserContextValue } = useContext(CurrentUserContext);

  const loggedIn = currentUserContextValue.loggedIn;

  const reactLocation = useLocation();
  const currentLocation = reactLocation.pathname;

  const handleHideIcon = () => setShowIcon(false);
  const handleShowIcon = () => setShowIcon(true);

  const isArticleSaved =
    loggedIn && savedArticles.some((newsCard) => newsCard.link === article.url);

  return (
    <div key={article._id} className="newscards__article">
      {currentLocation === "/" ? (
        <div className="newscards__bookmarks">
          {showIcon && !loggedIn && (
            <p className="newscards__bookmarks-message">
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
                ? "newscards__bookmark-saved"
                : "newscards__bookmark-unsaved"
            }  newscards__bookmark `}
          />
        </div>
      ) : (
        <div className=" newscards__type-and-delete">
          <p className="newscards__typeof">{article.keyword}</p>
          <div className="newscards__delete">
            <button
              onClick={() => {
                handleDeleteSaved(article._id);
              }}
              className="newscards__delete-btn"
            ></button>
          </div>
        </div>
      )}

      <img
        className="newscards__img"
        src={article.urlToImage || article.image}
        alt={article.source.name || article.source}
      />
      <div className="newscards__details">
        <p className="newscards__dates">
          {article.publishedAt || article.date}
        </p>
        <p className="newscards__subheading"> {article.title}</p>
        <p className="newscards__paragraph">
          {article.description || article.text}
        </p>
        {currentLocation === "/" ? (
          <p className="newscards__footer">{article.source.name}</p>
        ) : (
          <p className="newscards__footer">{article.source}</p>
        )}
      </div>
    </div>
  );
};

export default NewsCardList;
