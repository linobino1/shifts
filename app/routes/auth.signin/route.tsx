import { Form, Link, useActionData } from "@remix-run/react";
import type { ActionFunctionArgs} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import classes from "./index.module.css";

export const action = async ({ request, context: { payload, res }}: ActionFunctionArgs ) => {
  const form = await request.formData();
  
  try {
    await payload.login({
      collection: 'users',
      data: {
        email: form.get('email') as string,
        password: form.get('password') as string,
      },
      res,
    });
    return redirect('/');
  } catch (err) {
    return json({
      error: 'email and/or password invalid',
    });
  }
}

export default function SignIn() {
  const actionData = useActionData<typeof action>();

  return (
    <main>
      <h1>sign in</h1>
      <Form method="post" className={classes.form}>
        <label htmlFor="email">email</label>
        <input type="email" name="email" />

        <label htmlFor="password">password</label>       
        <input type="password" name="password" />

        <button type="submit">sign in</button>

        { actionData?.error && (
          <p className={classes.error}>{actionData.error}</p>
        )}
      </Form>
      <Link to="/auth/forgot-password">forgot password?</Link>
    </main>
  )
}