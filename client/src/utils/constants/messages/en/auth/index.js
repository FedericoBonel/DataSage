import login from "./login";
import signup from "./signup";
import signupEmailSent from "./signupEmailSent";
import accountVerification from "./accountVerification";
import accountRecovery from "./accountRecovery";
import accountRecoveryEmailSent from "./accountRecoveryEmailSent";
import resetPassword from "./resetPassword";

export default Object.freeze({
    /** Contains all messages related to login actions. */
    login,
    /** Contains all messages related to signup actions. */
    signup,
    /** Contains all messages related to the signup email sent confirmation pages. */
    signupEmailSent,
    /** Contains all messages related to the account verification pages. */
    accountVerification,
    /** Contains all messages related to the account recovery pages. */
    accountRecovery,
    /** Contains all messages related to the recovery email sent confirmation pages. */
    accountRecoveryEmailSent,
    /** Contains all messages related to the reset password pages. */
    resetPassword,
});
