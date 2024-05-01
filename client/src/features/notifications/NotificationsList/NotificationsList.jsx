import { useCallback, useState } from "react";
import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import notificationsServices from "@/services/notifications";
import PaginatedList from "@/components/list/PaginatedList";
import DeleteNotificationDialog from "../DeleteNotificationDialog";
import NotificationsListTabs from "./components/NotificationsListTabs";
import NotificationListItem from "./components/NotificationListItem";
import useDialog from "@/utils/hooks/useDialog";
import { messages } from "@/utils/constants";

/** Renders the list of notifications for the logged in user */
const NotificationsList = () => {
    const { open, selected, isOpen, close } = useDialog();
    const [isRead, setIsRead] = useState("false");

    const notificationsQuery =
        notificationsServices.useInfiniteNotificationData({
            isRead: isRead === "true",
        });

    const { mutate: setAsRead } =
        notificationsServices.useSetAsReadById();

    const onClickDeleteNotification = useCallback(
        (notificationId, notificationType) =>
            open({ notificationId, notificationType }),
        [open]
    );

    const onClickNotification = useCallback(
        (notificationId) => setAsRead({ notificationId }),
        [setAsRead]
    );

    const notifications =
        notificationsQuery.isSuccess &&
        notificationsQuery.data.pages.map((page) =>
            page.data.map((notification) => (
                <NotificationListItem
                    notification={notification}
                    key={notification._id}
                    onDelete={onClickDeleteNotification}
                    onClick={onClickNotification}
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
            <DeleteNotificationDialog
                notificationId={selected?.notificationId}
                notificationType={selected?.notificationType}
                isOpen={isOpen}
                onClose={close}
            />
        </Card>
    );
};

export default NotificationsList;
