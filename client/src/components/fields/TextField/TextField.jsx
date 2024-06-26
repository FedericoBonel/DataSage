import { useState } from "react";
import { InputAdornment, TextField as TextFieldMUI } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useDebouncedSideEffect from "@/utils/hooks/useDebouncedSideEffect";
import { propTypes } from "./TextField.props";

/**
 * Input component that displays an error when the passed in validator returns false
 * and has been touched at least once by the user.
 *
 * Note: While it's not mandatory to make the component controlled, in order to make the validation work,
 * it's important that it is and the "value" and "validator" props are passed.
 * @param {Object} props The props to be passed to the {@link https://mui.com/material-ui/api/text-field/ TextField} component from MUI.
 */
const TextField = ({
    helperText = "",
    validator = () => true,
    value,
    label,
    hiddenLabel,
    type,
    isDebounced = false,
    onChange,
    showHelperText,
    endElement,
    ...props
}) => {
    // Handle blur event for detecting when field was touched
    const onBlur = () => setTouched(true);
    const [touched, setTouched] = useState(false);

    // Handle debouncing if needed
    const [debouncedState, setDebouncedState] = useDebouncedSideEffect(
        isDebounced ? value : undefined,
        isDebounced ? onChange : undefined
    );

    // End icon adornment
    const element = endElement ?? (type === "search" && <SearchIcon />);
    const endAdornment = element && (
        <InputAdornment position="end">{element}</InputAdornment>
    );

    const isValid = validator(value);
    return (
        <TextFieldMUI
            value={isDebounced ? debouncedState : value}
            error={touched && !isValid}
            onBlur={onBlur}
            helperText={
                (touched && !isValid) || showHelperText ? helperText : ""
            }
            hiddenLabel={hiddenLabel}
            aria-label={hiddenLabel ? label : undefined}
            label={label && !hiddenLabel ? label : undefined}
            id={label}
            type={type}
            InputProps={{
                endAdornment,
            }}
            onChange={
                isDebounced
                    ? (e) => setDebouncedState(e.target.value)
                    : onChange
            }
            {...props}
        />
    );
};

TextField.propTypes = propTypes;

export default TextField;
