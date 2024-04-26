import "./PopupWithForm.css";
import React, { useEffect } from "react";
const PopupWithForm = ({
  name,

  children,

  title,

  buttonText,
  isValid,
  handleModalClose,
  handleLoginModal,

  linkToRegOrLogin,
  onSubmit,
  handleRegisterModal,
  emailNotFoundError,
}) => {
  useEffect(() => {
    // we should define the handler inside `useEffect`, so that it wouldn’t lose the reference to be able to remove it
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleModalClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // don’t forget to remove the listener in the `clean-up` function
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleModalClose]);

  // here is the overlay handler
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  return (
    <div
      className={`popupwithform  popupwithform-${name}`}
      onClick={handleOverlay}
    >
      <div className="popupwithform__container">
        <button
          type="button"
          onClick={handleModalClose}
          className="popupwithform__close"
        />

        <h3 className="popupwithform__title">{title}</h3>

        <form className="popupwithform__form" onSubmit={onSubmit}>
          {children}
          <span className="popupwithform__form-error">
            {emailNotFoundError}
          </span>
          <button
            type="submit"
            disabled={!isValid}
            className={`popupwithform__submit ${
              isValid ? "popupwithform__submit-on" : "popupwithform__submit-off"
            }`}
          >
            {buttonText}
          </button>
          <p className="popupwithform__subtext">
            or{" "}
            <button
              type="submit"
              className="popupwithform__registertext"
              onClick={
                linkToRegOrLogin === "Sign in"
                  ? handleLoginModal
                  : handleRegisterModal
              }
            >
              {linkToRegOrLogin}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
