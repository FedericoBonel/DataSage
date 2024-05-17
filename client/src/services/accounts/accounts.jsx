import { useQuery } from "@tanstack/react-query";
import accountsAPI from "@/apis/accounts/accountsAPI";
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

export default { useAccountData };
