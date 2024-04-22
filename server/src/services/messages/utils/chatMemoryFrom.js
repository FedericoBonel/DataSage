import { getChatMemory, getAIMessage, getHumanMessage } from "../../../lib/langchain.js";
import { validation } from "../../../utils/constants/index.js";

/**
 * Generates an in memory chat memory (LangChain) from a list of messages as they are stored in database
 * 
 * NOTE: Saves the history in chain key "chat_history", input key in "question" and output key in "text".
 * @param {Array.<*>} messages Messages as they are stored in database
 * @returns Memory object containing all chat messages passed
 */
const chatMemoryFrom = (messages) =>
    getChatMemory({
        messages: messages.map((message) =>
            message.from === validation.messages.actors.AI
                ? getAIMessage(message.content)
                : getHumanMessage(message.content)
        ),
    });

export default chatMemoryFrom;
