export const SERVER__URL =
  process.env.NODE_ENV === "production"
    ? "https://api.newsofworld.twilightparadox.com"
    : "http://localhost:3000";

const getToken = (token) => {
  if (token) {
    const currentToken = localStorage.getItem(token);
    return currentToken;
  } else {
    console.error("No token in storage.");
    return null;
  }
};

export const processResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error ${res.status}`);
  }
};

export async function getNewsItems(token) {
  const res = await fetch(`${SERVER__URL}/articles`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const data = await processResponse(res);

  return data;
}

export async function postNewsItems(article) {
  const res = await fetch(`${SERVER__URL}/articles/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${getToken("jwt")}`,
    },
    body: JSON.stringify({
      keyword: article.tag ? article.tag : article.source.name,
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source.name,
      link: article.url,
      image: article.urlToImage || article.url,
    }),
  });
  const data = await processResponse(res);
  return data;
}

export async function deleteSaveCard(id) {
  const res = await fetch(`${SERVER__URL}/articles/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${getToken("jwt")}`,
    },
    body: JSON.stringify({
      id,
    }),
  });
  const data = await processResponse(res);
  return data;
}
