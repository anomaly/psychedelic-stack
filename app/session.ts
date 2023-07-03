// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

// Typing support for session data, you will be
// restricted to only the properties you define here
type SessionData = {
  token: string | null;
};

// These are set for one time use, are an easy
// way to display error messages
type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: "__session",
      },
    }
  );

export { getSession, commitSession, destroySession };
