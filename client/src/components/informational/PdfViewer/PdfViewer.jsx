import { memo, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin as useDefaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import PdfViewerToolbar from "../PdfViewerToolbar";
import useJumpToPagePlugin from "./plugins/JumpToPagePlugin";
import { ViewerWrapperStyles } from "./PdfViewer.styles";
import propTypes from "./PdfViewer.props";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./PdfViewer.css";

/** Component that renders a PDF Viewer from a url */
const PdfViewer = ({ fileUrl, pageToShow }) => {
    const defaultLayoutPluginInstance = useDefaultLayoutPlugin({
        renderToolbar: PdfViewerToolbar,
        sidebarTabs: () => [],
    });

    const jumpToPagePluginInstance = useJumpToPagePlugin();
    useEffect(() => {
        // Whenever a new page is provided, jump to it
        jumpToPagePluginInstance.jumpToPage(pageToShow);
    }, [pageToShow, jumpToPagePluginInstance]);

    const theme = useTheme();

    const isDarkTheme = theme.palette.mode === "dark";
    return (
        <Box sx={ViewerWrapperStyles}>
            <Viewer
                fileUrl={fileUrl}
                defaultScale={SpecialZoomLevel.PageWidth}
                theme={isDarkTheme ? "dark" : "light"}
                plugins={[
                    defaultLayoutPluginInstance,
                    jumpToPagePluginInstance,
                ]}
                initialPage={pageToShow || 0}
            />
        </Box>
    );
};

PdfViewer.propTypes = propTypes;

const memoizedViewer = memo(PdfViewer);

export default memoizedViewer;
