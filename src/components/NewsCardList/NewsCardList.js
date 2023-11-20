import { useState, useContext } from "react";
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

  const isArticleSaved =
    loggedIn && savedArticles.some((newsCard) => newsCard.url === article.url);

  return (
    <div key={article.url} className="newscardlist__article">
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
          <p className="newscardlist__typeof">{article.tag}</p>
          {/* <div className="newscardlist__delete"> */}
          <button
            onClick={() => {
              // DELETE SAVED
              handleDeleteSaved(article.url);
            }}
            className="newscardlist__delete-btn"
          ></button>
          {/* </div> */}
        </div>
      )}

      <img
        className="newscardlist__img"
        src={article.urlToImage}
        alt={article.source.name}
      />
      <div className="newscardlist__infos">
        <div className="newscardlist__details">
          <p className="newscardlist__dates">{article.publishedAt}</p>
          <h2 className="newscardlist__subheading"> {article.title}</h2>
          <p className="newscardlist__paragraph">{article.description}</p>
        </div>
        <p className="newscardlist__footer">{article.source.name}</p>
      </div>
    </div>
  );
};

export default NewsCardList;
