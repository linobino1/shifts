import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

export const loader = async ({ context: { payload, user } }: LoaderFunctionArgs) => {
  if (user?.collection !== 'users') {
    throw redirect("/auth/signin");
  }

  return json({
    user,
  },
  { status: 200 });
}

const handleSignOut = async () => {
  try {
    await fetch(`/api/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
export default function Auth() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>My Profile</h1>
      <p>{user.name}</p>
      <button type="button" onClick={handleSignOut}>sign out</button>
    </main>
    )
  }