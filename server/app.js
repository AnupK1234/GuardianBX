const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const chatbotRoutes = require("./routes/chatbotRoutes");
require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/chatbot", chatbotRoutes);

app.use("/test", (req, res) => {
  res.status(404).send("This is a test endpoint");
});

module.exports = app;
