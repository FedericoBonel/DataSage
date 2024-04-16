/** Creates the spinner styles. They either include padding or dont. */
export const createContainerStyles = (disablePadding) => ({
    paddingY: disablePadding ? 0 : 2,
    textAlign: "center",
});