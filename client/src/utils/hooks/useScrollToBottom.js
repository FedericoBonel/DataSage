import React from "react";

/**
 * Provides a reference element to assign a react node and a scroll to bottom function
 * to make that element viewport go to the bottom of the scrollable content.
 */
const useScrollToBottom = () => {
    const ref = React.useRef(null);

    const scrollRefToBottom = React.useCallback(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, []);

    return { ref, scrollRefToBottom };
};

export default useScrollToBottom;
