/**
 * Verifies the existence of a given variable in the .env file. If it is not present, an error will be raised with a message
 * telling the user to provide it
 * @param {*} variable The value of the environment variable
 * @param {string} name The name of the environment variable
 */
const isDefined = (variable, name) => {
    if (!variable) {
        throw new Error(
            `The environment variable  "${name}" is not defined, please define it or provide it`
        );
    }
};

// Back end configuration
const BACK_END_BASE_URL = import.meta.env.VITE_BACK_END_BASE_URL;
isDefined(BACK_END_BASE_URL, "VITE_BACK_END_BASE_URL");

const VERIFICATION_LINK = import.meta.env.VITE_VERIFICATION_LINK;
isDefined(VERIFICATION_LINK, "VITE_VERIFICATION_LINK");

// PDF Worker Parser configuration
const WORKER_PDF_URL = import.meta.env.VITE_WORKER_PDF_URL;
isDefined(BACK_END_BASE_URL, "VITE_WORKER_PDF_URL");

export default Object.freeze({
    /** Variables related to Back End API configuration */
    api: {
        /** Back End API base url (i.g. "https://mybackend.com/api/v1/") */
        BASE_URL: BACK_END_BASE_URL,
        /** The verification link to send to the user when registering a new account in the application. */
        VERIFICATION_LINK: VERIFICATION_LINK,
    },
    /** Variables related to PDF Parsers configuration. */
    pdf: {
        /** The URL provider of the pdf js worker. */
        WORKER_URL: WORKER_PDF_URL,
    },
});
