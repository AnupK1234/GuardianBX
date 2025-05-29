const express = require("express");
const router = express.Router();
const { handleUserMessage } = require("../controllers/chatbotController");

router.post("/message", handleUserMessage);

module.exports = router;
