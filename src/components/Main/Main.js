import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css";
function Main({ handleSearchNews }) {
  return (
    <div className="main">
      <h2 className="main__headings"> What's going on in the world?</h2>
      <p className="main__textcontent">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm handleSearchNews={handleSearchNews} />
    </div>
  );
}

export default Main;
