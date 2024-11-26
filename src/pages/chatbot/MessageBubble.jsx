import React from "react";
import ReactMarkdown from "react-markdown";

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
            : "bg-dark-600 text-white self-start"
        }`}
      >
        <ReactMarkdown>
          {message.text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MessageBubble;
