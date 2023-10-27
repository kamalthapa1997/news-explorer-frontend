import { useContext, useState } from "react";
import SearchNewsContext from "../../contexts/SearchNewsContext";

import SavedNewsKeywordContext from "../../contexts/SavedNewsKeyword";

const SearchForm = ({ handleSearchNews }) => {
  // const [searchInput, setSearchInput] = useState("");
  const { searchInput, setSearchInput } = useContext(SearchNewsContext);
  const { savedKeyword } = useContext(SavedNewsKeywordContext);
  console.log("savedKeyword", savedKeyword);
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchNews(searchInput);
  };
  // console.log(searchInput);

  return (
    <>
      <form onSubmit={handleSearchSubmit} className="main__search-form">
        <input
          type="text"
          className="main__search-input"
          placeholder="Nature"
          onChange={handleSearchInput}
        />
        <button className="main__search-button" placeholder="Enter topic">
          Search
        </button>
      </form>
    </>
  );
};
export default SearchForm;
