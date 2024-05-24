import config from "../../../config/index.js";
import { capitalizeEveryWord } from "../../strings/capitalization.js";

/** Creates the account recovery email content object */
export default (receiverEmail, receiverNames, recoveryLink, recoveryCode) => ({
    from: `"DataSage 🌿" ${config.mail.auth.user}`,
    to: receiverEmail,
    subject: "DataSage Account Recovery",
    html: `
    <h1>DataSage Account Recovery</h1>
    <br>Hello ${capitalizeEveryWord(receiverNames)},
    <br>We've received an account recovery request for this email. To recover access to your account, you will need to reset your login password by clicking the link below:
    <br>
    <h3>
    <a href="${recoveryLink}?recoveryCode=${recoveryCode}" target="_self">
    RESET PASSWORD
    </a>
    </h3>
    <br>If you did not request to recover your DataSage login credentials, please ignore this email. It is possible that another user entered their login information incorrectly. If you have any concerns, feel free to contact our support team.
    <br>Wishing you a Sageful path ahead,<br><br>
    User support, DataSage
    `,
});
