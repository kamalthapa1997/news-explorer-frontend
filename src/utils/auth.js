import { BASE_URL } from "./Api";

// SIGNUP
export const response = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res;
};

//GET USER ARTICLES

export async function gettingUserItems(token) {
  const res = await fetch(`${BASE_URL}/articles`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response(res);
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
  const data = response(res);

  return data;
}
