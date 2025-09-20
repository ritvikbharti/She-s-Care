import axios from "axios";
const chatApi = import.meta.env.VITE_CHAT_API_KEY;

export const sendQuery = async (sessionId, userQuery) => {
  const url = `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`;

  const body = {
    endpointId: "predefined-openai-gpt4.1", // from your Node example
    query: userQuery,
    agentIds: ["agent-1712327325", "agent-1713962163"],
    responseMode: "sync",
    reasoningMode: "oss",
    modelConfigs: {
      fulfillmentPrompt: "",
      stopSequences: [],
      temperature: 0.7,
      topP: 1,
      maxTokens: 0,
      presencePenalty: 0,
      frequencyPenalty: 0,
    },
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        apikey: chatApi,
      },
    });

    console.log("Query Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("CANT GET CHAT RESPONSE:", error.response?.data || error.message);
    throw error;
  }
};



// {
//     "message": "Chat session created successfully",
//     "data": {
//       "id": "6744b768d2b01e61b6088012",
//       "companyId": "66e2e025f068cd8a4290863b",
//       "externalUserId": "sourav2",
//       "pluginIds": [],
//       "title": "",
//       "createdBy": "66e2e025f068cd8a4290863c",
//       "createdAt": "2024-11-25T17:44:08.40630665Z",
//       "updatedAt": "2024-11-25T17:44:08.406306695Z"
//     }
//   }