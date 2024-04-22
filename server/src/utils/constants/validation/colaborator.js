import colaboratorPermissions from "../permissions/colaborator.js"

/** Contains all colaborator validation values to be used in the application. */
export default Object.freeze({
    permissions: {
        /** Maximum number of permissions per colaborator */
        MAX_AMOUNT: Object.keys(colaboratorPermissions).length,
    },
});
