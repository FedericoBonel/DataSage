import { useState } from "react";
import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import PaginatedList from "@/components/list/PaginatedList";
import NotificationsListTabs from "./components/NotificationsListTabs";
import NotificationListItem from "./components/NotificationListItem";
import { messages } from "@/utils/constants";

/** Renders the list of notifications for the logged in user */
const NotificationsList = () => {
    const [isRead, setIsRead] = useState("false");

    const notificationsQuery = {
        isLoading: false,
        data: {
            pages: [
                {
                    data: [
                        {
                            _id: "66309dc2c16105f754eaedad",
                            createdAt: "2024-04-30T07:29:06.046Z",
                            updatedAt: "2024-04-30T07:29:06.046Z",
                            from: {
                                _id: "661645f35333647769e601ac",
                                names: "Test names",
                                lastnames: "Test lastnames",
                            },
                            type: "chat_invitation",
                            relatedEntity: {
                                _id: "66283fcfe7bf4925e25bea6b",
                                type: "chat",
                            },
                            isRead: false,
                        },
                    ],
                },
            ],
        },
        isSuccess: true,
        isFetchingNextPage: false,
        fetchNextPage: () => undefined,
        hasNextPage: false,
    };

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
