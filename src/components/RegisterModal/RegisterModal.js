import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormAndValidation } from "../FormValidation/FormAndValidation";

const RegisterModal = ({
  handleModalClose,
  handleLoginModal,
  userSignUpAccount,
  emailNotFoundError,
}) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, username } = values;

    if (isValid) {
      userSignUpAccount({ email, password, userName: username });
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
      isValid={isValid}
      emailNotFoundError={emailNotFoundError}
    >
      <label className="popupwithform__label">
        Email
        <input
          className="popupwithform__input"
          type="email"
          name="email"
          minLength={2}
          placeholder="Enter email"
          id="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <span className="popupwithform__error">{errors.email} </span>

      <label className="popupwithform__label">
        Password
        <input
          className="popupwithform__input"
          id="password"
          type="password"
          name="password"
          minLength={2}
          maxLength={30}
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <span className="popupwithform__error"> {errors.password} </span>

      <label className="popupwithform__label">
        Username
        <input
          className="popupwithform__input"
          id="username"
          type="text"
          name="username"
          minLength={2}
          maxLength={30}
          placeholder="Enter your username"
          value={values.userName}
          onChange={handleChange}
          required
        />
      </label>
      <span className="popupwithform__error">{errors.username} </span>
    </PopupWithForm>
  );
};

export default RegisterModal;
