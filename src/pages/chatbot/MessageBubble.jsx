import React from "react";

const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-2 items-center`}
    >
      <div
        className={`max-w-xs p-3 text-sm rounded-2xl ${
          isUser
            ? "bg-primary-blue-900 text-white self-end"
            : "bg-dark-400 text-white self-start"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
