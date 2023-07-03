import type {
    V2_MetaFunction,
    ActionArgs,
    ActionFunction,
    LoaderArgs,
    LoaderFunction,
} from "@remix-run/node";
import {
    redirect,
    json,
} from "@remix-run/node";

import {
    isRouteErrorResponse,
    useRouteError,
    useLoaderData,
    useRouteLoaderData,
    useActionData,
} from "@remix-run/react";

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
    Token,
} from "api/models";

import {
    loginForAuthToken
} from "api/auth/auth";
import {
    getSession,
    commitSession
} from "../session";

const LoginSchema = withZod(
    z.object({
        email: z.string({
            required_error: "Email is required",
        }).email(),
        password: z.string().min(8, {
            message: "Your password isn't long enough",
        }),
        redirectTo: z.string().default("/admin"),
    }));

export const action: ActionFunction = async ({ request }: ActionArgs) => {

    const session = await getSession(
        request.headers.get("Cookie")
    );

    const formData = await LoginSchema.validate(
        await request.formData()
    );

    const {
        email,
        password,
        redirectTo
    } = formData.data;

    try {
        const response: AxiosResponse<Token> = await loginForAuthToken({
            username: email,
            password: password,
        });

        // Set the token in the session
        session.set("token", response.data.access_token);
        return redirect(redirectTo, {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }
    catch (error) {
        // If we require to extract the error message from the response
        const axiosError = error as AxiosError;
        // Nullify the token if there was one
        session.set("token", null);
        // We intend to carry this over to the loader
        session.flash("error", "Invalid username or password");
        return json({
            globalError: "Invalid username or password",
        }, {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });

    }
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const message = session.get("error") || null;
    return json({ message }, {
        headers: {
            // only necessary with cookieSessionStorage
            "Set-Cookie": await commitSession(session),
        },
    });
}


export const meta: V2_MetaFunction = () => {
    return [
        {
            title: "Login"
        },
    ];
};

export default function Auth() {

    const { message } = useLoaderData<typeof loader>();
    const data = useActionData<typeof action>();

    return (
        <div>
            <h1 className="text-2xl">Login to our app</h1>
            <ValidatedForm validator={LoginSchema} method="POST">
                <input type="hidden" name="redirectTo" />
                <FormInput type="email" name="email" label="Email" />
                <FormInput type="password" name="password" label="Password" />
                <SubmitButton />
            </ValidatedForm>
        </div>
    )
}

