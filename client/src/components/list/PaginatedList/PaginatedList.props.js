import PropTypes from "prop-types";

export const propTypes = {
    /** True if the list is performing the initial loading of the first page. */
    isFetching: PropTypes.bool,
    /** Function executed when the load more button is pressed. */
    onLoadMore: PropTypes.func.isRequired,
    /** True if a new page is being loaded, false otherwise. */
    isLoadingMore: PropTypes.bool,
    /** True if the list has another page that can be loaded, false otherwise. */
    hasNextPage: PropTypes.bool,
    /** Object containing styles to be applied to the list container. Following MUI's notation of {@link https://mui.com/system/getting-started/the-sx-prop/ sx} */
    listContainerStyles: PropTypes.object,
};
