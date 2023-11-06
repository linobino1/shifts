import type { LoaderFunctionArgs } from "@remix-run/node";
import type { User } from "payload/generated-types";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import classes from "./index.module.css";
import { format } from "date-fns";
import { dayFormat } from "~/util";

export const loader = async ({ context: { payload, user } }: LoaderFunctionArgs) => {
  if (user?.collection !== 'users') {
    throw redirect("/auth/signin");
  }
  
  const { availabilities } = user;

  return json({
    availabilities: availabilities || [],
  },
  { status: 200 });
};

export default function Index() {
  const { availabilities } = useLoaderData<typeof loader>();
  return (
    <div className={classes.conanyer}>
      { availabilities.map((a: User['availabilities'][0]) => (
        <div key={a.id} className={classes.availability}>
          { format(new Date(a.date), dayFormat) }: { a.available ? '✅' : '❌' }
        </div>
      ))}
    </div>
  );
}
