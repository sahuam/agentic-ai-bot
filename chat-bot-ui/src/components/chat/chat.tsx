import React from "react";
import "./chat.css";
function Chat() {
  // const {} = props

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
        <div className="send-text">Hello !</div>
        <div className="receive-text">Hello !!</div>
      </div>
      <div className="chat-footer">
        <input type="text" className="message" placeholder="Type a message" />
        <button className="send">
          <i className="bi bi-send-fill"></i>
        </button>
      </div>
    </div>
  );
}

export default Chat;
