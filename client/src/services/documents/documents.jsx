import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import documentsAPI from "@/apis/documents/documentsAPI";
import { utilsCache } from "../caches";
import chatsCache from "../caches/chats";

/** It makes a back end request to get the list of documents of a chat by id and returns the state of the query. */
const useChatDocsData = (chatId, { enabled = true } = {}) => {
    const queryState = useQuery({
        queryKey: chatsCache.documents(chatId),
        queryFn: () => documentsAPI.getDocsByChat(chatId),
        throwOnError: (error) => Boolean(error),
        enabled,
    });

    return queryState;
};

/** It creates and provides the state to upload documents to chats. */
const useAddDocToChatById = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ chatId, documents }) =>
            documentsAPI.addDocsToChat(documents, chatId),
        onSuccess: (response, { chatId }) => {
            // Update the documents cache with the received data
            queryClient.setQueryData(chatsCache.documents(chatId), (oldData) =>
                oldData
                    ? utilsCache.mockSuccessfulRes([
                          ...response.data,
                          ...oldData.data,
                      ])
                    : utilsCache.mockSuccessfulRes([...response.data])
            );
        },
        throwOnError: (error) => error?.response?.status !== 400,
    });

    return queryState;
};

/** It creates and provides the state to delete documents from chats. */
const useDeleteDocFromChatById = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ chatId, documentId }) =>
            documentsAPI.deleteDocFromChat(documentId, chatId),
        onSuccess: (response, { chatId, documentId }) => {
            // Remove the document from cache
            queryClient.setQueryData(chatsCache.documents(chatId), (oldData) =>
                utilsCache.mockSuccessfulRes(
                    oldData.data.filter((doc) => doc._id !== documentId)
                )
            );
            // Invalidate its list
            queryClient.invalidateQueries({
                queryKey: chatsCache.documents(chatId),
            });
        },
        throwOnError: (error) => error?.response?.status !== 400,
    });

    return queryState;
};

export default {
    useChatDocsData,
    useAddDocToChatById,
    useDeleteDocFromChatById,
};
