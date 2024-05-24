import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import authCookies from "@/utils/cookies/auth";

/** Returns the logout function used to log out a user and invalidate all of its session and data */
const useLogout = () => {
    const queryClient = useQueryClient();

    const logout = useCallback(() => {
        authCookies.removeAccessToken();
        queryClient.cancelQueries();
        queryClient.removeQueries();
    }, [queryClient]);

    return logout;
};

export default useLogout;
