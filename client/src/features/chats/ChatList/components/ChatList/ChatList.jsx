import { useState } from "react";
import { PaginatedList } from "@/components/list";
import { TextField } from "@/components/fields";
import { messages, api } from "@/utils/constants";
import propTypes from "./ChatList.proptypes";
import ChatListItem from "../ChatListItem/ChatListItem";
import ChatListTabs from "../ChatListTabs/ChatListTabs";

const dummyData = {
    pages: [
        {
            data: [
                {
                    _id: "1234",
                    name: "Chat numero 1",
                    createdAt: "2023-10-05T14:48:00.000Z",
                    owner: {
                        _id: "1234",
                        names: "Names",
                        lastnames: "lastNames",
                    },
                },
                {
                    _id: "1235",
                    name: "Chat numero 2",
                    createdAt: "2023-10-05T14:48:00.000Z",
                    owner: {
                        _id: "1234",
                        names: "Names",
                        lastnames: "lastNames",
                    },
                },
                {
                    _id: "1236",
                    name: "Chat numero 3",
                    createdAt: "2023-10-05T14:48:00.000Z",
                    owner: {
                        _id: "1234",
                        names: "Names",
                        lastnames: "lastNames",
                    },
                },
            ],
        },
    ],
};

/** Renders the list of chats for the logged in user. */
const ChatList = ({ selectedChat }) => {
    const [searchParams, setSearchParams] = useState({
        owned: "self",
        textSearch: "",
    });

    // TODO implement service that fetches this
    const chatQuery = {
        isLoading: false,
        isSuccess: true,
        data: dummyData,
    };

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
                onChange={(e) =>
                    setSearchParams((prev) => ({
                        ...prev,
                        textSearch: e.target.value,
                    }))
                }
            />
            <PaginatedList onLoadMore={() => console.log("loaded more")}>
                {items}
            </PaginatedList>
        </>
    );
};

ChatList.propTypes = propTypes;

export default ChatList;
