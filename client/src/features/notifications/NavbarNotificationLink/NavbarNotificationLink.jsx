import { Notifications } from "@mui/icons-material";
import notificationsServices from "@/services/notifications";
import NavigationLink from "@/components/actions/NavigationLink";
import { routes, messages } from "@/utils/constants";
import propTypes from "./NavbarNotificationLink.props";

/**
 * Renders the notifications page link with the count of unread notifications for the logged in user if there are any.
 * 
 * It's suppoused to be used in a navbar or similar.
 */
const NavbarNotificationLink = ({ selected }) => {
    const notReadQuery = notificationsServices.useCheckNotReadNotifications();

    const notReadCount =
        !notReadQuery.isLoading && notReadQuery.data?.data?.notReadCount;

    return (
        <NavigationLink
            icon={<Notifications fontSize="inherit" />}
            label={messages.navbar.NOTIFICATIONS_OPTION}
            href={`/${routes.notifications.NOTIFICATIONS}`}
            color="warning"
            selected={selected}
            badgeContent={notReadCount}
        />
    );
};

NavbarNotificationLink.propTypes = propTypes;

export default NavbarNotificationLink;
