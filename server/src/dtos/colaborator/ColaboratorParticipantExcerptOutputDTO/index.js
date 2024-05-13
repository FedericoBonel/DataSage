import ParticipantExcerptOutputDTO from "./ParticipantExcerptOutputDTO.js";

/**
 * Transforms a colaborator as it is stored in the database to how it should be exposed in a summarized manner as a participant.
 * @param {*} colaborator The colaborator as it is stored in the database
 * @returns The colaborator as a participant
 */
const colaboratorToParticipantExcerptOutputDTO = (colaborator) => {
    const dto = new ParticipantExcerptOutputDTO();
    dto._id = colaborator.user._id;
    dto.names = colaborator.user.names;
    dto.lastnames = colaborator.user.lastnames;
    dto.email = colaborator.user.email;
    dto.hasJoined = colaborator.hasJoined;
    dto.createdAt = colaborator.createdAt?.toISOString();
    return dto;
};

export { colaboratorToParticipantExcerptOutputDTO };