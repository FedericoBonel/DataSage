import PropTypes from "prop-types";
import { BadRequestError } from "@/dtos/errors";

export default {
    /** Error as it was received from the back end after upload failed */
    error: PropTypes.shape(BadRequestError).isRequired,
};
