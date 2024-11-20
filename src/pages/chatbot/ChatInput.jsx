import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { IoAttach } from "react-icons/io5";
const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex mx-2 gap-4"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-3 py-2  outline-none rounded-2xl focus:outline-none w-64 bg-dark-400"
        placeholder="Type your message..."
      />
        <button type="submit" className="transition text-xl"><IoSend /></button>
    </form>
  );
};

export default ChatInput;
