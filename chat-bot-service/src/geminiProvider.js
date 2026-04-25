import { GoogleGenAI } from "@google/genai";

class GeminiProvider {

  constructor(apiKey, modelName) {
    this.apiKey = apiKey;
    this.modelName = modelName;
    if (!this.apiKey) {
      throw new Error("API key is required for GeminiProvider");
    }

    if (!this.modelName) {
      throw new Error("Model name is required for GeminiProvider");
    }
    this.genAI = new GoogleGenAI(this.apiKey);
  }

  async generateResponse(prompt) {
    try {
      const response = await this.genAI.models.generateContent({
        contents: prompt,
        model: this.modelName,
      });
      return response.text;
    } catch (error) {
      console.error("Error generating response:", error);
      throw new Error(`Error generating response: ${error.message}`);
    }
  }

  /**
   *
   * @param {[*]} data
   * @param {'RETRIEVAL_QUERY' | 'RETRIEVAL_DOCUMENT'} taskType
   * @returns
   */
  async generateEmbeddings(data, taskType = "RETRIEVAL_QUERY") {
    try {
      const response = await this.genAI.models.embedContent({
        model: "gemini-embedding-2",
        contents: data,
        taskType,
      });
      const embeddings = response.embeddings.map(
        (embedding) => embedding.values,
      );
      return embeddings;
    } catch (error) {
      console.error("Error generating embedding:", error);
      throw new Error(`Error generating embedding: ${error.message}`);
    }
  }
}

export default GeminiProvider;
