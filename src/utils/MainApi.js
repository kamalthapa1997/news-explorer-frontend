import { BASE_URL } from "./Api";
import { response } from "./auth";
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
  return response(res);
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
  return response(res);
}
