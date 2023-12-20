import { SERVER__URL } from "./Api";

import { checkResponse } from "./auth";
const KEY = "0028693c676a4e198749bf8d99088f91";
const BASEAPI_URL = `https://newsapi.org`;
const SERVERAPI_URL = "https://nomoreparties.co";
const toDate = new Date().toISOString().split("T")[0]; // Today's date
const fromDate = new Date();
fromDate.setDate(fromDate.getDate() - 7);
const fromDateStr = fromDate.toISOString().split("T")[0];

// const processResopnse = (res) => {
//   if (res.ok) {
//     return res.json();
//   } else {
//     return Promise.reject(`Error at getting articles ${res.setatus}`);
//   }
// };
// export async function getArticles(query) {
//   const res = await fetch(
//     SERVER__URL=== "https://api.newsofworld.twilightparadox.com"
//       ? `${SERVERAPI_URL}/news/v2/top-headlines?country=us&q=${query}&apiKey=${KEY}&from=${fromDateStr}&to=${toDate}&pageSize=100 `
//       : `${BASEAPI_URL}/v2/everything?q=${query}&apiKey=${KEY}&from=${fromDateStr}&to=${toDate}&pageSize=100/everything`
//   );
//   return processResopnse(res);
// }

export async function getArticles(query) {
  const commonParams = `&apiKey=${KEY}&from=${fromDateStr}&to=${toDate}&pageSize=100`;

  const baseUrl =
    SERVER__URL === "https://api.newsofworld.twilightparadox.com"
      ? `${SERVERAPI_URL}/news/v2/top-headlines?country=us&q=${query}`
      : `${BASEAPI_URL}/v2/everything?q=${query}`;

  const fullUrl = `${baseUrl}${commonParams}`;

  // Fetch data from the API
  const res = await fetch(fullUrl);

  // Process the API response
  const data = checkResponse(res);
  return data;
}
