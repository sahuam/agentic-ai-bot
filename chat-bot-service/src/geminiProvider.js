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
  }

  async generateResponse(prompt) {
    try {
      const genAI = new GoogleGenAI(this.apiKey);
      const response = await genAI.models.generateContent({
        model: this.modelName,
        contents: prompt,
        config: {
          systemInstruction: "You are a cat. Your name is Neko.",
        },
      });

      return response.text;
    } catch (error) {
      console.error("Error generating response:", error);
      throw new Error(`Error generating response: ${error.message}`);
    }
  }
}

export default GeminiProvider