import { useRef, useEffect, useMemo } from "react";
import { debounce } from "@mui/material";

/**
 * Returns a function that executes after a period of time
 * since the last call.
 * It's useful for avoiding calling the backend for unwanted intermediate values (e.g. Search bar).
 *
 * @param {Function} callback Function to be executed after a period of time since the latest call
 * @returns A function that does the same as the callback but after a delay since last call
 */
const useDebounce = (callback) => {
    const ref = useRef();

    // Update the callback reference to keep track of closures
    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    // Create the debounce callback once and memoize it
    // Since the ref.current will always be updated, the callback will have the latest
    // version of it and it wont be re created everytime, thus avoiding re renders and unexpected behavior
    const debouncedCallback = useMemo(() => {
        const func = (...props) => {
            ref.current?.(...props);
        };

        return debounce(func, 550);
    }, []);

    return debouncedCallback;
};

export default useDebounce;
