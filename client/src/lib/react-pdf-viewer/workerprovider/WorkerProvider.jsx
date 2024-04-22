import { Worker } from "@react-pdf-viewer/core";
import propTypes from "prop-types";
import config from "@/config";

/** Provides the worker needed in react-pdf-viewer to parse and show pdfs */
const WorkerProvider = ({ children }) => {
    return <Worker workerUrl={config.pdf.WORKER_URL}>{children}</Worker>;
};

WorkerProvider.propTypes = {
    /** Elements to which provide the worker */
    children: propTypes.node,
};

export default WorkerProvider;
