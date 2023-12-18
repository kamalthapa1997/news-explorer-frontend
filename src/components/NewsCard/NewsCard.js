import "./NewsCard.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import IsLoadingContext from "../../contexts/IsLoadingContext";
import { useContext, useState } from "react";
import articleNotFound from "../../images/no-results.svg";
import Preloader from "../Preloader/Preloader";

const NewsCards = ({ articles, handleSaveNews, searched }) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const { preloader } = useContext(IsLoadingContext);

  const showMore = () => {
    setTimeout(() => {
      setVisibleCount((preCount) => preCount + 3);
    }, 1000);
  };

  return (
    <section className="newscards">
      {preloader ? (
        <Preloader />
      ) : searched && articles.length === 0 ? (
        <div className="newscards__notfound">
          <img
            className="newscards__notfound-logo"
            src={articleNotFound}
            alt="not found"
          />
          <p className="newscards__nothing-found">Nothing found</p>
          <p className="newscards__notfound-text">
            Sorry, but nothing matched your search terms.
          </p>
        </div>
      ) : (
        <div
          className={`${
            articles.length ? " newscards__searchlist" : "newscards__hidden"
          }`}
        >
          <h2 className="newscards__searchtexts"> Search results</h2>
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
                  ? articles.length > 3 && !(visibleCount > articles.length)
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
    </section>
  );
};

export default NewsCards;
