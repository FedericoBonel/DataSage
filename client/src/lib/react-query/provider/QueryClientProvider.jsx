import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
    QueryClient,
    QueryClientProvider as TanQueryClientProvider,
} from "@tanstack/react-query";
import PropTypes from "prop-types";

const queryClient = new QueryClient();

/**
 * Enables and provides the react query client that handles server state mirroing in the client.
 *
 * Should be provided at the root level.
 */
const QueryClientProvider = ({ children }) => {
    return (
        <TanQueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools buttonPosition="top-left" />
        </TanQueryClientProvider>
    );
};

QueryClientProvider.propTypes = { children: PropTypes.node };

export default QueryClientProvider;
