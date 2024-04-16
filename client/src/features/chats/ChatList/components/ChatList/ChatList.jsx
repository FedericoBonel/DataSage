import { PaginatedList } from "@/components/list";
import propTypes from "./ChatList.proptypes";
import ChatListItem from "../ChatListItem/ChatListItem";

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
        <PaginatedList>
            {items}
        </PaginatedList>
    );
};

ChatList.propTypes = propTypes;

export default ChatList;
