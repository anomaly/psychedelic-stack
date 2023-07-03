import type {
    V2_MetaFunction,
    ActionArgs,
    ActionFunction,
    LoaderArgs,
    LoaderFunction,
} from "@remix-run/node";

import {
    Form
} from "@remix-run/react";

import {
    json,
    redirect
} from "@remix-run/node";

import { z } from 'zod';

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

const InitiateResetSchema = z.object({
    email: z.string().email()
});

/**
 * 
 * @param request
 */
export const action: ActionFunction = async ({ request }: ActionArgs) => {
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
export default function InitiateReset() {
    return (
        <div>
            <h1 className="text-2xl">Initiate Reset Password</h1>
            <Form method="POST">
                <input type="email" name="email" />
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}

