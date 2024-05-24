import { Link } from "react-router-dom";
import {
    Avatar,
    ListItemIcon,
    MenuItem,
    ListItem,
    ListItemText,
} from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import accountServices from "@/services/accounts";
import { routes, messages } from "@/utils/constants";
import {
    accountLinkAvatarStyles,
    accountLinkTextStyles,
} from "./AccountLink.styles";

/** Component that renders a link to the account settings page and the current account excerpt of the logged in user (names, lastnames, and email). */
const AccountLink = () => {
    const accountQuery = accountServices.useAccountData();

    const linkText = accountQuery?.isLoading ? (
        <ListItemText
            primaryTypographyProps={{
                sx: accountLinkTextStyles,
            }}
            primary={messages.account.PLACEHOLDER_MESSAGE}
        />
    ) : (
        <ListItemText
            primaryTypographyProps={{
                noWrap: true,
                sx: accountLinkTextStyles,
            }}
            secondaryTypographyProps={{ noWrap: true }}
            primary={`${accountQuery.data?.data?.names} ${accountQuery.data?.data?.lastnames}`}
            secondary={accountQuery.data?.data?.email}
        />
    );

    return (
        <MenuItem
            disableGutters
            divider
            component={Link}
            to={`/${routes.accounts.ACCOUNT}/${routes.SETTINGS}`}
        >
            <ListItem component="div" secondaryAction={<ArrowForwardIos />}>
                <ListItemIcon>
                    <Avatar sx={accountLinkAvatarStyles} />
                </ListItemIcon>
                {linkText}
            </ListItem>
        </MenuItem>
    );
};

export default AccountLink;
