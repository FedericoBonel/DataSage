import messagesRepository from "../../repositories/messages/messages.js";
import colaboratorsRepository from "../../repositories/colaborators/colaborators.js";
import chatsRepository from "../../repositories/chats/chats.js";
import pagesRepository from "../../repositories/pages/pages.js";
import messagesDTO from "../../dtos/messages/index.js";
import { chatMemoryFrom, getQAChain } from "./utils/index.js";
import { NotFoundError } from "../../utils/errors/index.js";
import { messages, validation } from "../../utils/constants/index.js";

/**
 * Generate an AI response for a user prompt message.
 * @param {string} prompt User prompt.
 * @param {string} chatId Id of the chat where the message is being sent.
 * @param {string} userId Id of the user generating the message
 * @returns The generated message.
 */
const generateResponse = async (prompt, chatId, userId) => {
    // Validate the user has access to the chat and get its colabarator data
    const foundColaborator = await colaboratorsRepository.getByChatAndUser(chatId, userId);
    if (!foundColaborator) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    // Get the last chat history messages for the colaborator if any
    const historyMessages = await messagesRepository.getAllBy(
        { colaboratorId: foundColaborator._id },
        { limit: validation.messages.generation.MAX_HISTORY, sort: "-createdAt" }
    );
    const chatMemory = chatMemoryFrom(historyMessages);

    // Get the chat knowledge base reference (uploaded documents)
    const chatWithDocuments = await chatsRepository.getById(chatId);

    // Create a retriever for those documents
    const pagesRetriever = await pagesRepository.getRetrieverByDocs(
        chatWithDocuments.documents.map((doc) => doc._id.toString())
    );

    // Get the LLM model
    const llmModel = chatsRepository.getLLM();

    // Generate the response with that LLM, retrievers and chat history
    const chain = getQAChain(llmModel, pagesRetriever, chatMemory);
    const response = await chain.invoke({ question: prompt });

    // Store the new messages in history
    const newMessages = await messagesRepository.saveAll([
        messagesDTO.toMessageModel(prompt, foundColaborator._id, validation.messages.actors.human),
        messagesDTO.toMessageModel(
            response.text,
            foundColaborator._id,
            validation.messages.actors.AI,
            response.sourceDocuments
        ),
    ]);

    return messagesDTO.toMessageOutputDTO(
        newMessages.find((message) => message.from === validation.messages.actors.AI)
    );
};

export default { generateResponse };
