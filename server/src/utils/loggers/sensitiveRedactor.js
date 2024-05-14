import { logging } from "../constants/index.js";

const sensitiveKeysArray = Object.keys(logging.privateKeys);

/**
 * Recursively remove all properties from an object that are marked as sensitive for logging.
 * @param {*} data Data from which to remove the sensitive properties
 * @returns The redacted version of the data.
 */
const redactLogData = (data) => {
    // to avoid calling redact function on native Mongoose/MongoDB model
    // we check if !data.constructor.name.startsWith('model')
    if (
        typeof data === "object" &&
        data !== null &&
        data !== undefined &&
        !data.constructor?.name?.startsWith("model")
    ) {
        if (Array.isArray(data)) {
            return data.map((item) => redactLogData(item));
        }

        const redactedData = {};
        // Disabling es lint because we want to iterate only one time through object
        // eslint-disable-next-line
        for (const key in data) {
            if (sensitiveKeysArray.includes(key)) {
                redactedData[key] = logging.REDACTED_VALUE;
            } else if (key === "_id") {
                redactedData[key] = String(data._id);
            } else {
                // Recursively redact sensitive keys within nested objects
                redactedData[key] = redactLogData(data[key]);
            }
        }
        return redactedData;
    }
    return data;
};

export default redactLogData;
