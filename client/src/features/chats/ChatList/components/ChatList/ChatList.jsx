import { useState } from "react";
import { chatsServices } from "@/services/chats";
import { PaginatedList } from "@/components/list";
import { TextField } from "@/components/fields";
import { messages, api } from "@/utils/constants";
import ChatListItem from "../ChatListItem/ChatListItem";
import ChatListTabs from "../ChatListTabs/ChatListTabs";
import propTypes from "./ChatList.proptypes";
import { ListStyles } from "./ChatList.styles";

/** Renders the list of chats for the logged in user. */
const ChatList = ({ selectedChat }) => {
    const [searchParams, setSearchParams] = useState({
        owned: "self",
        textSearch: "",
    });

    const chatQuery = chatsServices.useInfiniteChatData({
        ownership: searchParams.owned,
        textSearch: searchParams.textSearch,
    });

    const items = chatQuery.data?.pages.map((page) =>
        page.data.map((chatItem) => (
            <ChatListItem
                key={chatItem._id}
                chatItem={chatItem}
                selected={selectedChat === chatItem._id}
            />
        ))
    );

    return (
        <>
            <ChatListTabs
                value={searchParams.owned}
                onClickTab={(e, newValue) =>
                    setSearchParams((prev) => ({ ...prev, owned: newValue }))
                }
            />
            <TextField
                label={messages.chats.filtering.textSearch.label}
                type="search"
                variant="filled"
                inputProps={{ maxLength: api.searching.textSearch.MAX_LENGTH }}
                value={searchParams.textSearch}
                isDebounced
                onChange={(value) => {
                    setSearchParams((prev) => ({
                        ...prev,
                        textSearch: value,
                    }));
                }}
            />
            <PaginatedList
                listContainerStyles={ListStyles}
                isFetching={chatQuery.isLoading}
                onLoadMore={chatQuery.fetchNextPage}
                isLoadingMore={chatQuery.isFetchingNextPage}
                hasNextPage={chatQuery.hasNextPage}
            >
                {items}
            </PaginatedList>
        </>
    );
};

ChatList.propTypes = propTypes;

export default ChatList;
