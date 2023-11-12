import React, { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const LoginModal = ({
  handleModalClose,
  handleRegisterModal,
  userSignInAccount,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ERROR HANDLING
  const validateForm = () => {
    let isValid = true;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      isValid = false;
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    if (!password || password.length < 2 || password.length > 20) {
      isValid = false;
      setPasswordError("Password must be between 2 and 30 characters");
    } else {
      setPasswordError("");
    }
    return isValid;
  };
  // Error handling

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if (validateForm({ email, password })) {
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
      handleRegisterModal={handleRegisterModal}
      onSubmit={loginSubmit}
    >
      <label className="popupwithform__label">
        Email
        <input
          className="popupwithform__input"
          type="email>"
          name="email"
          minLength={2}
          placeholder="Email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <span className="popupwithform__error">{emailError}</span>

      <label className="popupwithform__label">
        Password
        <input
          className="popupwithform__input"
          id="password"
          type="password"
          name="password"
          // minLength={2}
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <span className="popupwithform__error">{passwordError} </span>
    </PopupWithForm>
  );
};

export default LoginModal;
