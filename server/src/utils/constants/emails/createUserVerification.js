import { capitalizeEveryWord } from "../../strings/capitalization.js";

/** Creates the user verification email content object */
export default (receiverEmail, receiverNames, verificationLink, verificationCode) => ({
    from: `"DataSage 🌿" ${process.env.EMAIL_USER}`,
    to: receiverEmail,
    subject: "DataSage Account Verification",
    html: `
    <h1>Welcome to DataSage!</h1>
    <br>Hello ${capitalizeEveryWord(receiverNames)},
    <br>\uD83E\uDD73 Thank you for signing up to DataSage \uD83E\uDD73
    <br>Please click the link below to complete your registration and begin creating your own LLM powered Sage:
    <br>
    <h3>
    <a href="${verificationLink}?verificationCode=${verificationCode}" target="_self">
    VERIFY
    </a>
    </h3>
    <br>Wishing you a Sageful path ahead,<br><br>
    User support, DataSage
    `,
});
