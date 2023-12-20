import { SERVER__URL } from "./Api";

// SIGNUP

export const checkResponse = async (res) => {
  if (res.ok) {
    try {
      return await res.json();
    } catch (jsonError) {
      return Promise.reject(
        `Error parsing response JSON: ${jsonError.message}`
      );
    }
  } else {
    return Promise.reject(`${res.statusText} ${res.status}`);
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
