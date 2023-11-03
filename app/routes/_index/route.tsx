import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";

export const loader = async ({ context: { payload, user } }: LoaderFunctionArgs) => {
  if (user?.collection !== 'users') {
    throw redirect("/auth/signin");
  }
  
  console.log(user);
  return json({
    user,
  },
  { status: 200 });
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome, { user.name }</h1>
    </div>
  );
}
