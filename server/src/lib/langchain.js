// eslint-disable-next-line import/extensions
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { CohereRerank } from "@langchain/cohere";
// eslint-disable-next-line no-extraneous-dependencies
import { HumanMessage, AIMessage } from "@langchain/core/messages";
// eslint-disable-next-line import/extensions
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
// eslint-disable-next-line import/extensions
import { ConversationalRetrievalQAChain } from "langchain/chains";
import config from "../config/index.js";

const CHAT_HISTORY_KEY = "chat_history";
const CHAT_INPUT_KEY = "question";
const CHAT_OUTPUT_KEY = "text";

const embeddings = new OpenAIEmbeddings({ openAIApiKey: config.llm.apiKey });
const chat = new ChatOpenAI({ openAIApiKey: config.llm.apiKey, temperature: config.llm.temperature });

/** Returns the embeddings instance to be used in the application */
const getEmbeddings = () => embeddings;

/** Returns the llm chat instance to be used in the application */
const getLLMChat = () => chat;

/** Parses a PDF into individual pages from a buffer of bytes */
const parsePDFFromBuffer = async (buffer) => {
    const docBlob = new Blob([buffer], { type: "application/pdf" });
    const loader = new WebPDFLoader(docBlob);
    return loader.load();
};

/** Vector store to be used in the application */
const VectorStore = MongoDBAtlasVectorSearch;

/**
 * Generates a new chat memory from a chat history IN MEMORY
 * @param {{messages: Array.<AIMessage | HumanMessage>}} history The chat message history
 * @returns The generated chat memory to insert in a chain
 */
const getChatMemory = ({ messages }) =>
    new BufferMemory({
        chatHistory: new ChatMessageHistory(messages),
        memoryKey: CHAT_HISTORY_KEY,
        inputKey: CHAT_INPUT_KEY,
        outputKey: CHAT_OUTPUT_KEY,
    });

/** Generates a new human chat message */
const getHumanMessage = (messageContent) => new HumanMessage(messageContent);

/** Generates a new AI message */
const getAIMessage = (messageContent) => new AIMessage(messageContent);

/** Gets the conversational retrieval qa chains class to create new chains to mantain conversations with retrievers. */
const getConversationalRetrievalQAChain = () => ConversationalRetrievalQAChain;

/**
 * Gets the reranker retriever that recieves the results from a base retriever and reranks them by relevance using a specific model for it.
 * This allows better results since sometimes vector retrievers may put relevant documents down in the ordering of their results.
 *
 * @param {*} baseRetriever The retriever that returns a number of documents (normally one that comes from a vector store using a vector search)
 * @param {Number} topN The number of top documents to be returned after reranking.
 * @returns The instance of the reranker that must be used to rerank all documents by relevance after vector searching.
 */
const getRerankerRetrieverFrom = (baseRetriever, topN) =>
    new ContextualCompressionRetriever({
        baseCompressor: new CohereRerank({ apiKey: config.llm.rerankerApiKey, model: config.llm.rerankerModel, topN }),
        baseRetriever,
    });

export {
    parsePDFFromBuffer,
    getEmbeddings,
    getLLMChat,
    getRerankerRetrieverFrom,
    VectorStore,
    getChatMemory,
    getHumanMessage,
    getAIMessage,
    getConversationalRetrievalQAChain,
};
