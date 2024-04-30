import { useQuery } from "@tanstack/react-query";
import notificationsAPI from "@/apis/notifications/notificationsAPI";
import notificationsCache from "../caches/notifications";

/** It creates the query to get the number of notifications that haven't been read by the user and returns it. */
const useCheckNotReadNotifications = () => {
    const queryState = useQuery({
        queryKey: notificationsCache.count(),
        queryFn: () => notificationsAPI.getNotReadCount(),
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

export default {
    useCheckNotReadNotifications,
};
