import { useParams, Link as RRLink } from "react-router-dom";
import { Container, Typography, Link } from "@mui/material";

import { messages, routes } from "@/utils/constants";

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
        <Container>
            <Typography variant="h4">{messages.errors.errorTitle}</Typography>
            <Typography>{errorMessage}</Typography>
            {exitLink}
        </Container>
    );
};

export default ErrorPage;
