import type { V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
    return [
        {
            title: "Admin"
        },
    ];
};

export default function Auth() {
    return (
        <main>
            <h1 className="text-2xl">Welcome to Admin screens</h1>
            <Outlet />
        </main>
    )
}
