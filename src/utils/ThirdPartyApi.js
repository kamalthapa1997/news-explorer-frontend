import { useState } from "react";

const KEY = "0028693c676a4e198749bf8d99088f91";
const BASE_URL = `https://newsapi.org`;
const toDate = new Date().toISOString().split("T")[0]; // Today's date
const fromDate = new Date();
fromDate.setDate(fromDate.getDate() - 7);
const fromDateStr = fromDate.toISOString().split("T")[0];

const processResopnse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error at getting articles ${res.setatus}`);
};
export async function getArticles(query) {
  const res = await fetch(
    `${BASE_URL}/v2/everything?q=${query}&apiKey=${KEY}&from=${fromDateStr}&to=${toDate}&pageSize=100`
  );
  return processResopnse(res);
}
