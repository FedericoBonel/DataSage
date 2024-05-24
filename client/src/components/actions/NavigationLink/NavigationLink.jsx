import { Link } from "react-router-dom";
import { ListItem, IconButton, Typography, Badge } from "@mui/material";
import { NavigationLinkStyles } from "./NavigationLink.styles";
import proptypes from "./NavigationLink.props";

/**
 * Renders an icon button and a label with centralized styles for navigation.
 * Can behave as a link, a button or a menu and display badges with content.
 *
 * Useful for navbars.
 */
const NavigationLink = ({
    selected,
    icon,
    label,
    href,
    color,
    badgeContent,
    onClick,
}) => {
    const linkColor = color ?? "primary";

    return (
        <ListItem sx={NavigationLinkStyles}>
            <IconButton
                aria-label={label}
                size="large"
                to={href}
                component={href ? Link : undefined}
                onClick={href ? undefined : onClick}
                color={selected ? linkColor : "inherit"}
            >
                <Badge
                    color={linkColor}
                    invisible={!badgeContent}
                    badgeContent={badgeContent}
                >
                    {icon}
                </Badge>
            </IconButton>
            <Typography variant="caption">{label}</Typography>
        </ListItem>
    );
};

NavigationLink.propTypes = proptypes;

export default NavigationLink;
