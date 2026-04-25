import axios from "axios";
import type { Message } from "../interfaces/message";

class ChatService {
  constructor() {
    console.log("env", import.meta.env);
  }
  private url = import.meta.env.VITE_API_URL + "/api/chat";

  async sendMessageToLLM(message: string) {
    if (message.trim() === "") {
      throw new Error("Message cannot be empty");
    }
    const response = await axios.post(this.url, {
      message,
    });
    return response.data;
  }

  dummySendMessage(message: string): Promise<Message> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const response: Message = {
          id: Date.now(),
          sender: "bot",
          message: `${message} => Answer: The w-auto utility can be useful if you need to remove an element’s assigned width under a specific condition, like at a particular breakpoint:`,
        };
        if (message.toLowerCase().includes("error")) {
          reject({
            id: Date.now(),
            sender: "bot",
            message: "An error occurred while processing your message.",
          });
        }
        resolve(response);
      }, 3000);
    });
  }
}

export default ChatService;
