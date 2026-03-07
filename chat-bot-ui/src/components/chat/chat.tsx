import React, { useState, type SyntheticEvent } from "react";
import "./chat.css";
import ChatService from "../../utils/chat-service";
import { useComponentInit } from "../../utils/initialHook";
import type { Message } from "../../interfaces/message";
import { LoadingDots } from "../common/Loader";

const chatService = new ChatService();

function Chat() {
  const init = useComponentInit();

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    try {
      const text = input;
      setMessages((prev) => [
        ...prev,
        { id: 1, message: text, sender: "user" },
      ]);
      if (input.trim() !== "") {
        init.setLoading(true);
        init.setError("");
        setInput("");
        const { reply }: { reply: string } =
          await chatService.sendMessageToLLM(text);

        // const { reply } = await chatService.dummySendMessage();
        console.log({ reply });
        setMessages((prev) => [
          ...prev,
          { id: 2, message: reply || "Something went wrong", sender: "bot" },
        ]);
      }
    } catch (error) {
      console.log(error);
      init.setError("Something went wrong");
    } finally {
      init.setLoading(false);
    }
  };

  return (
    <div className="chat-container max-w-[500px] mx-auto">
      <div className="chat-header ">
        <i
          className="bi bi-chat-dots-fill flex"
          style={{ fontSize: "2rem" }}
        ></i>
        <div className="name">
          <h2 className="">Chatbot AI Chat</h2>
          <p className="italic">Your AI Assistant</p>
        </div>
      </div>
      <div className="chat-body">
        {messages.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "gray",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            Start a conversation
          </p>
        )}
        {messages.map((message) => (
          <div
            className={`message-context ${
              message.sender === "user" ? "send-text" : "receive-text"
            }`}
          >
            <span className="sender">
              {message.sender === "user" ? "You" : "Bot"}
            </span>
            {message.message}
          </div>
        ))}
        {init.isLoading && (
          <div className={`message-context receive-text-skeleton`}>
            <span className="sender">
              Bot is typing <LoadingDots />
            </span>
          </div>
        )}
      </div>
      {init.error && <div className="error">{init.error}</div>}

      <div className="chat-footer">
        <form>
          <input
            type="text"
            className="message"
            value={input}
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="send" onClick={sendMessage}>
            <i className="bi bi-send-fill"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
