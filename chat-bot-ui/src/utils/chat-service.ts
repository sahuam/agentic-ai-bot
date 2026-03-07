import axios from "axios";

class ChatService {
  constructor() {
    console.log('env',import.meta.env);
  }
  private url = import.meta.env.VITE_API_URL;

  async sendMessageToLLM(message: string) {
    const response = await axios.post(this.url, {
      message,
    });
    return { data: response };
  }

  dummySendMessage() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const response = `The w-auto utility can be useful if you need to remove an element’s assigned width under a specific condition, like at a particular breakpoint:`;
        resolve({ data: response });
      }, 2000);
    });
  }
}

export default ChatService;
