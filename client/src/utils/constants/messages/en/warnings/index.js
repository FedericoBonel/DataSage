export default Object.freeze({
    context: {
        /** Builds a warning message to show to the user in console to warn about lack of provider for context. Useful to use in context use hooks.*/
        noProviderMessage: (contextHook) =>
            `${contextHook} was used outside its provider. Please provide its provider in the rendering tree.`,
    },
});
