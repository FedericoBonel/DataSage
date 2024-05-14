import PropTypes from "prop-types"

export default {
    /** Id of the chat this menu references to */
    chatId: PropTypes.string.isRequired,
    /** True if the participants management menu should be shown, false otherwise */
    showParticipantsManagement: PropTypes.bool,
}