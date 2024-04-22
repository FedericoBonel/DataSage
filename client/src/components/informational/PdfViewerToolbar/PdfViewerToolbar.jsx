import { Box, IconButton } from "@mui/material";
import {
    Fullscreen,
    ZoomIn as ZoomInIcon,
    ZoomOut as ZoomOutIcon,
    KeyboardArrowUp,
    KeyboardArrowDown,
} from "@mui/icons-material";
import {
    PageNavigationStyles,
    ToolbarStyles,
    ZoomControlStyles,
} from "./PdfViewerToolbar.styles";
import propTypes from "./PdfViewerToolbar.props";

/** Receives the toolbar component (from React PDF Viewer) to be rendered and renders it with personalization */
const PdfViewerToolbar = (Toolbar) => (
    <Toolbar>
        {({
            CurrentPageInput,
            CurrentScale,
            GoToNextPage,
            GoToPreviousPage,
            NumberOfPages,
            ZoomIn,
            ZoomOut,
            EnterFullScreen,
        }) => (
            <Box sx={ToolbarStyles}>
                <Box sx={PageNavigationStyles}>
                    <GoToPreviousPage>
                        {({ onClick }) => (
                            <IconButton onClick={onClick}>
                                <KeyboardArrowUp />
                            </IconButton>
                        )}
                    </GoToPreviousPage>
                    <CurrentPageInput />
                    <NumberOfPages />
                    <GoToNextPage>
                        {({ onClick }) => (
                            <IconButton onClick={onClick}>
                                <KeyboardArrowDown />
                            </IconButton>
                        )}
                    </GoToNextPage>
                </Box>
                <Box sx={ZoomControlStyles}>
                    <ZoomOut>
                        {({ onClick }) => (
                            <IconButton onClick={onClick}>
                                <ZoomOutIcon />
                            </IconButton>
                        )}
                    </ZoomOut>
                    <CurrentScale></CurrentScale>
                    <ZoomIn>
                        {({ onClick }) => (
                            <IconButton onClick={onClick}>
                                <ZoomInIcon />
                            </IconButton>
                        )}
                    </ZoomIn>
                    <EnterFullScreen>
                        {({ onClick }) => (
                            <IconButton onClick={onClick}>
                                <Fullscreen />
                            </IconButton>
                        )}
                    </EnterFullScreen>
                </Box>
            </Box>
        )}
    </Toolbar>
);

PdfViewerToolbar.propTypes = propTypes;

export default PdfViewerToolbar;
