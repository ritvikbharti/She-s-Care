import axios from "axios";
const apikey = import.meta.env.VITE_CHAT_API_KEY;
export const sendQuery = async(userQuery)=>{
    const options = {
    method: 'POST',
    url: 'https://api.on-demand.io/chat/v1/sessions/6744b768d2b01e61b6088012/query',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        apikey: apikey
    },
    data: {
        responseMode: 'sync',
        query: userQuery,
        endpointId: 'predefined-openai-gpt4o'
    }
    };
    try{
     
        const res = await axios.request(options);
        console.log(res.data);
        return res.data;
    }catch(error){
        console.log("CANT GET CHAT RESPONSE", error);
    }
}


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