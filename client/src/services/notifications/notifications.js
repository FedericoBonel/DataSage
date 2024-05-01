import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import notificationsAPI from "@/apis/notifications/notificationsAPI";
import notificationsCache from "../caches/notifications";

/** Number of minutes between polling of the notifications. */
const M_NOTIFICATION_POLL = 1;

/** It creates the query to get the number of notifications that haven't been read by the user and returns it. */
const useCheckNotReadNotifications = () => {
    const queryState = useQuery({
        queryKey: notificationsCache.count(),
        queryFn: () => notificationsAPI.getNotReadCount(),
        refetchInterval: M_NOTIFICATION_POLL * 60 * 1000,
        refetchIntervalInBackground: M_NOTIFICATION_POLL * 3 * 60 * 1000, // Triple the time for bg requests
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

/** It creates the query to get the list of notifications for the user and returns it. */
const useInfiniteNotificationData = ({
    page = 1,
    limit = 10,
    isRead = false,
}) => {
    const queryState = useInfiniteQuery({
        // Disabling rule because including page could lead to incorrect cache generation
        // eslint-disable-next-line
        queryKey: notificationsCache.list({ isRead }),
        queryFn: ({ pageParam = page }) =>
            notificationsAPI.getNotifications(
                { isRead },
                { page: pageParam, limit }
            ),
        getNextPageParam: (lastPage, allPages) =>
            lastPage?.data?.length ? allPages.length + 1 : undefined,
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

export default {
    useCheckNotReadNotifications,
    useInfiniteNotificationData,
};
