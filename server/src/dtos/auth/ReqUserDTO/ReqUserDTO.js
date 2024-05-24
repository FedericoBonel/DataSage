import EntityDTO from "../../utils/EntityDTO.js"

/**
 * Class of a user as it should be exposed in a request object inside the server
 */
export default class ReqUserDTO extends EntityDTO {
    /**
     * The names of the user
     * @type {String}
     */
    names;

    /**
     * The lastnames of the user
     * @type {String}
     */
    lastnames;

    /**
     * The email of the user
     * @type {String}
     */
    email;

    /**
     * The flag that marks a user as admin
     * @type {Boolean}
     */
    isAdmin;
    
    /**
     * The flag that marks if the user verified their account
     * @type {String}
     */
    verified;

    /**
     * The timestamp of the last update in the user information
     * @type {Date}
     */
    updatedAt;
}