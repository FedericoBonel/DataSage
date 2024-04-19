import { useParams, Link as RRLink } from "react-router-dom";
import { Unstable_Grid2 as Grid, Typography, Link, Box } from "@mui/material";
import error from "@/assets/error.png";
import { messages, routes } from "@/utils/constants";
import {
    GridItemStyles,
    ErrorImageContainerStyles,
    ErrorImageStyles,
    ErrorMsgStyles,
} from "./ErrorPage.styles";

/** Error page exit links to be shown by code. */
const link = {
    default: (
        <Link component={RRLink} to={`/${routes.HOME}`}>
            {messages.errors.GO_TO_HOMEPAGE}
        </Link>
    ),
};

/** Error page component */
const ErrorPage = () => {
    const { code } = useParams();

    const errorMessage =
        messages.errors.errorCode[code] || messages.errors.errorCode.default;

    const exitLink = link[code] || link.default;

    return (
        <Grid container>
            <Grid
                xs={12}
                md={6}
                sx={{ ...GridItemStyles, ...ErrorImageContainerStyles }}
            >
                <Box
                    sx={ErrorImageStyles}
                    component="img"
                    loading="lazy"
                    src={error}
                />
            </Grid>
            <Grid xs={12} md={6} sx={{ ...GridItemStyles, ...ErrorMsgStyles }}>
                <Typography component="h1" variant="h4">
                    {messages.errors.errorTitle}
                </Typography>
                <Typography>{errorMessage}</Typography>
                {exitLink}
            </Grid>
        </Grid>
    );
};

export default ErrorPage;
