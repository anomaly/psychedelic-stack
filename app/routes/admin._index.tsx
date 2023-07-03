import type { V2_MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
    return [
        {
            title: "Index"
        },
    ];
};

export default function Auth() {
    return (
        <div>
            <h1 className="text-2xl">Dashboard with options</h1>
            <Link to="/admin/user">User</Link>
        </div>
    )
}

