import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const LoginModal = ({
  handleModalClose,
  handleRegisterModal,
  userSignInAccount,
  emailNotFoundError,
}) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const loginSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      const { email, password } = values;
      userSignInAccount({ email, password });
    } else {
      console.error("Invalid Email or Password");
    }
  };

  return (
    <PopupWithForm
      handleModalClose={handleModalClose}
      title="Sign in"
      buttonText="Sign in"
      linkToRegOrLogin="Sign up"
      name="login"
      handleRegisterModal={handleRegisterModal}
      onSubmit={loginSubmit}
      emailNotFoundError={emailNotFoundError}
      isValid={isValid}
    >
      <label className="popupwithform__label">
        Email
        <input
          className="popupwithform__input"
          type="email"
          name="email"
          minLength={2}
          placeholder="Enter"
          id="email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
      </label>
      <span className="popupwithform__error">{errors.email}</span>

      <label className="popupwithform__label">
        Password
        <input
          className="popupwithform__input"
          id="password"
          type="password"
          name="password"
          minLength={2}
          placeholder="Enter password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
      </label>
      <span className="popupwithform__error">{errors.password} </span>
    </PopupWithForm>
  );
};

export default LoginModal;
