import type {
    V2_MetaFunction,
    DataFunctionArgs,
    ActionFunction,
    LoaderArgs,
    LoaderFunction,
} from "@remix-run/node";

import {
    useActionData
} from "@remix-run/react";

import {
    json,
    redirect
} from "@remix-run/node";

import { z } from 'zod';
import {
    ValidatedForm,
    validationError
} from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";

import { FormInput } from "../components/input";
import { SubmitButton } from "../components/submit-button";

import type {
    AxiosResponse,
    AxiosError
} from "axios";

import type {
    SignupResponse,
} from "api/models";

import {
    signupUser
} from "api/auth/auth";


export const meta: V2_MetaFunction = () => {
    return [
        {
            title: "Initiate Reset"
        },
    ];
};

/**
 * ZOD schema for this route's form data
 */

const SignUpSchema = withZod(
    z.object({
        email: z.string().email({
            message: "Please enter a valid email"
        }),
        password: z.string().min(8, {
            message: "Your password isn't long enough",
        }),
        confirmPassword: z.string().min(8, {
            message: "Your password doesn't match",
        }),
        firstName: z.string().min(2, {
            message: "Please enter your first name"
        }),
        lastName: z.string().min(2, {
            message: "Please enter your last name"
        }),
    }).superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match"
            });
        }
    }));

/**
 * 
 * @param request
 */
export const action: ActionFunction = async ({ request }: DataFunctionArgs) => {

    const data = await SignUpSchema.validate(
        await request.formData()
    );

    if (data.error) {
        return validationError(data.error);
    }

    const {
        firstName,
        lastName,
        email,
        password,
    } = data.data;

    try {
        const response: AxiosResponse<SignupResponse> = await signupUser({
            firstName,
            lastName,
            email,
            password,
        });

        console.log(response);

    }
    catch (error) {
        // If we require to extract the error message from the response
        const axiosError = error as AxiosError;
        return json({ error });
    }

    return json({});
}

/**
 * 
 * @param param0 
 * @returns 
 */
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
    return json({});
}

/**
 * 
 * @returns JSX.Element
 */
export default function SignUp() {

    const data = useActionData();

    return (
        <div className="mx-auto max-w-lg border-x border-gray-200">
            <h1 className="pl-4 border-l-4 border-blue-300 text-2xl mb-8">Signup for a user account</h1>
            {data && data.error && <p className="text-red-500">{data.error.message}</p>}
            <ValidatedForm
                className="px-4"
                validator={SignUpSchema}
                method="POST">
                <FormInput
                    name="email"
                    label="Email"
                    placeholder="steve@mac.com"
                    type="email" />
                <FormInput
                    name="password"
                    label="Password"
                    type="password" />
                <FormInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password" />
                <FormInput
                    name="firstName"
                    label="First Name" />
                <FormInput
                    name="lastName"
                    label="Last Name" />
                <SubmitButton />
            </ValidatedForm>
        </div>
    )
}

