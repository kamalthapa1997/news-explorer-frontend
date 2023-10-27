import "./PopupWithForm.css";
import React from "react";

const PopupWithForm = ({
  name,

  children,

  title,

  buttonText,

  handleModalClose,
  handleLoginModal,

  isOpen,
  linkToRegOrLogin,
  onSubmit,
  handleRegisterModal,
}) => {
  return (
    <div className={`popupwithform popupwithform__type_${name}`}>
      <div className="popupwithform__container">
        <button
          type="button"
          onClick={handleModalClose}
          className="popupwithform__close"
        />

        <h3 className="popupwithform__title">{title}</h3>

        <form className="popupwithform__form" onSubmit={onSubmit}>
          {children}

          <button className="popupwithform__submit">{buttonText}</button>
          <p className="popupwithform__subtext">
            or{" "}
            <span
              className="popupwithform__registertext"
              onClick={
                linkToRegOrLogin === "Sign in"
                  ? handleLoginModal
                  : handleRegisterModal
              }
            >
              {linkToRegOrLogin}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
