import { useDropzone } from "react-dropzone";
import Button from "@/components/actions/Button";
import { InputWrapperStyles } from "./FileField.styles";
import propTypes from "./FileField.props";

/** Component that renders a file input field. */
const FileField = ({
    children,
    acceptedTypes,
    multiple = true,
    maxFiles,
    maxSize,
    onChange,
    onSelectedInvalid,
    disabled,
    sx,
}) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: acceptedTypes,
        multiple,
        maxFiles,
        maxSize,
        onDropAccepted: onChange,
        onDropRejected: onSelectedInvalid,
        disabled,
    });

    return (
        <Button
            {...getRootProps({
                variant: "text",
                fullWidth: true,
                disabled,
                sx: { ...InputWrapperStyles, ...sx },
            })}
        >
            <input {...getInputProps()} />
            {children}
        </Button>
    );
};

FileField.propTypes = propTypes;

export default FileField;
