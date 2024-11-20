import React from "react";
import MessageBubble from "./MessageBubble";
const MessageList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-dark-900 scrollbar-thumb-dark-600 scrollbar-thumb-hover-green">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
