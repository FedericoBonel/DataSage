import { toMessageOutputDTO } from "./MessageOutputDTO/index.js";
import { validation } from "../../utils/constants/index.js";

/** 
 * Transforms a message content from a specific colaborator to how it should be stored in database.
 * @param {string} content Text content of the message
 * @param {{_id: string}} colaborator The colaborator instance that asked for the message or sent the message
 * @param {string} from The originator of the message (AI or Human)
 * @param {[{metadata: *, pageContent: string}]} sources Only used if the message is from AI. It points to all the sources used to generate the message.
 * @returns The message as it should be stored in database.
 */
const toMessageModel = (content, colaborator, from, sources) => {
    const formattedMessage = { content, colaborator: colaborator._id, from };

    if (from === validation.messages.actors.AI) {
        formattedMessage.sources = sources.map((source) => ({ ...source.metadata, content: source.pageContent }));
        formattedMessage.to = validation.messages.actors.human;
    } else {
        formattedMessage.to = validation.messages.actors.AI;
    }

    return formattedMessage;
};

export default { toMessageOutputDTO, toMessageModel };
