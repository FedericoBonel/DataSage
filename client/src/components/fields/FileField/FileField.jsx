import { useDropzone } from "react-dropzone";
import { Button } from "@/components/actions";
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
    disabled,
    sx,
}) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: acceptedTypes,
        multiple,
        maxFiles,
        maxSize,
        onDropAccepted: onChange,
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
