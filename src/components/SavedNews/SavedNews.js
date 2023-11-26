import { useContext } from "react";
import SavedNewsList from "../SavedNewsList/SavedNewsList";
import SavedNewsListContext from "../../contexts/SavedNewsListContext";
import SavedKeywords from "../SavedKeywords/SavedKeywords";

import "./SavedNews.css";

const SavedNews = ({ handleDeleteSaved, savedKeywordsLists }) => {
  const { savedArticles } = useContext(SavedNewsListContext);

  return (
    <div className="savednews ">
      {/* savednewsheader */}
      <div className="savednews__titles">
        <p className="savednews__text">Saved articles</p>
        <h2 className="savednews__subtext">{`Elise, you have ${savedArticles.length} saved articles`}</h2>
        <SavedKeywords items={savedKeywordsLists} />
      </div>
      <SavedNewsList handleDeleteSaved={handleDeleteSaved} />
    </div>
  );
};

export default SavedNews;
