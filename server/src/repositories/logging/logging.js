import { persistantLogger } from "../../utils/loggers/index.js";
import { log } from "../../models/logs/logs.js";

/**
 * Saves a new log in the database
 * @param {{level: "error"|"warn"|"info"|"http"|"verbose"|"debug"|"silly",
 *          message: string,
 *          meta: *}} newLog The log to be saved in database
 */
const create = async (newLog) => {
    const { level, message, meta } = newLog;
    if (!level || !message || !meta) {
        throw new Error("Missing parameters");
    }

    // Validate formatting
    await log.validate(newLog);

    persistantLogger.log(level, message, meta);
};

export default { create };
