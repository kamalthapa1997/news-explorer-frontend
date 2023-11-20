import { useContext, useEffect, useState } from "react";
import SearchNewsContext from "../../contexts/SearchNewsContext";
import SavedNewsKeywordContext from "../../contexts/SavedNewsKeyword";
import "./SearchForm.css";

const SearchForm = ({ handleSearchNews }) => {
  const { searchInput, setSearchInput } = useContext(SearchNewsContext);
  const { setSavedKeyword } = useContext(SavedNewsKeywordContext);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchNews(searchInput);
  };

  useEffect(() => {
    if (searchInput) {
      setSavedKeyword(searchInput);
    } else {
      setSavedKeyword("");
    }
  }, [searchInput, setSavedKeyword]);

  return (
    <>
      <form onSubmit={handleSearchSubmit} className="searchform">
        <input
          type="text"
          className="searchform__input"
          placeholder="Nature"
          onChange={handleSearchInput}
        />
        <button
          onClick={handleClick}
          className={`searchform__button  ${
            isClicked ? "searchform__button-clicked" : ""
          }`}
          placeholder="Enter topic"
        >
          Search
        </button>
      </form>
    </>
  );
};
export default SearchForm;
