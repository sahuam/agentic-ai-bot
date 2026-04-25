import GeminiProvider from "./geminiProvider";
import RagProvider from "./ragProvider";

async function init() {
  const gemini = new GeminiProvider(
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_MODEL,
  );

  const rag = new RagProvider();
  const faqData = rag.fetchDocumentData("faq.json");
  const faqEmbeddings = await gemini.generateEmbeddings(
    faqData.map((item) => item.answer),
    "RETRIEVAL_DOCUMENT",
  );
  const faqVectors = faqData.map((faq, index) => ({
    ...faq,
    vector: faqEmbeddings[index],
  }));
  const prompt = rag.prepareRagPrompt(queryVector, faqVectors);
}

export default init;
