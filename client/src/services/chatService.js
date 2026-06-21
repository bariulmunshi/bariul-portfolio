import axios from "axios";

const API_URL = "https://bariul-portfolio.onrender.com/api/chat";

/**
 * Sends a message + recent history to the backend chat assistant.
 * Returns the assistant's reply text, or throws with a readable message.
 */
export const sendChatMessage = async (message, history = []) => {
    try {
        const response = await axios.post(API_URL, { message, history });
        return response.data.reply;
    } catch (error) {
        const backendMessage = error?.response?.data?.message;
        throw new Error(
            backendMessage ||
                "Couldn't reach the assistant right now. Please try again."
        );
    }
};
