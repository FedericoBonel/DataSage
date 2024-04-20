import { useSearchParams } from "react-router-dom";
import { Tab, Tabs, Box } from "@mui/material";
import { chatsServices } from "@/services/chats";
import { PdfViewer, ShowLoader } from "@/components/informational";
import { WorkerProvider } from "@/lib/react-pdf-viewer";
import {
    DocumentTabStyles,
    DocumentTabsStyles,
    ViewerWrapperStyles,
} from "./ChatDocumentViewer.styles";
import propTypes from "./ChatDocumentViewer.props";

/** Renders a set of tabs of documents viewers for a chat by id */
const ChatDocumentViewer = ({ chatId }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedDoc = searchParams.get("selectedDoc");
    const selectedPage = parseInt(searchParams.get("docsPage"));
    const selectedIndexPage =
        selectedPage && selectedPage > 0 ? selectedPage - 1 : 0;

    const documentsQuery = chatsServices.useChatDocsData(chatId);

    // Add the document id on URL when someone clicks a new document tab
    const onClickDoc = (e, newValue) => {
        setSearchParams((prev) => ({ ...prev, ["selectedDoc"]: newValue }));
    };

    const documentTabs =
        documentsQuery.isSuccess &&
        documentsQuery.data?.data.map((doc) => (
            <Tab
                key={doc._id}
                value={doc._id}
                label={doc.name}
                wrapped
                sx={DocumentTabStyles}
            />
        ));

    const documentViewer = documentsQuery.isSuccess && (
        <PdfViewer
            fileUrl={
                documentsQuery.data?.data?.find(
                    (doc) => selectedDoc === doc._id
                )?.url || documentsQuery.data?.data?.[0]?.url
            }
            pageToShow={selectedIndexPage}
        />
    );

    return (
        <Box sx={ViewerWrapperStyles}>
            <WorkerProvider>
                <ShowLoader isLoading={documentsQuery.isLoading}>
                    <Tabs
                        value={
                            selectedDoc || documentsQuery.data?.data?.[0]?._id
                        }
                        variant="scrollable"
                        scrollButtons="auto"
                        onChange={onClickDoc}
                        sx={DocumentTabsStyles}
                    >
                        {documentTabs}
                    </Tabs>
                    {documentViewer}
                </ShowLoader>
            </WorkerProvider>
        </Box>
    );
};

ChatDocumentViewer.propTypes = propTypes;

export default ChatDocumentViewer;
