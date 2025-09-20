import React, { useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { createSession } from "../../utils/createSession";
import { sendQuery } from "../../utils/sendQuery";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [chatSession, setChatSession] = useState(null);
  const [error, setError] = useState(null);

  // HANDLESESSION
  const handleSession = async () => {
    try {
      const sessionId = await createSession();
      setChatSession(sessionId);
    } catch (err) {
      setError("Failed to create chat session. Please try again.");
    }
  };

  // HANDLEQUERY
  const handleQuery = async (userQuery) => {
    if (!chatSession) {
      setError("No active chat session. Please create one first.");
      return;
    }

    try {
      const userMessage = { id: messages.length + 1, sender: "user", text: userQuery };
      setMessages((prev) => [...prev, userMessage]);

      const queryRes = await sendQuery(chatSession, userQuery);
      const ans = queryRes.data?.answer || "No response received.";

      const botMessage = { id: messages.length + 2, sender: "bot", text: ans };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("ERROR IN CHATBOT JSX ON SENDING QUERY", err);
      const errorMessage = {
        id: messages.length + 2,
        sender: "bot",
        text: "I'm sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col p-2 mx-2 text-white h-[29rem] bg-dark-900 rounded-2xl transition-all max-h-full">
      <MessageList messages={messages} />

      {!chatSession ? (
        <>
          <button className="p-4" onClick={handleSession}>
            Create Session
          </button>
          {error && <p>{error}</p>}
        </>
      ) : (
        <ChatInput onSend={handleQuery} />
      )}
    </div>
  );
};

export default Chatbot;
