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
    loggedIn && savedArticles.some((newsCard) => newsCard.url === article.url);

  return (
    <div key={article.url} className="newscards__article">
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
          <p className="newscards__typeof">{article.tag}</p>
          <div className="newscards__delete">
            <button
              onClick={() => {
                // DELETE SAVED
                handleDeleteSaved(article.url);
              }}
              className="newscards__delete-btn"
            ></button>
          </div>
        </div>
      )}

      <img
        className="newscards__img"
        src={article.urlToImage}
        alt={article.source.name}
      />
      <div className="newscards__infos">
        <div className="newscards__details">
          <p className="newscards__dates">{article.publishedAt}</p>
          <p className="newscards__subheading"> {article.title}</p>
          <p className="newscards__paragraph">{article.description}</p>
        </div>
        <p className="newscards__footer">{article.source.name}</p>
      </div>
    </div>
  );
};

export default NewsCardList;
