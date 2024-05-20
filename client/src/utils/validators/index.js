import authsValidator from "./auth";
import chatValidators from "./chats";
import participantValidator from "./participants";

/** Contains all auth validation functions */
export const authValidator = authsValidator;
/** Contains all chat validation functions */
export const chatsValidator = chatValidators;
/** Contains all participant validation functions */
export const participantsValidator = participantValidator;
