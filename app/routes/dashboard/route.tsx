import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import classes from "./index.module.css";

export const loader = async ({ context: { payload, user } }: LoaderFunctionArgs) => {
  if (user?.collection !== 'users') {
    throw redirect("/auth/signin");
  }

  return json({
    user,
  },
  { status: 200 });
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div className={classes.container}>
      <h1>Welcome, { user.name }</h1>
      <nav>
        <Link to="/dashboard/submit">submit my availabilities</Link>
        <Link to="/dashboard/review">review my availabilities</Link>
        <Link to="/dashboard/planner">planner</Link>
      </nav>
      <Outlet />
    </div>
  );
}
