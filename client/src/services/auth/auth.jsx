import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAPI from "@/apis/auth/authAPI";
import cookies from "@/utils/cookies/auth";
import profilesCache from "../caches/profiles";

/** It creates and provides the state to login a user. */
const useLogin = () => {
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ email, password }) => authAPI.login({ email, password }),
        onSuccess: (response) => {
            cookies.setAccessToken(response?.data?.token);
            // Invalidate profile query
            queryClient.invalidateQueries({
                queryKey: profilesCache.profile(),
            });
        },
        throwOnError: (error) =>
            error?.response?.status !== 401 && error?.response?.status !== 400,
    });

    return queryState;
};

export default { useLogin };
