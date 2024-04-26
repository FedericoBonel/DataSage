import NotificationCountDTO from "./NotificationCountDTO.js";

/**
 * Transforms a notification not read aggregation for a logged in user as it is returned by the database into an output DTO.
 * @param {{notReadCount: number}} notReadAggregation The aggregation result as it is returned by the database.
 * @returns The not read notification count as it should be exposed to the web
 */
const toNotificationCountDTO = (notReadAggregation) => {
    const countDTO = new NotificationCountDTO();
    countDTO.notReadCount = notReadAggregation.notReadCount;
    return countDTO;
};

export { toNotificationCountDTO };
