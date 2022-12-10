const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRouter = require("./routes/api/auth-routes");
const booksRouter = require("./routes/api/book-routes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, _, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
