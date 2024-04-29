import { memo } from "react";
import { ListItem, Stack, Chip, IconButton, ListItemText } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { messages } from "@/utils/constants";
import { ListItemStyles } from "./ParticipantListItem.styles";
import propTypes from "./ParticipantListItem.props";

const JOINED = messages.chats.participants.list.JOINED;
const INVITED = messages.chats.participants.list.INVITED;

/** Renders a participant list item to be shown in the list of chat participants from a participant as it is received from the back end. */
const ParticipantListItem = ({ participant, onClickDelete, onClickEdit }) => {
    return (
        <ListItem
            sx={ListItemStyles}
            secondaryAction={
                <Stack direction="row" gap={2} alignItems={"center"}>
                    <Chip
                        variant="outlined"
                        color={participant.hasJoined ? "success" : undefined}
                        label={participant.hasJoined ? JOINED : INVITED}
                    />
                    <Stack direction="row">
                        <IconButton color="primary" onClick={onClickEdit}>
                            <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={onClickDelete}>
                            <Delete />
                        </IconButton>
                    </Stack>
                </Stack>
            }
            divider
        >
            <ListItemText
                primary={`${participant.names} ${participant.lastnames}`}
                secondary={`${participant.email}`}
            />
        </ListItem>
    );
};

ParticipantListItem.propTypes = propTypes;

const memoizedParticipantItem = memo(
    ParticipantListItem,
    (prev, next) =>
        prev.participant._id === next.participant._id &&
        prev.participant.hasJoined === next.participant.hasJoined &&
        prev.participant.names === next.participant.names &&
        prev.participant.lastnames === next.participant.lastnames &&
        prev.participant.email === next.participant.email &&
        prev.onClickDelete === next.onClickDelete &&
        prev.onClickEdit === next.onClickEdit
);

export default memoizedParticipantItem;
