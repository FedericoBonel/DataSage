import login from "./login";
import signup from "./signup";
import signupEmailSent from "./signupEmailSent";
import accountVerification from "./accountVerification";

export default Object.freeze({
    /** Contains all messages related to login actions. */
    login,
    /** Contains all messages related to signup actions. */
    signup,
    /** Contains all messages related to the signup email sent confirmation pages. */
    signupEmailSent,
    /** Contains all messages related to the account verification pages. */
    accountVerification,
});
