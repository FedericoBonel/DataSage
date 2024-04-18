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

/** It makes a back end request to get the list of documents of a chat by id returns the state of the query. */
const useChatDocsData = (chatId) => ({
    // TODO Implement this
    chatID: chatId,
    isSuccess: true,
    isLoading: false,
    data: {
        data: [
            {
                _id: "6618a91b05de85271bf01b2a",
                createdAt: "2024-04-12T03:23:07.810Z",
                name: "mydocs.pdf",
                url: "https://hdr.undp.org/system/files/documents/global-report-document/hdr2023-24reporten.pdf",
            },
            {
                _id: "6618a91b05de85271bf01b2b",
                createdAt: "2024-04-12T03:23:07.810Z",
                name: "docs.pdf",
                url: "https://hdr.undp.org/system/files/documents/global-report-document/hdr2023-24reporten.pdf",
            },
        ],
    },
});

/** It creates and provides the state to upload documents to chats. */
const useAddDocToChatById = () => ({
    // TODO Implement this
    mutate: () => console.log("Hehe"),
    isError: false,
    error: {},
});

export default {
    useInfiniteChatData,
    useCreateChat,
    useUpdateByIdChat,
    useChatById,
    useAddDocToChatById,
    useChatDocsData,
};
