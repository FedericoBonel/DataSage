import { Tabs, Tab } from "@mui/material";
import { Verified, Share } from "@mui/icons-material";
import { api, messages } from "@/utils/constants";
import propTypes from "./ChatListTabs.props";

import { TabsStyles } from "./ChatListTabs.styles";

/** Component that renders the chat list tabs for filtering the list by shared and owned chats. */
const ChatListTabs = ({ value, onClickTab }) => {
    return (
        <Tabs
            onChange={onClickTab}
            variant="fullWidth"
            value={value}
            sx={TabsStyles}
        >
            <Tab
                icon={<Share />}
                value={api.searching.chats.owner[1]}
                label={messages.chats.list.filtering.ownership.SHARED}
            />
            <Tab
                icon={<Verified />}
                value={api.searching.chats.owner[0]}
                label={messages.chats.list.filtering.ownership.OWNED}
            />
        </Tabs>
    );
};

ChatListTabs.propTypes = propTypes;

export default ChatListTabs;
