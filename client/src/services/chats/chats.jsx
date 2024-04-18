import {
    useQuery,
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { chatsAPI } from "@/apis/chats";
import { chatsCache, utilsCache } from "../caches";

/** It makes a back end request to get the list of all chats and returns the state of the query.*/
const useInfiniteChatData = ({
    ownership,
    textSearch,
    page = 1,
    limit = 10,
}) => {
    const queryState = useInfiniteQuery({
        // Disabling rule because including page could lead to incorrect cache generation
        // eslint-disable-next-line
        queryKey: chatsCache.list({ textSearch, ownership }),
        queryFn: ({ pageParam = page }) =>
            chatsAPI.getChats(
                { ownership, textSearch },
                { page: pageParam, limit }
            ),
        getNextPageParam: (lastPage, allPages) =>
            lastPage?.data?.length ? allPages.length + 1 : undefined,
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

/** It creates and provides the state to create new chats. */
const useCreateChat = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: (newChat) => chatsAPI.createChat(newChat),
        onSuccess: (response) => {
            // Update the query for the details of the chat
            queryClient.setQueryData(
                chatsCache.detail(response.data._id),
                utilsCache.mockSuccessfulRes({
                    ...response.data,
                    isOwner: true,
                    hasJoined: true,
                    permissions: [],
                })
            );
            // Invalidate list query
            queryClient.invalidateQueries(chatsCache.lists());
        },
        throwOnError: (error) => error?.response?.status !== 400,
    });

    return queryState;
};

/** It makes a back end request to get a chat by id returns the state of the query. */
const useChatById = (chatId) => {
    const queryState = useQuery({
        queryKey: chatsCache.detail(chatId),
        queryFn: () => chatsAPI.getChatById(chatId),
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

/** It creates and provides the state to update chats. */
const useUpdateByIdChat = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ chatId, updatedChat }) =>
            chatsAPI.updateChatById(updatedChat, chatId),
        onSuccess: (response) => {
            // Update the query for the details of the chat
            queryClient.setQueryData(
                chatsCache.detail(response.data._id),
                utilsCache.mockSuccessfulRes({
                    ...response.data,
                    isOwner: true,
                    hasJoined: true,
                    permissions: [],
                })
            );
            // Invalidate list query
            queryClient.invalidateQueries(chatsCache.lists());
        },
        throwOnError: (error) => error?.response?.status !== 400,
    });

    return queryState;
};

/** It makes a back end request to get the list of documents of a chat by id and returns the state of the query. */
const useChatDocsData = (chatId) => {
    const queryState = useQuery({
        queryKey: chatsCache.documents(chatId),
        queryFn: () => chatsAPI.getDocsByChat(chatId),
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

/** It creates and provides the state to upload documents to chats. */
const useAddDocToChatById = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ chatId, documents }) =>
            chatsAPI.addDocsToChat(documents, chatId),
        onSuccess: (response, { chatId }) => {
            // Update the documents cache with the received data
            queryClient.setQueryData(chatsCache.documents(chatId), (oldData) =>
                utilsCache.mockSuccessfulRes([
                    ...response.data,
                    ...oldData.data,
                ])
            );
        },
        throwOnError: (error) => error?.response?.status !== 400,
    });

    return queryState;
};

/** It creates and provides the state to upload documents to chats. */
const useDeleteDocFromChatById = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ chatId, documentId }) =>
            chatsAPI.deleteDocFromChat(documentId, chatId),
        onSuccess: (response, { chatId, documentId }) => {
            // Remove the document from cache
            queryClient.setQueryData(chatsCache.documents(chatId), (oldData) =>
                utilsCache.mockSuccessfulRes(
                    oldData.data.filter((doc) => doc._id !== documentId)
                )
            );
        },
        throwOnError: (error) => error?.response?.status !== 400,
    });

    return queryState;
};

export default {
    useInfiniteChatData,
    useCreateChat,
    useUpdateByIdChat,
    useChatById,
    useAddDocToChatById,
    useChatDocsData,
    useDeleteDocFromChatById,
};
