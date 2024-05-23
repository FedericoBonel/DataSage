import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import accountsAPI from "@/apis/accounts/accountsAPI";
import useLogout from "@/utils/hooks/useLogout";
import { utilsCache } from "../caches";
import profilesCache from "../caches/profiles";

/** It makes a back end request to get the logged in user and account information and returns the state of the query.*/
const useAccountData = () => {
    const queryState = useQuery({
        queryKey: profilesCache.profile(),
        queryFn: () => accountsAPI.getAccountInfo(),
        // Since this is used to redirect user on logout, we should avoid retrying and refetching on windows focus for erroneous state.
        // To avoid having the login page or any other public page be constantly reloaded
        retryOnMount: false,
        retry: (count, error) => (error?.response?.status !== 401 ? 3 : false),
        retryDelay: (retryAttempt, error) =>
            error?.response?.status !== 401 ? 1000 : Infinity,
        refetchOnWindowFocus: (query) => query.state.status !== "error",
        throwOnError: (error) => error?.response?.status !== 401,
    });

    return queryState;
};

/** It creates and returns the state to delete a user account completly from the back end. */
const useDeleteAccount = () => {
    const logout = useLogout();
    const queryState = useMutation({
        mutationFn: () => accountsAPI.deleteAccount(),
        /** Log out the user since it does not exist any longer */
        onSuccess: () => logout(),
        throwOnError: (error) => Boolean(error),
    });

    return queryState;
};

/** It creates and returns the state to update user account information in the back end. */
const useUpdateAccount = () => {
    const logout = useLogout();
    const queryClient = useQueryClient();
    const queryState = useMutation({
        mutationFn: ({ names, lastnames, credentials }) =>
            accountsAPI.updateAccountInformation({
                names,
                lastnames,
                credentials: credentials
                    ? {
                          password: credentials.password,
                          newEmail: credentials.newEmail
                              ? credentials.newEmail
                              : undefined,
                          newPassword: credentials.newPassword
                              ? credentials.newPassword
                              : undefined,
                      }
                    : undefined,
            }),
        onSuccess: (response, variables) => {
            /** If password was changed log out the user */
            if (variables?.credentials?.newPassword) {
                logout();
                return;
            }
            return queryClient.setQueryData(
                profilesCache.profile(),
                utilsCache.mockSuccessfulRes(response?.data)
            );
        },
        throwOnError: (error) =>
            error?.response?.status !== 400 && error?.response?.status !== 401,
    });

    return queryState;
};

export default { useAccountData, useUpdateAccount, useDeleteAccount };
