import bcrypt from "bcrypt";
import config from "../../../config/index.js";
import connectToDB from "../../db/connect.js";
import { user } from "../../../models/user/user.js";
import { logger } from "../../loggers/index.js";

/**
 * Script that migrates the passwords of users stored as strings to objects with content and updated at properties.
 * In the process it encrypts every password using the bcrypt algorithm and the current configured number of rounds for the salt.
 */

if (config.node_environment !== "development") {
    logger.warn("The node environment is not set to development, exiting early.");
    process.exit(); // Only run in development mode
}

await connectToDB(config.db.url);

// get the users passwords and ids
const passAndIds = await user.aggregate().match({}).project({ _id: 1, password: 1 });

if (passAndIds[0].password.content) {
    logger.info("Passwords are already stored as objects, no migration needed");
    process.exit();
}

// encrypt their passwords
const encryptedPassAndIds = await Promise.all(
    passAndIds.map(async (passAndId) => {
        const hashedPass = await bcrypt.hash(passAndId.password, config.bcrypt.saltRounds);

        return { ...passAndId, password: { content: hashedPass } };
    })
);

// update their passwords
const updatedPassAndIds = await user.bulkWrite(
    encryptedPassAndIds.map((passAndId) => ({
        updateOne: {
            filter: { _id: passAndId._id },
            update: { $set: { password: passAndId.password } },
        },
    }))
);

logger.info(
    `Encrypted and updated ${updatedPassAndIds.modifiedCount} passwords.
    The number of updated passwords and users ${updatedPassAndIds.modifiedCount === passAndIds.length ? "matched" : "did not match. This could mean some users may still be outdated."}`
);

process.exit();
