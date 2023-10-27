import "./NewsCard.css";

import { useState, useEffect, useContext } from "react";
import SavedNewsListContext from "../../contexts/SavedNewsListContext";
import SavedNewsKeywordContext from "../../contexts/SavedNewsKeyword";
import SearchNewsContext from "../../contexts/SearchNewsContext";

const NewsCardList = ({ articles, handleSavedNewsList }) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [saved, setSaved] = useState(false);
  const { savedArticles, setSavedArticles } = useContext(SavedNewsListContext);
  const { savedKeyword, setSavedKeyword } = useContext(SavedNewsKeywordContext);
  const { searchInput } = useContext(SearchNewsContext);

  const showMore = () => {
    setVisibleCount((preCount) => preCount + 3);
  };

  const handleSaveNews = (article, articles, index) => {
    const isArticleSaved = savedArticles.some(
      (newsCard) => newsCard.urlToImage === article.urlToImage
    );

    if (isArticleSaved) {
      // If the article is saved, remove it from the saved articles list
      const updatedSavedArticle = savedArticles.filter(
        (newsCard) => newsCard.urlToImage !== article.urlToImage
      );
      setSavedArticles(updatedSavedArticle);
    } else {
      // If the article is not saved, add it to the saved articles list
      const updatedSavedArticle = [...savedArticles, article];
      setSavedArticles(updatedSavedArticle);
      setSavedKeyword([...savedKeyword, searchInput]);
    }

    // Toggle the `saved` state
    // setSaved(!isArticleSaved);
  };

  return (
    <div className="newscards">
      <div
        className={`${
          articles.length ? " newscards__searchlist" : "newscards__hidden"
        }`}
      >
        <p className="newscards__searchtexts"> Search results</p>
        <div className="newscards__newslists">
          <div className="newscards__articles">
            {/* CARD */}
            {articles.slice(0, visibleCount).map((article, index) => (
              <div key={index} className="newscards__article">
                <div className="newscards__bookmarks">
                  <p className="newscards__bookmarks-message">
                    Sign in to save argicles
                  </p>
                  <button
                    onClick={() => {
                      handleSaveNews(article, articles, index);
                    }}
                    className={`${
                      savedArticles.some(
                        (newsCard) => newsCard.urlToImage === article.urlToImage
                      )
                        ? "newscards__bookmark-saved"
                        : "newscards__bookmark-unsaved"
                    }  newscards__bookmark `}
                  ></button>
                </div>
                <img
                  className="newscards__img"
                  src={article.urlToImage}
                  alt={article.source.name}
                />
                <div className="newscards__details">
                  <p className="newscards__dates">{article.publishedAt}</p>
                  <p className="newscards__subheading"> {article.title}</p>
                  <p className="newscards__paragraph">{article.description}</p>
                  <p className="newscards__footer">{article.source.name}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={showMore}
            className={` ${
              articles.length ? "newscards__showmore" : "newscards__hidden"
            }`}
          >
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCardList;
