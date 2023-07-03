import type {
  LinksFunction,
  V2_MetaFunction,
  LoaderArgs,
  LoaderFunction,
} from "@remix-run/deno";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import Axios from 'axios';
import axios from "axios";

import stylesheet from "~/tailwind.css";

import {
  getSession,
} from "~/session";


// Sets the based URL, note that these API endpoints
// are called from the Remix server, not the client.
// TODO: figured out how to set this dynamically
Axios.defaults.baseURL = 'http://localhost:8888/api/';


/**
 * Links the Tailwind stylesheet
 * @returns Array
 */
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: V2_MetaFunction = () => {
  return [
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
    { title: "New Remix App" },
  ];
};


export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {

  const session = await getSession(
    request.headers.get("Cookie")
  );

  /**
   * Add the token before each request if  one is found in the session
   * because the root loader will get called for every route we can use
   * this instead of the axios interceptors
   * 
   * Registering interceptors in the root loader will cause them to be
   * registered multiple times and will cause the interceptors to be called
   * 
   */
  const token = session.get("token");
  if (token !== null && token !== undefined) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return {};

}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
