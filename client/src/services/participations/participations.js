import { useMutation, useQueryClient } from "@tanstack/react-query";
import participationsAPI from "@/apis/participations/participationsAPI";
import chatsCache from "../caches/chats";

/** Creates the state for joining chats by id and returns it. */
const useJoinChatById = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ chatId }) => participationsAPI.joinChatById(chatId),
        onSuccess: (response, { chatId }) => {
            // Set the chat in cache as joined
            queryClient.setQueryData(chatsCache.detail(chatId), response);
            // Invalidate the chat lists
            queryClient.invalidateQueries({
                queryKey: chatsCache.lists(),
            });
        },
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

/** Creates the state for exiting chats by id and returns it. */
const useExitChatById = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ chatId }) => participationsAPI.exitChatById(chatId),
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
    useJoinChatById,
    useExitChatById,
};
