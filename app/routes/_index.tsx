
import { Suspense } from "react";
import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import { faEnvelope } from '@fortawesome/pro-solid-svg-icons'

// import {
//   icon
// } from '@fortawesome/fontawesome-svg-core/import.macro'


// icon({ name: 'user' })

export function headers({
  loaderHeaders,
  parentHeaders,
}: {
  loaderHeaders: Headers;
  parentHeaders: Headers;
}) {
  console.log(
    "This is an example of how to set caching headers for a route, feel free to change the value of 60 seconds or remove the header"
  );
  return {
    // This is an example of how to set caching headers for a route
    // For more info on headers in Remix, see: https://remix.run/docs/en/v1/route/headers
    "Cache-Control": "public, max-age=60, s-maxage=60",
  };
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Very cool app | Remix" },
  ];
};

export async function loader() {
  return json({ message: "Hello World" });
}

export default function Index() {

  const data = useLoaderData<typeof loader>();

  return (
    <main>

      <FontAwesomeIcon icon={faEnvelope} />
      <h1 className="text-2xl">Authentication</h1>
      <ul className="list-outside list-disc">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/forgot-password">Forgot Password</Link></li>
        <li><Link to="/resend-verification">Re-resend verification token</Link></li>
        <li><Link to="/verify">Verify</Link></li>
        <li><Link to="/signup">Sign up</Link></li>
      </ul>
      <h1 className="text-2xl">OTP</h1>
      <ul className="list-outside list-disc">
        <li><Link to="/otp-initiate">Initiate</Link></li>
        <li><Link to="/otp-verify">Verify</Link></li>
      </ul>
      <h1 className="text-2xl">Admin</h1>
      <ul className="list-outside list-disc">
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/user">Users</Link></li>
      </ul>
    </main>
  );
}
