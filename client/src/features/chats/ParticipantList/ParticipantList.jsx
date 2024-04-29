import { useCallback, useState } from "react";
import { TextField } from "@/components/fields";
import { PaginatedList } from "@/components/list";
import { messages, api } from "@/utils/constants";
import ParticipantListItem from "./components/ParticipantListItem/ParticipantListItem";
import { ListStyles } from "./ParticipantList.styles";
import propTypes from "./ParticipantList.props";

/** Renders a list of participants of a chat by id and its management components (search bar, deletion and update). */
const ParticipantList = ({ chatId }) => {
    const [textSearch, setTextSearch] = useState("");
    const onChangeSearch = (query) => setTextSearch(query);

    const participantQuery = {
        chatId,
        isLoading: false,
        isSuccess: true,
        fetchNextPage: () => undefined,
        isFetchingNextPage: false,
        hasNextPage: false,
        data: {
            pages: [
                {
                    data: [
                        {
                            _id: "test",
                            names: "jane",
                            lastnames: "lastnames",
                            email: "example@mail.com",
                            hasJoined: true,
                            createdAt: new Date().toISOString(),
                        },
                        {
                            _id: "test2",
                            names: "john",
                            lastnames: "lastnames",
                            email: "example@mail.com",
                            hasJoined: true,
                            createdAt: new Date().toISOString(),
                        },
                        {
                            _id: "test3",
                            names: "david",
                            lastnames: "lastnames",
                            email: "example@mail.com",
                            hasJoined: false,
                            createdAt: new Date().toISOString(),
                        },
                    ],
                },
            ],
        },
    };

    const onDeleteParticipant = useCallback(() => undefined, []);
    const onEditParticipant = useCallback(() => undefined, []);

    const participants =
        participantQuery.isSuccess &&
        participantQuery.data.pages.map((page) =>
            page.data.map((participant) => (
                <ParticipantListItem
                    key={participant._id}
                    participant={participant}
                    onClickDelete={onDeleteParticipant}
                    onClickEdit={onEditParticipant}
                />
            ))
        );

    return (
        <>
            <TextField
                isDebounced
                value={textSearch}
                onChange={onChangeSearch}
                fullWidth
                label={messages.chats.participants.list.TEXT_SEARCH}
                variant="standard"
                type="search"
                inputProps={{ maxLength: api.searching.textSearch.MAX_LENGTH }}
            />
            <PaginatedList
                listContainerStyles={ListStyles}
                isFetching={participantQuery.isLoading}
                onLoadMore={participantQuery.fetchNextPage}
                isLoadingMore={participantQuery.isFetchingNextPage}
                hasNextPage={participantQuery.hasNextPage}
            >
                {participants}
            </PaginatedList>
        </>
    );
};

ParticipantList.propTypes = propTypes;

export default ParticipantList;
