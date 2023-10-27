import { useContext } from "react";
import SavedNewsList from "../SavedNewsList/SavedNewsList";
import SavedNewsListContext from "../../contexts/SavedNewsListContext";

import "./SavedNews.css";
const SavedNews = () => {
  const { savedArticles } = useContext(SavedNewsListContext);

  return (
    <div className="newscards newscards-saved">
      {/* savednewsheader */}
      <div className="newscards__titles">
        <p className="newscards__text">Saved articles</p>
        <p className="newscards__subtext">{`Elise, you have ${savedArticles.length} saved articles`}</p>
        <p className=" newscards__keywords">
          By keywords:{" "}
          <span className="newscards__keyword">
            {" "}
            Nature, Yellowstone, and 2 other
          </span>
        </p>
      </div>
      <SavedNewsList />
    </div>
  );
};

export default SavedNews;
