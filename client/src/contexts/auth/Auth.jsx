import { useQueryClient } from "@tanstack/react-query";
import {
    useState,
    createContext,
    useContext,
    useMemo,
    useCallback,
} from "react";
import proptypes from "prop-types";

import { messages } from "@/utils/constants";

// Contexts
const userTokenContext = createContext();
const userTokenUpdateContext = createContext();

/**
 * Returns the logged in user access token.
 * @returns The logged in user access token.
 */
export const useToken = () => {
    const userToken = useContext(userTokenContext);
    return userToken;
};

/**
 * Returns functions to update the logged in user token
 * @returns {{invalidateToken:Function, validateToken:Function}} Functions to update the logged in user token
 */
export const useTokenUpdate = () => {
    const tokenUpdateFunctions = useContext(userTokenUpdateContext);

    if (!tokenUpdateFunctions) {
        console.error(
            messages.warnings.context.noProviderMessage("useTokenUpdate")
        );
    }

    return tokenUpdateFunctions;
};

/**
 * Provider of the user token context. Should be placed at the root level of the application.
 * It provides a way for components lower down in the component tree to access the user token.
 */
export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const [token, setToken] = useState("randomToken");

    const validateToken = useCallback((token) => {
        setToken(token);
    }, []);

    const invalidateToken = useCallback(() => {
        setToken();
        queryClient.clear();
    }, [queryClient]);

    const userUpdateContextObject = useMemo(
        () => ({ invalidateToken, validateToken }),
        [invalidateToken, validateToken]
    );

    return (
        <userTokenContext.Provider value={token}>
            <userTokenUpdateContext.Provider value={userUpdateContextObject}>
                {children}
            </userTokenUpdateContext.Provider>
        </userTokenContext.Provider>
    );
};

AuthProvider.propTypes = {
    children:  proptypes.node.isRequired,
}