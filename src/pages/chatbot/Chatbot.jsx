import React, { useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can I assist you today?" },
  ]);

  const addMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: "user", text },
    ]);
    // Simulate a bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: "bot", text: "I'm here to help!" },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col p-2 max-w-md mx-auto bg-dark-900 shadow-lg rounded-2xl  transition-all h-[29rem]">
      {/* <header className=" text-white mx-auto mt-3 text-lg font-bold  h-9">
        Chatbot
      </header> */}
      <MessageList messages={messages} />
      <ChatInput onSend={addMessage} />
    </div>
  );
};

export default Chatbot;
