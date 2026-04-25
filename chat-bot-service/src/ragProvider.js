import fs from "node:fs";
import path from "node:path";
import scosineSimilarity from "compute-cosine-similarity";

class RagProvider {
  #queryPrompt = "";

  fetchDocumentData(fileName) {
    const filePath = path.join(process.cwd(), "/data", fileName);
    console.log("fetching data from file: " + filePath);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return data;
  }

  prepareSimpleRagPrompt(query) {
    const kbData = this.fetchDocumentData("knowledgeBase.json");

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

  /**
   *
   * @param {*} query - query or message from the user
   * @param {[{vector: [number]}]} queryVector - query from user in vector format
   * @param {*} faqVectors - this is document vector
   */
  prepareRagPrompt(queryVector, faqVectors) {
    console.log("preparing RAG prompt with query vector and faq vectors");
    console.log({ queryVector, faqVectors });
    debugger;
    const ranked = faqVectors
      .map((item, index) => ({
        ...item,
        score: cosineSimilarity(queryVector, item.vector),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);
    const context = ranked.map((item) => item.answer).join("\n");
    const prompt = `
    Use the context below to answer. If the answer isn't  there, say "I don't know."
    
    Context: 
    ${context}
    `.trim();

    this.#queryPrompt = prompt;
    return prompt;
  }

  getQueryPrompt(query) {
    return this.#queryPrompt + `\nUser: ${query}`.trim();
  }
}

export default RagProvider;
