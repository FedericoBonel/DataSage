import MessageOutputDTO from "./MessageOutputDTO.js";
import MessageSourceOutputDTO from "./MessageSourceOutput.js";

/**
 * Transforms a message source as it is stored in the database to how it should be exposed inside a chat message.
 * @param {*} messageSource The message source as it is stored in the database
 */
const toMessageSourceOutputDTO = (messageSource) => {
    const dto = new MessageSourceOutputDTO();
    dto._id = messageSource._id;
    dto.locationPage = messageSource.locationPage;
    dto.content = messageSource.content;
    dto.document = messageSource.document;
    return dto;
};

/**
 * Transforms a chat message as it is stored in the database to how it should be exposed.
 * @param {*} message The chat message as it is stored in the database
 * @param {boolean} canReadSources True if the user that is asking for the message can read sources
 */
const toMessageOutputDTO = (message, canReadSources = true) => {
    const dto = new MessageOutputDTO();
    dto._id = message._id;
    dto.content = message.content;
    dto.from = message.from;
    dto.to = message.to;
    dto.sources = canReadSources ? message.sources?.map(toMessageSourceOutputDTO) : undefined;
    dto.createdAt = message.createdAt.toISOString();
    return dto;
};

export { toMessageSourceOutputDTO, toMessageOutputDTO };
