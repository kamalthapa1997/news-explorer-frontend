// TEST REACT AUTH

import "./App.css";
import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Section from "../Section/Section";

import LoginModal from "../LoginModal/LoginModal";
// import Preloader from "../Preloader/Preloader";
import RegisterModal from "../RegisterModal/RegisterModal";
import Footer from "../Footer/Footer";

import NewsCards from "../NewsCard/NewsCard";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

import MobileNavigationBar from "../MobileNavigationBar/MobileNavigationBar";
import { getArticles } from "../../utils/ThirdPartyApi";
// API
import * as auth from "../../utils/auth";
import * as mainapi from "../../utils/MainApi";
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
  const [hideHeader, setHideHeader] = useState(false);
  const [token, setToken] = useState("");

  const [savedKeywordsLists, setSavedKeywordsLists] = useState([]);
  const [emailNotFoundError, setEmailNotFoundError] = useState("");
  const [searched, setSearched] = useState(false);
  // ------> VIEW PORT
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);

  // Get Token

  // console.log("Length of articles =", articles.length);
  const location = useLocation();
  // const currentLocation = location.pathname;

  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage") || location.pathname
  );

  // ----->> USE EFFECT FOR VIEWPORT
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const currentUserContextValue = {
    currentUser,
    setCurrentUser,
    loggedIn,
    setLoggedIn,
  };

  const userSignInAccount = async ({ email, password }) => {
    try {
      const data = await mainapi.userSignIn({ email, password });

      if (data.token) {
        setEmailNotFoundError("");
        localStorage.setItem("jwt", data.token);
        handleTokenCheck(data.token);
        setToken(data.token);
        handleModalClose();
      } else {
        console.log("ssdsa");
        if (isSignInModalOpen) {
          setEmailNotFoundError("Incorrect email or password.");
        } else {
          setEmailNotFoundError("");
        }
      }
    } catch (error) {
      console.error(error);
      setEmailNotFoundError("Incorrect email or password.");
    }
  };

  const userSignUpAccount = async ({ email, password, userName }) => {
    try {
      const data = await mainapi.registerNewUser({ email, password, userName });
      if (data.email) {
        handleModalClose();
      } else {
        if (isSignUpModalOpen) {
          setEmailNotFoundError("This email is not available");
        } else {
          setEmailNotFoundError("");
        }
      }
    } catch (error) {
      console.error(error);
      setEmailNotFoundError("This email is not available");
    }
  };

  const handleDeleteSaved = (id) => {
    deleteSaveCard(id)
      .then(() => {
        setSavedArticles((preItems) => {
          return preItems.filter((items) => {
            return items._id !== id;
          });
        });
      })
      .catch((err) => {
        console.error("Error while deleting article.", err);
      });
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("savedArticles");
    localStorage.removeItem("jwt");

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
            settingSavedArticles(data.data);
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

  // useEffect(() => {
  //   if (!activeModal) return;

  //   const handleEscClose = (e) => {
  //     if (e.key === "Escape") {
  //       handleModalClose();
  //     }
  //   };

  //   document.addEventListener("keydown", handleEscClose);

  //   return () => {
  //     document.removeEventListener("keydown", handleEscClose);
  //   };
  // }, [activeModal]);

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

      if (savedArt && !undefined) {
        const parsedArticles = JSON.parse(savedArt);
        setSavedArticles(parsedArticles);
        // setSavedArticles(savedArt);
      }
    } else {
      setLoggedIn(false);
      localStorage.removeItem("savedArticles");
    }
  }, [loggedIn]);

  //-- HANDLE SAVE NEWS --//
  const settingSavedArticles = (newsArticles) => {
    // const reversedArticles = newsArticles.reverse();

    const reversedArticles = newsArticles;

    setSavedArticles(reversedArticles);
    localStorage.setItem("savedArticles", JSON.stringify(reversedArticles));
  };

  const handleSaveNews = async (article) => {
    if (loggedIn) {
      const isArticleSaved = savedArticles.some(
        (newsCard) => newsCard.link === article.url
      );

      try {
        if (isArticleSaved) {
          // If article is already saved, delete i
          // const updatedSavedArticle = await deleteSaveCard(article._id);
          // settingSavedArticles(updatedSavedArticle);

          handleDeleteSaved(article._id);
        } else {
          // If article is not saved, save it

          const updatedArt = {
            ...article,
            tag: searchInput || article.author,
          };

          postNewsItems(updatedArt)
            .then((item) => {
              if (item.data) {
                const newArticle = item.data;
                const updatedSavedArticle = [...savedArticles, newArticle];
                const updatedArt = articles.map((artcl) => {
                  if (artcl.url === newArticle.link) {
                    const articleUpdate = { ...artcl, _id: newArticle._id };
                    return articleUpdate;
                  } else {
                    return artcl;
                  }
                });

                setArticles(updatedArt);
                localStorage.setItem("articles", JSON.stringify(updatedArt));

                settingSavedArticles(updatedSavedArticle);
              }
            })
            .catch((err) => {
              console.error("Error while saving article.", err);
            });
        }
      } catch (error) {
        console.error("Error while handling save news:", error);
        // Handle the error as needed, e.g., show an error message to the user
      }
    } else {
      setActiveModal("userLogin");

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
    setSignInModalOpen(true);
    setHideHeader(!hideHeader);
    setMenuBarOpen(false);

    // hide the header
  };

  const handleRegisterModal = () => {
    setActiveModal("userRegister");
    setSignUpModalOpen(true);
  };
  const handleModalClose = () => {
    setActiveModal("");
    setSignInModalOpen(false);
    setSignUpModalOpen(false);
    setEmailNotFoundError("");
  };

  //-- HANDLE SEARCH FORM --//
  const handleSearchNews = async (searchInput) => {
    // SEARCHED TRUE
    setSearched(true);
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
    <div className="app">
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
                  <div className="appbody">
                    {!(activeModal && viewportWidth < 767) && (
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
                    )}

                    <Switch>
                      <Route exact path="/">
                        <Main handleSearchNews={handleSearchNews} />

                        <NewsCards
                          articles={articles}
                          handleSaveNews={handleSaveNews}
                          searched={searched}
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
                        emailNotFoundError={emailNotFoundError}
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
