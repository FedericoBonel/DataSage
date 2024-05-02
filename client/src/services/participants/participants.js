import {
    useQuery,
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import participantsAPI from "@/apis/participants/participantsAPI";
import chatsCache from "../caches/chats";
import { utilsCache } from "../caches";

/** It makes a back end request to get the list of all chats and returns the state of the query.*/
const useInfiniteParticipantDataByChat = ({
    chatId,
    textSearch,
    page = 1,
    limit = 10,
}) => {
    const queryState = useInfiniteQuery({
        // Disabling rule because including page could lead to incorrect cache generation
        // eslint-disable-next-line
        queryKey: chatsCache.participantsList(chatId, { textSearch }),
        queryFn: ({ pageParam = page }) =>
            participantsAPI.getParticipantsByChat(
                chatId,
                { textSearch },
                { page: pageParam, limit }
            ),
        getNextPageParam: (lastPage, allPages) =>
            lastPage?.data?.length ? allPages.length + 1 : undefined,
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

/** It makes a back end request to get a chat participant by id and returns the state of the query. */
const useParticipantById = (participantId, chatId, { enabled = true } = {}) => {
    const queryState = useQuery({
        queryKey: chatsCache.participantsDetail(chatId, participantId),
        queryFn: () => participantsAPI.getParticipantById(participantId, chatId),
        throwOnError: (error) => Boolean(error),
        enabled,
    });

    return queryState;
};

/** It creates and provides the state to invite participants to chats */
const useInviteParticipant = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ chatId, newParticipant }) =>
            participantsAPI.inviteParticipantToChat(newParticipant, chatId),
        onSuccess: (response, { chatId }) => {
            // Update the participants cache with the received data
            queryClient.setQueryData(
                chatsCache.participantsList(chatId, { textSearch: "" }),
                (old) => utilsCache.insertInFirstPage(old, response.data)
            );
            queryClient.setQueryData(
                chatsCache.participantsDetail(chatId, response.data._id),
                utilsCache.mockSuccessfulRes(response.data)
            );
            queryClient.invalidateQueries({
                queryKey: chatsCache.participantsLists(chatId),
            });
        },
        throwOnError: (error) =>
            error?.response?.status !== 400 && error?.response?.status !== 404,
    });

    return queryState;
};

/** It creates and provides the state to update participants from chats */
const useUpdateParticipantById = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ updatedParticipant, chatId, participantId }) =>
            participantsAPI.updateParticipantById(
                updatedParticipant,
                participantId,
                chatId
            ),
        onSuccess: (response, { participantId, chatId }) => {
            // Update the participants cache with the received data
            queryClient.setQueryData(
                chatsCache.participantsDetail(chatId, participantId),
                utilsCache.mockSuccessfulRes(response.data)
            );
            queryClient.invalidateQueries({
                queryKey: chatsCache.participantsLists(chatId),
            });
        },
        throwOnError: (error) => error?.response?.status !== 400,
    });

    return queryState;
};

/** It creates and provides the state to delete chat participants by id. */
const useDeleteParticipantFromChatById = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ chatId, participantId }) =>
            participantsAPI.deleteParticipantFromChat(participantId, chatId),
        onSuccess: (response, { chatId, participantId }) => {
            // Remove the participant from cache
            queryClient.removeQueries({
                queryKey: chatsCache.participantsDetail(chatId, participantId),
            });
            queryClient.setQueriesData(
                { queryKey: chatsCache.participantsLists(chatId) },
                (oldData) => ({
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                        ...page,
                        data: page.data.filter(
                            (item) => item._id !== participantId
                        ),
                    })),
                })
            );
            // Invalidate the participants lists
            queryClient.invalidateQueries({
                queryKey: chatsCache.participantsLists(chatId),
            });
        },
        throwOnError: (error) => error?.response?.status !== 400,
    });

    return queryState;
};

export default {
    useInviteParticipant,
    useInfiniteParticipantDataByChat,
    useParticipantById,
    useUpdateParticipantById,
    useDeleteParticipantFromChatById,
};
