import { Children } from "react";
import { List, Typography } from "@mui/material";

import { Button } from "@/components/actions";
import { ShowLoader } from "@/components/informational";
import { messages } from "@/utils/constants";
import { propTypes } from "./PaginatedList.props";
import { endTypographyStyles } from "./PaginatedList.styles";

/** Shows a list of items as an infinite list with pagination and a button to load more. */
const PaginatedList = ({
    children,
    isFetching,
    onLoadMore,
    isLoadingMore,
    hasNextPage,
    listContainerStyles,
}) => {
    const itemsExist = Children.count(children) > 0;

    const getNextPageButton =
        itemsExist &&
        (hasNextPage ? (
            <Button
                fullWidth
                variant="text"
                isLoading={isLoadingMore}
                onClick={onLoadMore}
            >
                {messages.actions.pagination.LOAD_MORE}
            </Button>
        ) : (
            <Typography
                variant="subtitle2"
                textAlign="center"
                sx={endTypographyStyles}
            >
                {messages.info.pagination.NO_MORE}
            </Typography>
        ));

    const noEntitiesMessage = !itemsExist && (
        <Typography
            variant="subtitle2"
            textAlign="center"
            sx={endTypographyStyles}
        >
            {messages.info.pagination.NO_ITEMS}
        </Typography>
    );

    const renderedLoadMoreBtn = noEntitiesMessage || getNextPageButton;

    return (
        <List sx={listContainerStyles} disablePadding>
            <ShowLoader isLoading={isFetching}>
                {children}
                {renderedLoadMoreBtn}
            </ShowLoader>
        </List>
    );
};

PaginatedList.propTypes = propTypes;

export default PaginatedList;
