import "./App.css";
import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Section from "../Section/Section";

import LoginModal from "../LoginModal/LoginModal";
import Preloader from "../Preloader/Preloader";
import RegisterModal from "../RegisterModal/RegisterModal";
import Footer from "../Footer/Footer";

import NewsCards from "../NewsCard/NewsCard";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

import MobileNavigationBar from "../MobileNavigationBar/MobileNavigationBar";
import { getArticles } from "../../utils/ThirdPartyApi";
// API

// CONTEXTS
import SavedNewsKeywordContext from "../../contexts/SavedNewsKeyword";
import SavedNewsListContext from "../../contexts/SavedNewsListContext";
import SearchNewsContext from "../../contexts/SearchNewsContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import IsLoadingContext from "../../contexts/IsLoadingContext";
import CurrentLocationContext from "../../contexts/CurrentLocationContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [preloader, setPreloader] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [articles, setArticles] = useState([]);
  const [menuBarOpen, setMenuBarOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedKeyword, setSavedKeyword] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [mobileIsSaved, setMobileIsSaved] = useState(false);

  const [savedKeywordsLists, setSavedKeywordsLists] = useState([]);
  const [emailNotFoundError] = useState("");

  // Get Token

  const location = useLocation();
  // const currentLocation = location.pathname;

  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage") || location.pathname
  );
  console.log("current page", currentPage);
  const currentUserContextValue = {
    currentUser,
    setCurrentUser,
    loggedIn,
    setLoggedIn,
  };

  const userSignInAccount = ({ email, password }) => {
    setLoggedIn(true);
    handleModalClose();
  };
  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);
  console.log("LOGGED IN", loggedIn);

  const userSignUpAccount = ({ email, password, userName }) => {
    handleModalClose();
  };

  const handleDeleteSaved = (url) => {
    setSavedArticles((preItems) => {
      return preItems.filter((items) => {
        return items.url !== url;
      });
    });
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("savedArticles");

    if (menuBarOpen) {
      setMenuBarOpen(false);
    }
  };

  // const handleTokenCheck = (token) => {
  //   if (token) {
  //     return auth
  //       .checkTokenValidity(token)
  //       .then((res) => {
  //         setLoggedIn(true);

  //         setCurrentUser(res.data);
  //       })
  //       .catch((err) => {
  //         setLoggedIn(false);
  //         console.error(err);
  //       });
  //   } else {
  //     setLoggedIn(false);
  //     localStorage.removeItem("jwt");
  //     setCurrentUser("");
  //     setToken("");
  //   }
  // };

  // ---USE EFFECTS---//
  useEffect(() => {
    localStorage.setItem("currentPage", location.pathname);
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const extractedKeywords = savedArticles.map((item) => item.tag).flat();
    const uniqueKeywords = Array.from(new Set(extractedKeywords));
    setSavedKeywordsLists(uniqueKeywords);
  }, [savedArticles]);

  // useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");

  //   if (jwt) {
  //     auth
  //       .checkTokenValidity(jwt)
  //       .then((data) => {
  //         setCurrentUser(data.data);
  //         setToken(jwt);
  //         setLoggedIn(token !== "" ? true : false);
  //       })
  //       .then(() => {
  //         getNewsItems(jwt).then((data) => {
  //           settingSavedArticles(data);
  //         });
  //       })

  //       .catch((err) => {
  //         console.error(`Token validation in useEffect has error: ${err}`);
  //         setPreloader(false);
  //       });
  //   } else {
  //     setLoggedIn(false);
  //     setPreloader(false);
  //     localStorage.removeItem("jwt");
  //     setToken("");
  //   }
  // }, [token]);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleModalClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const storedArticles = localStorage.getItem("articles");

    if (storedArticles) {
      const parsedArticles = JSON.parse(storedArticles);
      setArticles(parsedArticles);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const savedArt = localStorage.getItem("savedArticles");
      if (savedArt) {
        const parsedArticles = JSON.parse(savedArt);
        console.log("parsedArticles", parsedArticles);
        setSavedArticles(parsedArticles);
      }
    } else {
      setLoggedIn(false);
      localStorage.removeItem("savedArticles");
    }
  }, [loggedIn]);

  //-- HANDLE SAVE NEWS --//
  const settingSavedArticles = (newsArticles) => {
    const reversedArticles = newsArticles.reverse();
    setSavedArticles(reversedArticles);
    localStorage.setItem("savedArticles", JSON.stringify(reversedArticles));
  };

  const handleSaveNews = (article) => {
    if (loggedIn) {
      const isArticleSaved = savedArticles.some(
        (newsCard) => newsCard.url === article.url
      );

      if (isArticleSaved) {
        // const id = article._id;
        const updatedSavedArticle = savedArticles.filter(
          (newsCard) => newsCard.urlToImage !== article.urlToImage
        );
        settingSavedArticles(updatedSavedArticle);
      } else {
        console.log(searchInput, "searchInput");
        const updatedArt = {
          ...article,
          tag: searchInput || article.author,
        };
        const updatedSavedArticle = [...savedArticles, updatedArt];
        console.log("======>>", updatedSavedArticle);

        settingSavedArticles(updatedSavedArticle);
      }
    } else {
      setLoggedIn(false);
    }
  };

  const handleMobileIsSaved = () => {
    setMobileIsSaved(!mobileIsSaved);
  };

  const handleIsSaved = () => {
    setIsSaved(!isSaved);
  };

  const handleLoginModal = (e) => {
    setActiveModal("userLogin");
    setMenuBarOpen(false);
  };
  const handleRegisterModal = () => {
    setActiveModal("userRegister");
  };
  const handleModalClose = () => {
    setActiveModal("");
  };

  //-- HANDLE SEARCH FORM --//
  const handleSearchNews = async (searchInput) => {
    setPreloader(true);
    try {
      const data = await getArticles(searchInput);

      if (data && data.articles) {
        const newsArticles = data.articles.map((article) => ({
          ...article,
          tag: searchInput,
        }));

        setArticles(newsArticles);
        localStorage.setItem("articles", JSON.stringify(newsArticles));
      } else {
        console.error("No articles found");
      }
    } catch (error) {
      console.error("Nothing Found");
    } finally {
      setPreloader(false);
    }
  };

  //HANDLE MENU BAR
  const handleMenuBar = () => {
    setMenuBarOpen(!menuBarOpen);
  };
  const handleCloseMenuBar = () => {
    setMenuBarOpen(!menuBarOpen);
    setMobileIsSaved(!mobileIsSaved);
    setIsSaved(false);
  };

  return (
    <div className="App">
      <SearchNewsContext.Provider value={{ searchInput, setSearchInput }}>
        <SavedNewsListContext.Provider
          value={{ savedArticles, setSavedArticles }}
        >
          <SavedNewsKeywordContext.Provider
            value={{ savedKeyword, setSavedKeyword }}
          >
            <CurrentUserContext.Provider value={{ currentUserContextValue }}>
              <IsLoadingContext.Provider value={{ preloader, setPreloader }}>
                <CurrentLocationContext.Provider
                  value={{ currentPage, setCurrentPage }}
                >
                  <div className="appBody">
                    <Header
                      loggedIn={loggedIn}
                      handleMenuBar={handleMenuBar}
                      handleLoginModal={handleLoginModal}
                      menuBarOpen={menuBarOpen}
                      handleIsSaved={handleIsSaved}
                      isSaved={isSaved}
                      handleSignOut={handleSignOut}
                      mobileIsSaved={mobileIsSaved}
                    />
                    <Switch>
                      <Route exact path="/">
                        <Main handleSearchNews={handleSearchNews} />

                        <NewsCards
                          articles={articles}
                          handleSaveNews={handleSaveNews}
                        />
                        <Section />
                      </Route>

                      <ProtectedRoute loggedIn={loggedIn} path="/articles">
                        <SavedNewsHeader
                          savedKeywordsLists={savedKeywordsLists}
                          handleLoginModal={handleLoginModal}
                          loggedIn={loggedIn}
                          isSaved={true}
                          handleDeleteSaved={handleDeleteSaved}
                          handleSignOut={handleSignOut}
                        />
                      </ProtectedRoute>
                    </Switch>

                    <Footer />

                    {preloader && <Preloader />}
                    {menuBarOpen && (
                      <MobileNavigationBar
                        MobileNavigationBar={MobileNavigationBar}
                        handleLoginModal={handleLoginModal}
                        loggedIn={loggedIn}
                        handleMobileIsSaved={handleMobileIsSaved}
                        handleCloseMenuBar={handleCloseMenuBar}
                        handleSignOut={handleSignOut}
                      />
                    )}
                    {activeModal === "userLogin" && (
                      <LoginModal
                        handleModalClose={handleModalClose}
                        handleRegisterModal={handleRegisterModal}
                        userSignInAccount={userSignInAccount}
                        emailNotFoundError={emailNotFoundError}
                      />
                    )}
                    {activeModal === "userRegister" && (
                      <RegisterModal
                        handleLoginModal={handleLoginModal}
                        handleModalClose={handleModalClose}
                        userSignUpAccount={userSignUpAccount}
                      />
                    )}
                  </div>
                </CurrentLocationContext.Provider>
              </IsLoadingContext.Provider>
            </CurrentUserContext.Provider>
          </SavedNewsKeywordContext.Provider>
        </SavedNewsListContext.Provider>
      </SearchNewsContext.Provider>
    </div>
  );
}

export default App;
