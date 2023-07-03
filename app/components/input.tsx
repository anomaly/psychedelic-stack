import type {
    HTMLInputTypeAttribute
} from "react";

import { useField } from "remix-validated-form";

/**
 * FormInput Type
 */
type FormInputProps = {
    name: string;
    label: string;
    placeholder?: string;
    isRequired?: boolean;
    type?: HTMLInputTypeAttribute;
};

/**
 * 
 * @param param0 
 * @returns JSX.Element
 */
export const FormInput = ({
    name,
    label,
    placeholder,
    isRequired = false,
    type = "text"
}: FormInputProps) => {
    const { error, getInputProps } = useField(name);
    return (
        <div className="flex flex-col border border-gray-200 text-gray-700 rounded-md p-2 mb-4">
            <label
                className="text-xs text-gray-500"
                htmlFor={name}>
                {label}
            </label>
            <input
                className="border-0 my-2"
                {...getInputProps({
                    id: name,
                    type,
                    required: isRequired,
                    placeholder
                })} />
            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
};