import type { V2_MetaFunction, ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import { initiatePasswordReset } from "api/auth/auth";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Initiate Reset"
    },
  ];
};

export async function action({ request }: ActionArgs) {
  const body = await request.formData();

  await initiatePasswordReset({
    email: body.get("email") as string,
  });

  return redirect("/login");
}

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

