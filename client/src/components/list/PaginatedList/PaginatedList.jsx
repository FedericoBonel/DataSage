import { Children, forwardRef } from "react";
import { List, Typography } from "@mui/material";
import Button from "@/components/actions/Button";
import ShowLoader from "@/components/informational/ShowLoader";
import { messages } from "@/utils/constants";
import { propTypes } from "./PaginatedList.props";
import { endTypographyStyles } from "./PaginatedList.styles";

/** Shows a list of items as an infinite list with pagination and a button to load more. */
const PaginatedList = forwardRef(
    (
        {
            children,
            isFetching,
            onLoadMore,
            isLoadingMore,
            hasNextPage,
            disableEndlistMessages,
            listContainerStyles,
        },
        ref
    ) => {
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
                !disableEndlistMessages && (
                    <Typography
                        variant="subtitle2"
                        textAlign="center"
                        sx={endTypographyStyles}
                    >
                        {messages.info.pagination.NO_MORE}
                    </Typography>
                )
            ));

        const noEntitiesMessage = !itemsExist && !disableEndlistMessages && (
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
            <List ref={ref} sx={listContainerStyles} disablePadding>
                <ShowLoader isLoading={isFetching}>
                    {children}
                    {renderedLoadMoreBtn}
                </ShowLoader>
            </List>
        );
    }
);

PaginatedList.displayName = "PaginatedList";

PaginatedList.propTypes = propTypes;

export default PaginatedList;
