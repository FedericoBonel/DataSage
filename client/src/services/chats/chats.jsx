import {
    useQuery,
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import chatsAPI from "@/apis/chats/chatsAPI";
import chatsCache from "../caches/chats";
import { utilsCache } from "../caches";
import api from "@/utils/constants/api";

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
            queryClient.invalidateQueries({ queryKey: chatsCache.lists() });
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
const useUpdateChatById = () => {
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
            queryClient.invalidateQueries({ queryKey: chatsCache.lists() });
        },
        throwOnError: (error) => error?.response?.status !== 400,
    });

    return queryState;
};

/** It makes a back end request to get the list of all chats and returns the state of the query.*/
const useInfiniteMessageDataByChat = ({ chatId, page = 1, limit = 10 }) => {
    const queryState = useInfiniteQuery({
        // Disabling rule because including page could lead to incorrect cache generation
        // eslint-disable-next-line
        queryKey: chatsCache.messages(chatId),
        queryFn: ({ pageParam = page }) =>
            chatsAPI.getMessagesByChat(chatId, { page: pageParam, limit }),
        getNextPageParam: (lastPage, allPages) =>
            lastPage?.data?.length ? allPages.length + 1 : undefined,
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

/** It creates and provides the state to send messages in chats by id. */
const useSendMessageToChat = () => {
    const queryClient = useQueryClient();

    const queryState = useMutation({
        mutationFn: ({ chatId, message }) =>
            chatsAPI.sendMessageToChat({ content: message }, chatId),
        onMutate: async ({ chatId, message }) => {
            const msgsCache = chatsCache.messages(chatId);
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({
                queryKey: msgsCache,
            });
            // Snapshot the previous value
            const previousMessages = queryClient.getQueryData(msgsCache);
            // Optimistically update to the new value
            queryClient.setQueryData(msgsCache, (old) => {
                const newMessage = {
                    _id: message,
                    from: api.validation.messages.actor[1],
                    to: api.validation.messages.actor[0],
                    createdAt: new Date().toISOString(),
                    content: message,
                };

                return utilsCache.mockSuccessfulPaginatedRes(old, newMessage);
            });
            // Return a context object with the snapshotted value
            return { previousMessages, chatId };
        },
        onSuccess: async (response, variables) => {
            // Update the query to add the AI response
            return queryClient.setQueryData(
                chatsCache.messages(variables.chatId),
                (old) => utilsCache.insertInFirstPage(old, response.data)
            );
        },
        onError: (err, message, context) => {
            // If the mutation fails,
            // use the context returned from onMutate to roll back
            queryClient.setQueryData(
                chatsCache.messages(context.chatId),
                context.previousMessages
            );
        },
        onSettled: (data, error, variables) => {
            // Always refetch after error or success
            queryClient.invalidateQueries({
                queryKey: chatsCache.messages(variables.chatId),
            });
        },
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

/** It creates and provides the state to delete chats by id. */
const useDeleteChatById = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ chatId }) => chatsAPI.deleteChatById(chatId),
        onSuccess: (response, { chatId }) => {
            // Remove the chat from cache
            queryClient.removeQueries({ queryKey: chatsCache.detail(chatId) });
            // Invalidate the chat lists
            queryClient.invalidateQueries({
                queryKey: chatsCache.lists(),
            });
        },
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

export default {
    useInfiniteChatData,
    useCreateChat,
    useDeleteChatById,
    useUpdateChatById,
    useChatById,
    useInfiniteMessageDataByChat,
    useSendMessageToChat,
};
