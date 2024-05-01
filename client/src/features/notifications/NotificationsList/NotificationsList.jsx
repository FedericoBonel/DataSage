import { useState } from "react";
import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import notificationsServices from "@/services/notifications";
import PaginatedList from "@/components/list/PaginatedList";
import NotificationsListTabs from "./components/NotificationsListTabs";
import NotificationListItem from "./components/NotificationListItem";
import { messages } from "@/utils/constants";

/** Renders the list of notifications for the logged in user */
const NotificationsList = () => {
    const [isRead, setIsRead] = useState("false");

    const notificationsQuery =
        notificationsServices.useInfiniteNotificationData({
            isRead: isRead ===  "true",
        });

    const notifications =
        notificationsQuery.isSuccess &&
        notificationsQuery.data.pages.map((page) =>
            page.data.map((notification) => (
                <NotificationListItem
                    notification={notification}
                    key={notification._id}
                    onDelete={() => undefined}
                />
            ))
        );

    return (
        <Card>
            <CardHeader title={messages.notifications.list.TITLE} />
            <Divider />
            <NotificationsListTabs
                value={isRead}
                onClickTab={(e, newValue) => setIsRead(newValue)}
            />
            <CardContent>
                <PaginatedList
                    isFetching={notificationsQuery.isLoading}
                    onLoadMore={notificationsQuery.fetchNextPage}
                    isLoadingMore={notificationsQuery.isFetchingNextPage}
                    hasNextPage={notificationsQuery.hasNextPage}
                >
                    {notifications}
                </PaginatedList>
            </CardContent>
        </Card>
    );
};

export default NotificationsList;
