import express from "express";
import {
  getAllNews,
  getNewsByCategory,
  getNewsById,
  addNews,
  searchNews,
} from "./service.js";

const router = express.Router();

router.get("/api/news/search", (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res
      .status(400)
      .json({ message: "Qidirish so'rovi bo'yicha ma'lumot kiritilmadi!" });
  }

  const results = searchNews(q);
  res.json(results);
});

router.get("/api/news", (req, res) => {
  const news = getAllNews();
  res.json(news);
});

router.get("/api/news/category/:name", (req, res) => {
  const { name } = req.params;
  const news = getNewsByCategory(name);
  res.json(news);
});

router.get("/api/news/:id", (req, res) => {
  const { id } = req.params;
  const news = getNewsById(Number(id));
  if (!news) {
    return res.status(404).json({ message: "Yangilik topilmadi" });
  }
  res.json(news);
});

router.post("/api/news", (req, res) => {
  const { title, content, category, date } = req.body;
  if (!title || !content || !category || !date) {
    return res
      .status(400)
      .json({ message: "Barcha maydonlar to'ldirilishi kerak!" });
  }

  const newNews = { title, content, category, date };
  const addedNews = addNews(newNews);
  res.status(201).json(addedNews);
});

export default router;
