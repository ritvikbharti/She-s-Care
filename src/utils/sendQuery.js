import axios from "axios";
const apikey = import.meta.env.VITE_CHAT_API_KEY;
export const sendQuery = async(userQuery)=>{
    const options = {
    method: 'POST',
    url: 'https://api.on-demand.io/chat/v1/sessions/673ced87596df883858e362b/query',
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
        console.log(res.data)
        return res.data;
    }catch(error){
        console.log("CANT GET CHAT RESPONSE", error);
    }
}