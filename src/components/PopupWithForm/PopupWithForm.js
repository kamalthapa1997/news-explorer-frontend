import "./PopupWithForm.css";
import React from "react";

const PopupWithForm = ({
  name,

  children,

  title,

  buttonText,

  handleModalClose,
  handleLoginModal,

  linkToRegOrLogin,
  onSubmit,
  handleRegisterModal,
  emailNotFoundError,
}) => {
  return (
    <div className={`popupwithform  popupwithform-${name}`}>
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
          <button className="popupwithform__submit">{buttonText}</button>
          <p className="popupwithform__subtext">
            or{" "}
            <button
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
