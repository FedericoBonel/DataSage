import ParticipantOutputDTO from "./ParticipantOutputDTO.js";
import { toChatPermissionDTO } from "../ChatPermissionDTO/index.js";

/**
 * Transforms a colaborator as it is stored in the database to how it should be exposed in a detailed manner as a participant.
 * @param {*} colaborator The colaborator as it is stored in the database
 * @returns The colaborator as a participant
 */
const colaboratorToParticipantOutputDTO = (colaborator) => {
    const dto = new ParticipantOutputDTO();
    dto._id = colaborator.chat._id;
    dto.names = colaborator.user.names;
    dto.lastnames = colaborator.user.lastnames;
    dto.email = colaborator.user.email;
    dto.hasJoined = colaborator.hasJoined;
    dto.permissions = colaborator.permissions.map((permission) => toChatPermissionDTO(permission));
    dto.createdAt = colaborator.chat.createdAt?.toISOString();
    return dto;
};

export { colaboratorToParticipantOutputDTO };