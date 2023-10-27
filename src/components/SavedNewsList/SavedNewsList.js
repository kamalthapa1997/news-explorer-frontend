import pic from "../../images/image.png";

import SavedNewsListContext from "../../contexts/SavedNewsListContext";
import { useContext } from "react";

const SavedNewsList = () => {
  const { savedArticles, setSavedArticles } = useContext(SavedNewsListContext);
  console.log(savedArticles, "from saved news");

  const handleDeleteSaved = (article) => {
    const updatedSavedArticles = savedArticles.filter(
      (newsCard) => newsCard.urlToImage !== article.urlToImage
    );

    setSavedArticles(updatedSavedArticles);
  };

  return (
    <div className="newscards__articles">
      {savedArticles.map((article, index) => (
        <div key={index} className="newscards__article">
          <div className=" newscards__type-and-delete">
            <p className="newscards__typeof">Nature</p>
            <div className="newscards__delete">
              <button
                onClick={() => {
                  handleDeleteSaved(article);
                }}
                className="newscards__delete-btn"
              ></button>
            </div>
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
  );
};

export default SavedNewsList;
