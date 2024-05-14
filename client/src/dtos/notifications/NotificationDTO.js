import propTypes from "prop-types";
import { api } from "@/utils/constants";

/** Proptypes of notification as it is showed in a list */
export default {
    /** Id of the notification */
    _id: propTypes.string,
    /** Date of notification creation */
    createdAt: propTypes.string,
    /** Date of notification last update */
    updatedAt: propTypes.string,
    /** The sender of the notification */
    from: propTypes.shape({
        /** Id of the sender */
        _id: propTypes.string,
        /** Names of the sender */
        names: propTypes.string,
        /** Lastnames of the sender */
        lastnames: propTypes.string,
    }),
    /** The type of notification. This should be in sync with backend. */
    type: propTypes.oneOf(Object.values(api.validation.notifications.types)),
    /** The related entity and its type */
    relatedEntity: propTypes.shape({
        /** Id of the entity, this can be used to redirect the user */
        _id: propTypes.string,
        /** Type of the related entity. This should be in sync with back end */
        type: propTypes.oneOf(
            Object.values(api.validation.notifications.relatedTypes)
        ),
    }),
    /** True if the notification is read, false otherwise */
    isRead: propTypes.bool,
};
