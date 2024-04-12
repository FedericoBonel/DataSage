import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import config from "../config/index.js";

const embeddings = new OpenAIEmbeddings({ openAIApiKey: config.llm.apiKey });
const chat = new ChatOpenAI({ openAIApiKey: config.llm.apiKey });

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

export { parsePDFFromBuffer, getEmbeddings, getLLMChat, VectorStore };
