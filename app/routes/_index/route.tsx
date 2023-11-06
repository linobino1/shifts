import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/server-runtime";

export const loader = async ({ context: { payload, user } }: LoaderFunctionArgs) => {
  if (user?.collection !== 'users') {
    throw redirect("/auth/signin");
  }
  
  return redirect("/dashboard");

  return json({
    user,
  },
  { status: 200 });
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Villa Shifts Planner</h1>
    </div>
  );
}
