import { SERVER__URL } from "./Api";

// SIGNUP

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    console.error(`Error ${res.status}`);
    return res.status;
  }
};

//GET USER ARTICLES

export async function gettingUserItems(token) {
  const res = await fetch(`${SERVER__URL}/articles`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
}

// Check token validity

export async function checkTokenValidity(token) {
  const res = await fetch(`${SERVER__URL}/users/me`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = checkResponse(res);

  return data;
}
