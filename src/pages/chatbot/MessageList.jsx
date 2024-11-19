import React from "react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
