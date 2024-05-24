import { extname } from "path";
import multer from "multer";
import { messages } from "../../../utils/constants/index.js";
import { BadRequestError } from "../../../utils/errors/index.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     AddDocumentSchema:
 *       type: object
 *       required:
 *         - documents
 *       properties:
 *         documents:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 */

const memoryStorage = multer.memoryStorage();

/**
 * Verifies that any files were uploaded at all
 * @param {string} fieldName Field name where fields should be uploaded
 * @returns The middleware to verify if files were uploaded or not.
 */
const filesExists = (fieldName) => async (req, res, next) => {
    // Check if any files were uploaded at all
    if (!req.files?.length) {
        throw new BadRequestError(messages.errors.validation.chat.documents.INVALID_AMOUNT, { errorField: fieldName });
    }

    next();
};

/**
 * Verifies that all files being uploaded at once have unique names one with the other.
 */
const fileUniqueNames = (fieldName) => async (req, res, next) => {
    const fileNames = {};
    req.files.forEach((file) => {
        if (fileNames[file.originalname]) {
            throw new BadRequestError(messages.errors.validation.chat.documents.REPEATED_NAMES, {
                errorField: fieldName,
            });
        }
        fileNames[file.originalname] = true;
    });

    next();
};

/**
 * Encodes the filenames. This is a way of dealing with an issue that multer has, by default it uses latin1 as the
 * name encoder. So we need to change it to UTF-8
 */
const encodeFileName = async (req, res, next) => {
    const files = req.files;
    files.forEach((file) => {
        /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["file"] }] */
        file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
    });
    next();
};

/**
 * Filters out files that should not be accepted
 * @param {Object} validExtensions An object containing the allowed file extensions as keys and their corresponding values as true.
 */
const checkFilesExtensions = (validExtensions) => (req, file, cb) => {
    const mimetypeExtension = file.mimetype.slice(-3);
    const fileExtension = extname(file.originalname);

    if (!validExtensions[fileExtension.toLowerCase()] || !validExtensions[`.${mimetypeExtension.toLowerCase()}`]) {
        cb(new BadRequestError(messages.errors.validation.document.extension.INVALID));
    }

    cb(null, true);
};

/**
 * Creates a new document parser and upload body validator.
 * Validates file size, maximum number of files uploaded at once, extensions and formats, that at least one file exists, and uniqueness of names.
 * @param {string} fieldName The name of the form field to parse for documents
 * @param {Object} options The middleware configuration object
 * @param {Object} options.limits Sets limit validation for uploaded files
 * @param {Object} options.limits.validExtensions An object containing the allowed file extensions as keys and their corresponding values as true
 * @param {Number} options.limits.fileSize Limit Maximum size allowed for an individual file in bytes
 * @param {Number} options.limits.filesPerField Maximum number of files allowed per single field
 * @param {Number} options.limits.fields Max number of non-file fields
 * @returns The middleware that parses and validates an uploaded file as form data.
 */
const documentUploadValidator = (
    fieldName,
    options = { limits: { fileSize: Infinity, filesPerField: Infinity, fields: Infinity, validExtensions: {} } }
) => {
    const multerInstance = multer({
        storage: memoryStorage,
        limits: {
            fileSize: options.limits.fileSize,
            fields: options.limits.fields,
        },
        fileFilter: checkFilesExtensions(options.limits.validExtensions),
    });

    return [
        multerInstance.array(fieldName, options.limits.filesPerField),
        filesExists(fieldName),
        encodeFileName,
        fileUniqueNames(fieldName),
    ];
};

export default documentUploadValidator;
