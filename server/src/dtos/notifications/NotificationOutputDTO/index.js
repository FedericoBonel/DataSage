import NotificationOutputDTO from "./NotificationOutputDTO.js";
import NotificationRelatedEntityOutputDTO from "./NotificationRelatedEntityOutputDTO.js";
import NotificationUserOutputDTO from "./NotificationUserOutputDTO.js";

/**
 * Transforms a related entity as it is stored in the database to how it should be exposed inside a notification.
 * @param {{type: string}} relatedEntity The related entity as it is stored in the database
 * @param {string} relatedEntityId The related entity id to which the notification refers to
 * @returns The formatted related entity as it should be exposed in a notification
 */
const toNotificationRelatedEntityOutputDTO = (relatedEntity, relatedEntityId) => {
    const dto = new NotificationRelatedEntityOutputDTO();
    dto._id = relatedEntityId;
    dto.type = relatedEntity.name;
    return dto;
};

/**
 * Transforms a user as it is stored in the database to how it should be exposed inside a notification.
 * @param {{_id: string, names: string, lastnames: string}} user The user as it is stored in the database
 * @returns The formatted user as it should be exposed in a notification
 */
const toNotificationUserOutputDTO = (user) => {
    const dto = new NotificationUserOutputDTO();
    dto._id = user._id;
    dto.names = user.names;
    dto.lastnames = user.lastnames;
    return dto;
};

/**
 * Transforms a notification as it is stored in the database to how it should be exposed.
 * @param {*} notification The notification as it is stored in the database
 */
const toNotificationOutputDTO = (notification) => {
    const dto = new NotificationOutputDTO();
    dto._id = notification._id;
    dto.from = toNotificationUserOutputDTO(notification.from);
    dto.relatedEntity = toNotificationRelatedEntityOutputDTO(
        notification.relatedEntityType,
        notification.relatedEntityId
    );
    dto.type = notification.type.name;
    dto.isRead = notification.isRead;
    dto.createdAt = notification.createdAt;
    dto.updatedAt = notification.updatedAt;
    return dto;
};

export { toNotificationRelatedEntityOutputDTO, toNotificationUserOutputDTO, toNotificationOutputDTO };
