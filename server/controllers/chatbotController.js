const { getGroqResponse } = require("../services/groqService");

exports.handleUserMessage = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required." });

  try {
    const response = await getGroqResponse(message);
    res.json({ reply: response });
  } catch (err) {
    console.error("Error in chatbotController:", err);
    res.status(500).json({ error: "Failed to process message." });
  }
};
