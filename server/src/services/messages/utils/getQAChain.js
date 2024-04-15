import { getConversationalRetrievalQAChain } from "../../../lib/langchain.js";

/**
 * Creates a new chain to mantain conversations with an LLM with context (received in the retriever) and history (received in the memory).
 *
 * NOTE: Needs to be invoked with {question: {user prompt}}
 * @param {*} llm Instance of the LLM to be used
 * @param {*} retriever Retriever from which to get the context for the LLM to generate responses
 * @param {*} memory The conversation's history in a memory object.
 * @returns The executable chain that can be invoked.
 */
const getQAChain = (llm, retriever, memory) =>
    getConversationalRetrievalQAChain().fromLLM(llm, retriever, { memory, returnSourceDocuments: true });

export default getQAChain;
