import PropTypes from "prop-types";

export const propTypes = {
    /** The value of the input. If this is passed it will be used to validate it with the validator function and show the helper text if needed. */
    value: PropTypes.string,
    /** The text to display when the value is invalid. */
    helperText: PropTypes.string,
    /** The function to use for validating the value. Receives only one parameter: the value passed in the "value" prop. It should return a boolean value. */
    validator: PropTypes.func,
    /** The HTML type of the input. If "search" then an icon is added with a magnifing glass on it. */
    type: PropTypes.string,
    /** If true then the onChange function will be called after
     * a delay since the last key press (the last onChange event).
     * WITH THE VALUE, meaning it wont receive an event.
     *
     * Defaults to false.
     */
    isDebounced: PropTypes.bool,
    /**
     * Function to be called when the value of the field changes.
     *
     * IMPORTANT: If isDebounced is false then it will receive the event as with any other field element without any delays.
     * But if isDebounced is true then it will receive the new value without receiving the event after a delay.
     */
    onChange: PropTypes.func,
};
