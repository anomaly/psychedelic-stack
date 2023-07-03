import { useIsSubmitting } from "remix-validated-form";

export const SubmitButton = () => {

    const isSubmitting = useIsSubmitting();

    return (
        <button
            className="px-4 py-2 border-blue-500 bg-blue-50 rounded-md hover:bg-blue-400"
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
        </button>
    );

};