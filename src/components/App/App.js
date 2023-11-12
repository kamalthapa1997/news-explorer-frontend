// stage-react-auth

import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Section from "../Section/Section";

import LoginModal from "../LoginModal/LoginModal";
import Preloader from "../Preloader/Preloader";
import RegisterModal from "../RegisterModal/RegisterModal";
import Footer from "../Footer/Footer";

import NewsCardList from "../NewsCard/NewsCard";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import { getArticles } from "../../utils/ThirdPartyApi";
import MobileNavigationBar from "../MobileNavigationBar/MobileNavigationBar";

// CONTEXTS
import SavedNewsKeywordContext from "../../contexts/SavedNewsKeyword";
import SavedNewsListContext from "../../contexts/SavedNewsListContext";
import SearchNewsContext from "../../contexts/SearchNewsContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [preloader, setPreloader] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [query, setQuery] = useState("tesla");
  const [articles, setArticles] = useState([]);
  const [menuBarOpen, setMenuBarOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedKeyword, setSavedKeyword] = useState([]);

  const handleSavedNewsList = (saveArticle) => {
    console.log("saveArticle", saveArticle);
    setSavedArticles(saveArticle);
  };

  // TO HERE
  const handleIsSaved = (e) => {
    console.log(e);
    setIsSaved(!isSaved);
  };

  const handleLoginModal = (e) => {
    setActiveModal("userLogin");
  };
  const handleRegisterModal = () => {
    setActiveModal("userRegister");
  };
  const handleModalClose = () => {
    setActiveModal("");
  };

  // Handle search form
  const handleSearchNews = async (searchInput) => {
    setPreloader(true);

    try {
      getArticles(searchInput)
        .then((data) => {
          setArticles(data.articles);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Nothing Found");
    }
    setPreloader(false);
  };

  useEffect(() => {
    try {
      getArticles()
        .then((data) => {
          localStorage.setItem("articles", JSON.stringify(data.articles));
          setArticles(data.articles);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Nothing Found");
    }
  }, []);

  //HANDLE MENU BAR
  const handleMenuBar = () => {
    console.log("kkk");
    setMenuBarOpen(!menuBarOpen);
  };
  const handleCloseMenuBar = () => {
    // setMenuBarOpen();
    setMenuBarOpen(!menuBarOpen);

    setIsSaved(false);
  };

  // Storing cards in local storage

  return (
    <BrowserRouter>
      <div className="App">
        <SearchNewsContext.Provider value={{ searchInput, setSearchInput }}>
          <SavedNewsListContext.Provider
            value={{ savedArticles, setSavedArticles }}
          >
            <SavedNewsKeywordContext.Provider
              value={{ savedKeyword, setSavedKeyword }}
            >
              <div className="appBody">
                <Header
                  loggedIn={loggedIn}
                  handleMenuBar={handleMenuBar}
                  handleLoginModal={handleLoginModal}
                  menuBarOpen={menuBarOpen}
                  handleIsSaved={handleIsSaved}
                  isSaved={isSaved}
                />
                <Switch>
                  <Route exact path="/">
                    <Main handleSearchNews={handleSearchNews} />
                    <NewsCardList
                      articles={articles}
                      handleSavedNewsList={handleSavedNewsList}
                    />
                    <Section />
                  </Route>

                  <ProtectedRoute loggedIn={loggedIn} path="/saved-news">
                    <SavedNewsHeader
                      handleLoginModal={handleLoginModal}
                      loggedIn={loggedIn}
                      isSaved={true}
                    />
                  </ProtectedRoute>
                </Switch>

                <Footer />

                {menuBarOpen && (
                  <MobileNavigationBar
                    handleLoginModal={handleLoginModal}
                    loggedIn={loggedIn}
                    handleIsSaved={handleIsSaved}
                    handleCloseMenuBar={handleCloseMenuBar}
                  />
                )}
                {activeModal === "userLogin" && (
                  <LoginModal
                    handleModalClose={handleModalClose}
                    handleRegisterModal={handleRegisterModal}
                  />
                )}
                {activeModal === "userRegister" && (
                  <RegisterModal
                    handleLoginModal={handleLoginModal}
                    handleModalClose={handleModalClose}
                  />
                )}
                {preloader === true && <Preloader />}
              </div>
            </SavedNewsKeywordContext.Provider>
          </SavedNewsListContext.Provider>
        </SearchNewsContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
