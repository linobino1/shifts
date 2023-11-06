import type { LoaderFunctionArgs } from "@remix-run/node";
import type { User } from "payload/generated-types";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import classes from "./index.module.css";
import { getDayRange } from "~/util";
import { format } from "date-fns";

export const loader = async ({ context: { payload, user } }: LoaderFunctionArgs) => {
  if (user?.collection !== 'users') {
    throw redirect("/auth/signin");
  }
  if (user.role !== 'manager') {
    throw json({
      message: 'Not authorized',
    }, {
      status: 403,
    })
  }
  
  try {
    const users = await payload.find({
      collection: 'users',
      where: {
        active: {
          equals: true,
        },
      },
    });
    return json({
      users: users.docs,
    },
    { status: 200 });
  } catch(error) {
    return json({
      message: 'could not retrieve data',
      users: [],
    },
    { status: 200 });
  }

};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const { users } = data;
  const days = getDayRange();

  return (
    <div className={classes.container}>
    { 'message' in data && (
      <p>{ data.message as string }</p>
    )}
    <table>
      <thead>
        <tr>
          <th>name</th>
          { days.map((day: Date) => (
            <th key={day.toISOString()}>{ format(day, 'EEEEEE do') }</th>
          ))}
        </tr>
      </thead>
      <tbody>
        { users.map((user) => (
          <tr key={user.id}>
            <th>{user.name}</th>
            { days.map((day: Date) => (
              <td key={day.toISOString()}>
                { user.availabilities?.find((a: User['availabilities'][0]) => (format(new Date(a.date), 'P') === format(day, 'P') && a.available)) ? '✅' : '❌' }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
