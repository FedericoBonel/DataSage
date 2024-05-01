import {
    useInfiniteQuery,
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
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

/** Creates the state for deleting notifications by id and returns it. */
const useDeleteNotificationById = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ notificationId }) =>
            notificationsAPI.deleteNotificationById(notificationId),
        onSuccess: (response, { notificationId }) => {
            // Remove the notification from cache
            queryClient.setQueriesData(
                { queryKey: notificationsCache.lists() },
                (oldData) => {
                    if (
                        !oldData.pages &&
                        oldData.data.notReadCount &&
                        !response.data.isRead
                    ) {
                        // If its the count query check if the notification wasn't read and reduce it
                        return {
                            ...oldData,
                            data: {
                                ...oldData.data,
                                notReadCount: oldData.data.notReadCount - 1,
                            },
                        };
                    } else if (oldData.pages) {
                        // If its the list of notifications, filter out the deleted notification
                        return {
                            ...oldData,
                            pages: oldData.pages.map((page) => ({
                                ...page,
                                data: page.data.filter(
                                    (item) => item._id !== notificationId
                                ),
                            })),
                        };
                    }
                    // If non of the above return the old data
                    return oldData;
                }
            );
            // Invalidate the notification lists
            queryClient.invalidateQueries({
                queryKey: notificationsCache.lists(),
            });
        },
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

export default {
    useCheckNotReadNotifications,
    useInfiniteNotificationData,
    useDeleteNotificationById,
};
