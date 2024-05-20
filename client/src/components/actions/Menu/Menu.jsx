import { useState } from "react";
import {
    Box,
    Button,
    IconButton,
    Menu as MUIMenu,
    Typography,
} from "@mui/material";
import { MenuIconButtonStyles } from "./Menu.styles";
import propTypes from "./Menu.props";

/** Renders the button and pop over for displaying a menu. The pop over will hold this components children. */
const Menu = ({
    children,
    label,
    variant = "button",
    icon,
    showLabel = true,
    position,
    keepMounted = false,
}) => {
    // Will hold the element that will be used to control menu opening.
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Sets the anchor element for the pop over
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Removes the anchor element
    const handleClose = () => {
        setAnchorEl(null);
    };

    const buttonProps = {
        id: `menu-button-${label}`,
        "aria-controls": open ? `menu-${label}` : undefined,
        "aria-haspopup": open ? `menu-${label}` : undefined,
        "aria-expanded": open ? "true" : undefined,
        "aria-label": `menu-${label}`,
        onClick: handleOpen,
    };

    const button =
        variant === "iconButton" ? (
            <Box sx={MenuIconButtonStyles}>
                <IconButton size="large" {...buttonProps}>
                    {icon}
                </IconButton>
                {showLabel && (
                    <Typography variant="caption">{label}</Typography>
                )}
            </Box>
        ) : (
            <Button {...buttonProps}>{label}</Button>
        );

    return (
        <>
            {button}
            <MUIMenu
                id={`menu-${label}`}
                anchorEl={anchorEl}
                open={open}
                onClick={handleClose}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": `menu-button-${label}`,
                }}
                sx={{ maxWidth: 450 }}
                anchorOrigin={
                    position
                        ? position
                        : { vertical: "bottom", horizontal: "left" }
                }
                keepMounted={keepMounted}
            >
                {children}
            </MUIMenu>
        </>
    );
};

Menu.propTypes = propTypes;

export default Menu;
