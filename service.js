import fs from "fs";
import path from "path";

const newsFilePath = path.join("data", "news.json");

export function getAllNews() {
  const news = JSON.parse(fs.readFileSync(newsFilePath, "utf-8"));
  return news;
}

export function getNewsByCategory(category) {
  const news = JSON.parse(fs.readFileSync(newsFilePath, "utf-8"));
  return news.filter((item) => item.category === category);
}

export function getNewsById(id) {
  const news = JSON.parse(fs.readFileSync(newsFilePath, "utf-8"));
  return news.find((item) => item.id === id);
}

export function addNews(newNews) {
  const news = JSON.parse(fs.readFileSync(newsFilePath, "utf-8"));
  newNews.id = news.length ? Math.max(news.length) + 1 : 1;
  news.push(newNews);
  fs.writeFileSync(newsFilePath, JSON.stringify(news, null, 2), "utf-8");
  return newNews;
}

export function searchNews(query) {
  const news = JSON.parse(fs.readFileSync(newsFilePath, "utf-8"));
  return news.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
  );
}
