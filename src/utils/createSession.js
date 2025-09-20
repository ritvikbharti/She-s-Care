import axios from "axios";
const chatApi = import.meta.env.VITE_CHAT_API_KEY;

export const createSession = async () => {
  const url = "https://api.on-demand.io/chat/v1/sessions";

  const body = {
    agentIds: ["agent-1712327325", "agent-1713962163"], // update dynamically if needed
    externalUserId: "user-" + Date.now(),
    contextMetadata: [
      { key: "userId", value: "1" },
      { key: "name", value: "John" }
    ]
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        apikey: chatApi,
      },
    });

    console.log(" Session created:", response.data);
    return response.data.data.id; // return sessionId
  } catch (error) {
    console.error("ERROR WHILE CREATING SESSION:", error.response?.data || error.message);
    throw error;
  }
};
