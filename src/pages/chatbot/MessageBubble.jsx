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
        className={`max-w-xs p-3 rounded-lg ${
          isUser
            ? "bg-blue-500 text-white self-end"
            : "bg-gray-200 text-black self-start"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
