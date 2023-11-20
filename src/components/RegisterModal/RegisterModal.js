import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
const RegisterModal = ({
  handleModalClose,
  handleLoginModal,
  userSignUpAccount,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const ValidateForm = () => {
    let isValid = true;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      isValid = false;
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    if (!password || password.length < 2 || password.length > 20) {
      isValid = false;
      setPasswordError("Password must be between 2 and 20 characters");
    } else {
      setPasswordError("");
    }

    if (!userName || userName.length < 2 || userName.length > 20) {
      isValid = false;
      setUserNameError("Username must be between 2 and 20 characters");
    } else {
      setUserNameError("");
    }

    return isValid;
  };

  const handleEmailChange = (e) => {
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
    if (ValidateForm()) {
      userSignUpAccount({ email, password, userName });
      handleModalClose();
    } else {
      console.error("Failed to register");
    }
  };

  return (
    <PopupWithForm
      handleModalClose={handleModalClose}
      handleLoginModal={handleLoginModal}
      title="Sign up"
      buttonText="Sign up"
      linkToRegOrLogin="Sign in"
      onSubmit={onSubmit}
      name="register"
    >
      <label className="popupwithform__label">
        Email
        <input
          className="popupwithform__input"
          type="email>"
          name="email"
          minLength={2}
          placeholder="Enter email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <span className="popupwithform__error">{emailError} </span>

      <label className="popupwithform__label">
        Password
        <input
          className="popupwithform__input"
          id="password"
          type="password"
          name="password"
          minLength={2}
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <span className="popupwithform__error"> {passwordError} </span>

      <label className="popupwithform__label">
        Username
        <input
          className="popupwithform__input"
          id="username"
          type="text"
          name="username"
          minLength={2}
          placeholder="Enter your username"
          value={userName}
          onChange={handleUserNameChange}
        />
      </label>
      <span className="popupwithform__error">{userNameError} </span>
    </PopupWithForm>
  );
};

export default RegisterModal;
