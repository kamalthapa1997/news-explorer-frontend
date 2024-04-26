import React, { useContext, useEffect } from "react";
import SearchNewsContext from "../../contexts/SearchNewsContext";
import SavedNewsKeywordContext from "../../contexts/SavedNewsKeyword";
import "./SearchForm.css";

const SearchForm = ({ handleSearchNews }) => {
  const { searchInput, setSearchInput } = useContext(SearchNewsContext);
  const { setSavedKeyword } = useContext(SavedNewsKeywordContext);

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
    <form onSubmit={handleSearchSubmit} className="searchform">
      <input
        type="text"
        className="searchform__input"
        placeholder="Enter a topic"
        value={searchInput}
        onChange={handleSearchInput}
      />
      <button
        // onClick={handleClick}
        className={`searchform__button
         
          `}
        placeholder="Enter topic"
      >
        Search
      </button>
    </form>
  );
};
export default SearchForm;
