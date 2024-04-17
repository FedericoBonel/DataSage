import { useInfiniteQuery } from "@tanstack/react-query";
import { chatsAPI } from "@/apis/chats";
import { chatsCache } from "../caches";

/** It makes a back end request to get the list of all chat messages and returns the state of the query.*/
const useInfiniteChatData = ({ ownership, textSearch, page = 1, limit = 10 }) => {
    const queryState = useInfiniteQuery({
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

export default { useInfiniteChatData };
