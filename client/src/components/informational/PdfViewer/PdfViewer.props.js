import PropTypes from "prop-types";

export default {
    /** Url of the file to be shown in the viewer */
    fileUrl: PropTypes.string,
    /** Zero-based index of the page to be shown (navigate to) in the document being viewed. Allows to jump to different pages. */
    pageToShow: PropTypes.number,
}