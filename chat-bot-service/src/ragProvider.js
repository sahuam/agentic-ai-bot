import fs from "node:fs";
import path from "node:path";

class RagProvider {
  static preparePrompt(query) {
    const filePath = path.join(process.cwd(), "data", "knowledgeBase.json");
    const kbData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const context = kbData
      .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
      .join("\n\n");

    const prompt = `You are an AI assistance with access to the following knowledge base:
      ${context}
      Based on the above knowledge, answer the following user question: 
      User: ${query}
      Answer in one short paragraph.`;
    return prompt;
  }
}

export default RagProvider;
