import * as React from 'react';
import { createStore } from '@react-pdf-viewer/core';

/** 
 * Plugin for the react pdf viewer to jump to pages based on page index.
 * It returns a jump to page function that you can use to jump to a specific page programatically.
 */
const JumpToPagePlugin = () => {
    const store = React.useMemo(() => createStore(), []);

    return {
        install: (pluginFunctions) => {
            store.update('jumpToPage', pluginFunctions.jumpToPage);
        },
        jumpToPage: (pageIndex) => {
            const fn = store.get('jumpToPage');
            if (fn) {
                fn(pageIndex);
            }
        },
    };
};

export default JumpToPagePlugin;