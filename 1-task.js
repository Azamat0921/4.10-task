import express from "express";
import newsController from "./controller.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(newsController);

app.listen(PORT, () => {
  console.log(`Server ${PORT} portida ishga tushdi...`);
});
