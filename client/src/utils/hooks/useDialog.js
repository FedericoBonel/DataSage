import { useCallback, useState } from "react";

/**
 * Returns a state for opening and closing dialogs that need 
 * a reference to an entity selected by id.
 */
const useDialog = () => {
    // store which item has been selected
    const [selected, setSelected] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback((entityId) => {
        setSelected(entityId);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setSelected(null);
        setIsOpen(false);
    }, []);

    return {
        /** True if the dialog is open */
        isOpen,
        /**
         * Opens the dialog (Sets isOpen to true and assigns the entity as selected).
         * @param {string} entityId The ID of the entity being selected
         */
        open,
        /**
         * Closes the dialog (sets isOpen to false and assigns the entity as null/undefined)
         */
        close,
        /**
         * The currently selected entity's ID. Null if no entity is selected.
         */
        selected,
    };
};

export default useDialog;
