import type {
    V2_MetaFunction,
    ActionArgs,
    ActionFunction,
    LoaderArgs,
    LoaderFunction
} from "@remix-run/node";

import {
    json
} from "@remix-run/node";

import {
    Form,
    useLoaderData,
} from "@remix-run/react";

import type {
    AxiosResponse,
    AxiosError,
    AxiosRequestConfig,
} from "axios";

import {
    getSession,
    commitSession
} from "../session";

import type {
    UserResponse,
} from "api/models";

import {
    getUsersWithLimits,
    createUser,
} from "api/user/user";


export const action: ActionFunction = async ({ request }: ActionArgs) => {

    const session = await getSession(
        request.headers.get("Cookie")
    );

    const body = await request.formData();

    try {
        await createUser({
            firstName: body.get("firstName") as string,
            lastName: body.get("lastName") as string,
            email: body.get("email") as string,
            password: body.get("password") as string,
        });
        return json({});
    }
    catch (error) {
        console.log("error creating user");
        return json({});
    }
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {

    const session = await getSession(
        request.headers.get("Cookie")
    );


    try {
        const users: AxiosResponse<UserResponse> = await getUsersWithLimits({
            offset: 0,
            limit: 10,
        });
        return json(users.data);
    }
    catch (error) {
        console.log("can't get users");
        return json({});
    }

}


export const meta: V2_MetaFunction = () => {
    return [
        {
            title: "List of users"
        },
    ];
};

export default function AdminUserIndex() {

    const data = useLoaderData<UserResponse[]>();

    return (
        <div>
            <h1 className="text-2xl">List of users</h1>
            <ul>
                {data.map((user) => {
                    return (
                        <li key={user.id}>{user.firstName}</li>
                    )
                })}
            </ul>
            <div>
                <h1 className="text-2xl">Login to our app</h1>
                <Form method="POST" replace>
                    <input type="email" name="email" />
                    <input type="text" name="firstName" />
                    <input type="text" name="lastName" />
                    <input type="password" name="password" />
                    <button type="submit">Submit</button>
                </Form>
            </div>

        </div>
    )
}

