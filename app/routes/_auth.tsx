import type { V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Authentication"
    },
  ];
};

export default function Auth() {
  return (
    <main className="mx-auto w-full h-full">
      <Outlet />
    </main>
  )
}
