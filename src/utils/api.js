import axios from 'axios';

const serverApi = "https://backend-1qa8.onrender.com";

axios.defaults.withCredentials = true;


// Function to check if room exists by sending a get request to the server

export const getRoomExists = async (roomId) => {
    const response = await axios.get(`${serverApi}/api/room-exists/${roomId}`);
    return response.data;
};


// function to check if turn credentials exist
export const getTURNCredentials = async () => {
    const response = await axios.get(`${serverApi}/api/get-turn-credentials`);
    return response.data;
    
};
