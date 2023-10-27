import React, { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
const LoginModal = ({ handleModalClose, handleRegisterModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);
    handleModalClose();
  };

  return (
    <PopupWithForm
      handleModalClose={handleModalClose}
      title="Sign in"
      buttonText="Sign in"
      linkToRegOrLogin="Sign up"
      handleRegisterModal={handleRegisterModal}
      onSubmit={onSubmit}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email>"
          name="email"
          minLength={2}
          placeholder="Email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          id="password"
          type="password"
          name="password"
          minLength={2}
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
    </PopupWithForm>
  );
};

export default LoginModal;
