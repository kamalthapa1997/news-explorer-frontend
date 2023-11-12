import { useContext } from "react";
import SavedNewsList from "../SavedNewsList/SavedNewsList";
import SavedNewsListContext from "../../contexts/SavedNewsListContext";
import SavedKeywords from "../SavedKeywords/SavedKeywords";

import "./SavedNews.css";

const SavedNews = ({ handleDeleteSaved, savedKeywordsLists }) => {
  const { savedArticles } = useContext(SavedNewsListContext);

  return (
    <div className="newscards newscards-saved">
      {/* savednewsheader */}
      <div className="newscards__titles">
        <p className="newscards__text">Saved articles</p>
        <p className="newscards__subtext">{`Elise, you have ${savedArticles.length} saved articles`}</p>
        <SavedKeywords items={savedKeywordsLists} />
      </div>
      <SavedNewsList handleDeleteSaved={handleDeleteSaved} />
    </div>
  );
};

export default SavedNews;
