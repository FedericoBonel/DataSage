import { useState, useCallback } from "react";
import useDebounce from "./useDebounce";

/**
 * Wraps the React state manager (useState) and receives a side effect as a callback that will be called every time the state changes,
 * within a debounce (i.e. It will only be executed after a certain time since it was last called).
 * @param {*} initialState - Initial value of the state to be assigned.
 * @param {Function} sideEffect - Function to be called as a side effect within the debounce. Receives any prop passed to the setState returned.
 * @returns The created state and the setter to modify it.
 */
const useDebouncedSideEffect = (initialState, sideEffect) => {
    const [state, setState] = useState(initialState);
    const onSet = useDebounce(sideEffect);

    const exposedSetter = useCallback(
        (...params) => {
            setState(...params);
            onSet(...params);
        },
        [onSet]
    );

    return [state, exposedSetter];
};

export default useDebouncedSideEffect;
