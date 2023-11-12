// stage-react-auth

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
import * as auth from "../../utils/auth";
import { getNewsItems, postNewsItems, deleteSaveCard } from "../../utils/Api";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [articles, setArticles] = useState([]);
  const [menuBarOpen, setMenuBarOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedKeyword, setSavedKeyword] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [mobileIsSaved, setMobileIsSaved] = useState(false);

  const [savedKeywordsLists, setSavedKeywordsLists] = useState([]);

  // Get Token

  const [token, setToken] = useState("");

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
    try {
      auth.userSignIn({ email, password }).then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          handleTokenCheck(data.token);
          setToken(data.token);
        }
      });
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const userSignUpAccount = ({ email, password, userName }) => {
    try {
      auth.registerNewUser({ email, password, userName });
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSaved = (id) => {
    deleteSaveCard(id).then(() => {
      setSavedArticles((preItems) => {
        return preItems.filter((items) => {
          return items._id !== id;
        });
      });
    });
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser("");
    setToken("");
    if (menuBarOpen) {
      setMenuBarOpen(false);
    }
  };

  const handleTokenCheck = (token) => {
    if (token) {
      return auth
        .checkTokenValidity(token)
        .then((res) => {
          setLoggedIn(true);

          setCurrentUser(res.data);
        })
        .catch((err) => {
          setLoggedIn(false);
          console.error(err);
        });
    } else {
      setLoggedIn(false);
      localStorage.removeItem("jwt");
      setCurrentUser("");
      setToken("");
    }
  };

  // ---SET SAVED ARTICLES---//
  const settingSavedArticles = (newsArticles) => {
    const reverseArticles = newsArticles.data.reverse();

    setSavedArticles(reverseArticles);
  };

  // ---USE EFFECTS---//
  useEffect(() => {
    localStorage.setItem("currentPage", location.pathname);
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const extractedKeywords = savedArticles.map((item) => item.keyword).flat();
    const uniqueKeywords = Array.from(new Set(extractedKeywords));
    setSavedKeywordsLists(uniqueKeywords);
  }, [savedArticles]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkTokenValidity(jwt)
        .then((data) => {
          setCurrentUser(data.data);
          setToken(jwt);
          setLoggedIn(token !== "" ? true : false);
        })
        .then(() => {
          getNewsItems(jwt).then((data) => {
            settingSavedArticles(data);
          });
        })

        .catch((err) => {
          console.error(`Token validation in useEffect has error: ${err}`);
          setPreloader(false);
        });
    } else {
      setLoggedIn(false);
      setPreloader(false);
      localStorage.removeItem("jwt");
      setToken("");
    }
  }, [token]);

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

  // useEffect(() => {
  //   setPreloader(true);

  //   try {
  //     getArticles()
  //       .then((data) => {
  //         const newsArticle = data.articles;
  //         console.log(articles);

  //         const updatedArticles = newsArticle.map((article) => ({
  //           ...article,
  //           tag: searchInput,
  //         }));

  //         // localStorage.setItem("articles", JSON.stringify(updatedArticles));
  //         setArticles(data.articles);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       })
  //       .finally(() => {
  //         setPreloader(false);
  //       });
  //   } catch (error) {
  //     setPreloader(false);

  //     console.error("Nothing Found");
  //   }
  //   setPreloader(false);
  // }, [searchInput]);

  useEffect(() => {
    const storedArticles = localStorage.getItem("articles");

    if (storedArticles) {
      const parsedArticles = JSON.parse(storedArticles);
      setArticles(parsedArticles);
    }
  }, []);

  //-- HANDLE SAVE NEWS --//
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
        setSavedArticles(updatedSavedArticle);
      } else {
        const updatedSavedArticle = [...savedArticles, article];
        setSavedArticles(updatedSavedArticle);
      }
    } else {
      setLoggedIn(false);
    }

    /////////-- HERE --//////

    // if (loggedIn) {
    //   const isArticleSaved = savedArticles.some(
    //     (newsCard) => newsCard.link === article.url
    //   );

    //   if (isArticleSaved) {
    //     const id = article._id;
    //     deleteSaveCard(id).then(() => {
    //       setSavedArticles((preItems) => {
    //         return preItems.filter((items) => {
    //           return items._id !== id;
    //         });
    //       });

    //       const newItem = { ...article, _id: "" };
    //       const unsaveSearchResults = articles.map((newsArticle) =>
    //         newsArticle.url === article.url ? newItem : newsArticle
    //       );
    //       setArticles(unsaveSearchResults);
    //     });
    //   } else {
    //     postNewsItems(article).then((newsItems) => {
    //       setSavedArticles([newsItems.data, ...savedArticles]);
    //       const savedId = newsItems.data._id;

    //       const newItem = { ...article, _id: savedId };

    //       const newSearchResults = articles.map((newsItem) =>
    //         newsItem.url === article.url ? newItem : newsItem
    //       );
    //       setArticles(newSearchResults);
    //     });
    //   }
    // }
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
