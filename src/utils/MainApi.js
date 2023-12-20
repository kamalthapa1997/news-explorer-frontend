import { SERVER__URL } from "./Api";
import { checkResponse } from "./auth";
export async function registerNewUser({ email, password, userName }) {
  try {
    const res = await fetch(`${SERVER__URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: userName,
        password: password,
      }),
    });
    return checkResponse(res);
  } catch (error) {
    return Promise.reject(`An error occurred during login.`);
  }
}

// SIGNIN
export async function userSignIn({ email, password }) {
  try {
    const res = await fetch(`${SERVER__URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log("Response:", res);
    return checkResponse(res);
  } catch (error) {
    return Promise.reject(`An error occurred during login.`);
  }
}
