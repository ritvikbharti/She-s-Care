import axios from "axios";
const chatApi = import.meta.env.VITE_CHAT_API_KEY;

export const createSession = async () => {
  const options = {
    method: 'POST',
    url: 'https://api.on-demand.io/chat/v1/sessions',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      apikey: chatApi
    },
    data : {externalUserId: 'sourav'}
  }
  try{
    const sessionReponse = await axios.request(options);
    console.log(sessionReponse.data);
  }catch(error){
    console.log("ERROR WHILE CREATING SESSION", error);
  }

};
