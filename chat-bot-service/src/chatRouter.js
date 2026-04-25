import express from "express";
import GeminiProvider from "./geminiProvider.js";
import RagProvider from "./ragProvider.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  console.log(req.body);
  if (!message) return res.status(400).json({ error: "Message is required" });
  console.log(`received messages ${message}`);

  try {
    // const prompt = RagProvider.prepareSimpleRagPrompt(message);

    const gemini = new GeminiProvider(
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_MODEL,
    );

    const queryEmbedding = await gemini.generateEmbeddings(message);
    const queryVector = queryEmbedding[0];
    console.log("query vector: ", queryVector);
    debugger;
    // Fetch FAQ vectors from faqs.json
    const rag = new RagProvider();
    const faqData = rag.fetchDocumentData("faq.json");
    const faqEmbeddings = await gemini.generateEmbeddings(
      faqData.map((item) => item.answer),
      "RETRIEVAL_DOCUMENT",
    );

   
    console.log(`prepared prompt: ${prompt}`);
    const ragResponse = await gemini.generateResponse(prompt);
    res.json({ reply: ragResponse });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Internal Server Error", message: error });
  }
});

export default router;
