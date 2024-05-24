import accountValidators from "./accounts";
import authsValidator from "./auth";
import chatValidators from "./chats";
import participantValidator from "./participants";

/** Contains all account validation functions */
export const accountsValidator = accountValidators;
/** Contains all auth validation functions */
export const authValidator = authsValidator;
/** Contains all chat validation functions */
export const chatsValidator = chatValidators;
/** Contains all participant validation functions */
export const participantsValidator = participantValidator;
