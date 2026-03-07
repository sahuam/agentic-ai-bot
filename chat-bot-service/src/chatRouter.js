import express from "express";
import GeminiProvider from "./geminiProvider.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  console.log(req.body);
  if (!message) return res.status(400).json({ error: "Message is required" });
  console.log(`received messages ${message}`);

  try {
    const gemini = new GeminiProvider(
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_MODEL,
    );
    const response = await gemini.generateResponse(message);
    console.log(`generated response: ${response}`);

    res.json({ reply: response });
  } catch (error) {
    console.error("Error generating response:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

export default router;
