import { BASE_URL, processResponse } from "./Api";

// SIGNUP
export async function registerNewUser({ email, password, userName }) {
  const res = await fetch(`${BASE_URL}/signup`, {
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
  return processResponse(res);
}

// SIGNIN
export async function userSignIn({ email, password }) {
  const res = await fetch(`${BASE_URL}/signin`, {
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
  return processResponse(res);
}

//GET USER ARTICLES

export async function gettingUserItems(token) {
  const res = await fetch(`${BASE_URL}/articles`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return processResponse(res);
}

// Check token validity

export async function checkTokenValidity(token) {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = processResponse(res);
  return data;
}
