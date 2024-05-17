import nodemailer from "nodemailer";
import config from "../../config/index.js";
import loggingRepository from "../logging/logging.js";
import { validation, messages, email } from "../../utils/constants/index.js";

const emailSender = nodemailer.createTransport({
    port: config.mail.port,
    host: config.mail.host,
    auth: {
        user: config.mail.auth.user,
        pass: config.mail.auth.pass,
    },
    secure: config.mail.port === 465,
});

/**
 * Generates and sends a verification email with the verification code to the provided user
 */
const saveVerificationEmail = async (verificationLink, user, verificationCode) => {
    if (!verificationCode || !user || !verificationLink) throw new Error("Missing params");

    const emailContent = email.createUserVerification(user.email, user.names, verificationLink, verificationCode);

    emailSender.sendMail(emailContent, (err, info) => {
        if (err) {
            // If an error happened register a log with it for future debugging
            loggingRepository.create({
                level: validation.logs.levels.ERROR,
                message: messages.errors.REQUEST_FAILURE,
                meta: {
                    error: err,
                    req: {
                        user,
                    },
                    appInfo: {
                        appVersion: config.server.version,
                        environment: config.node_environment,
                        processId: config.process.id,
                    },
                },
            });
        }
    });
};

export default { saveVerificationEmail };
