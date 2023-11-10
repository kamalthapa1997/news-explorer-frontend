import "./NewsCard.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import IsLoadingContext from "../../contexts/IsLoadingContext";
import { useContext, useState } from "react";
import articleNotFound from "../../images/no-results.svg";

const NewsCards = ({ articles, handleSaveNews }) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const { setPreloader } = useContext(IsLoadingContext);

  const showMore = () => {
    setPreloader(true);

    setTimeout(() => {
      setVisibleCount((preCount) => preCount + 3);

      setPreloader(false);
    }, 1000);
  };

  return (
    <div className="newscards">
      {articles.length === 0 ? (
        <div className="newscards__notfound">
          <img
            className="newscards__notfound-logo"
            src={articleNotFound}
            alt="not found"
          />

          <p className="newscards__notfound-text">Articles not found.</p>
        </div>
      ) : (
        <div
          className={`${
            articles.length ? " newscards__searchlist" : "newscards__hidden"
          }`}
        >
          <p className="newscards__searchtexts"> Search results</p>
          <div className="newscards__newslists">
            <div className="newscards__articles">
              {articles.slice(0, visibleCount).map((article) => (
                <NewsCardList
                  key={article.url}
                  article={article}
                  handleSaveNews={handleSaveNews}
                />
              ))}
            </div>
            <button
              onClick={showMore}
              className={` ${
                articles.length
                  ? articles.length > 3
                    ? "newscards__showmore"
                    : "newscards__hidden"
                  : "newscards__hidden"
              }`}
            >
              Show more
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsCards;
