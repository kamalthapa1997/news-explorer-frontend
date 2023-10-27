import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
const RegisterModal = ({ handleModalClose, handleLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, userName);
    handleModalClose();
  };

  return (
    <PopupWithForm
      handleModalClose={handleModalClose}
      handleLoginModal={handleLoginModal}
      title="Sign up"
      buttonText="Sign up"
      linkToRegOrLogin="Sign in"
      onSubmit={onSubmit}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email>"
          name="email"
          minLength={2}
          placeholder="Enter email"
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
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <label className="modal__label">
        Username
        <input
          className="modal__input"
          id="username"
          type="text"
          name="username"
          minLength={2}
          placeholder="Enter your username"
          value={userName}
          onChange={handleUserNameChange}
        />
      </label>
    </PopupWithForm>
  );
};

export default RegisterModal;
