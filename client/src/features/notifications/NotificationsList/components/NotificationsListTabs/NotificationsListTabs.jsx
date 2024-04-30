import { Tabs, Tab } from "@mui/material";
import { Mail, Drafts as ReadMail } from "@mui/icons-material";
import propTypes from "./NotificationsListTabs.props";
import { messages } from "@/utils/constants";

/** Component that renders the notifications list tabs for filtering the list by read and not read notifications. */
const NotificationsListTabs = ({ value, onClickTab }) => {
    return (
        <Tabs value={value} onChange={onClickTab} variant="fullWidth">
            <Tab
                value={"false"}
                label={messages.notifications.list.filtering.NOT_READ}
                iconPosition="start"
                icon={<Mail />}
            />
            <Tab
                value={"true"}
                label={messages.notifications.list.filtering.READ}
                iconPosition="start"
                icon={<ReadMail />}
            />
        </Tabs>
    );
};

NotificationsListTabs.propTypes = propTypes;

export default NotificationsListTabs;
