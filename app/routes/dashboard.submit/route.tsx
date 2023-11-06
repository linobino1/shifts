import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import type { User } from "payload/generated-types";
import { redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import classes from "./index.module.css";
import { dayFormat, getDayRange, getPrevMonday } from "~/util";
import { format } from "date-fns";

type Availability = User['availabilities'][0];

export const loader = async ({ context: { payload, user } }: LoaderFunctionArgs) => {
  if (user?.collection !== 'users') {
    throw redirect("/auth/signin");
  }
  
  const lastAvailabilty = user.availabilities?.slice(-1)[0];
  const dayRange = getDayRange(lastAvailabilty ? new Date(lastAvailabilty?.date) : new Date());

  return json({
    dayRange,
  }, { status: 200 });
};

export const action = async ({ request, context: { payload, user } }: ActionFunctionArgs) => {
  if (user?.collection !== 'users') {
    throw redirect("/auth/signin");
  }

  const lastAvailabilty = user.availabilities?.sort().slice(-1)[0];
  const dayRange = getDayRange(lastAvailabilty ? new Date(lastAvailabilty?.date) : new Date());

  const formData = await request.formData();

  const keep: Availability[] = user.availabilities.filter((a: Availability) => format(new Date(a.date), 'P') >= format(getPrevMonday(), 'P'));
  const add: Availability[] = dayRange.map((day: Date) => ({
    date: day.toISOString(),
    available: formData.getAll('days').some((d: any) => format(new Date(d), 'P') === format(day, 'P')),
  }));
  const availabilities = add.concat(keep).reduce(
    (acc: Availability[], curr: Availability) => acc.some((a: Availability) => format(new Date(a.date), 'P') === format(new Date(curr.date), 'P')) ? acc : [...acc, curr],
    []
  );

  try {
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        availabilities,
      },
    });
    return {
      message: 'successfully submitted availabilities',
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'failed to submit availabilities',
    }
  }
};
  
export default function Index() {
  const actionData = useActionData<typeof action>();
  const { dayRange } = useLoaderData<typeof loader>();

  return (
    <form className={classes.container} method="post">
    { actionData?.message && (
      <p>
        { actionData.message }
      </p>
    )}
    <select name="days" multiple={true}>
      { dayRange.map((day: any) => (
      <>
        <option
          key={day}
          className={classes.day}
          value={day}
        >
          { format(new Date(day), dayFormat) }
        </option>
      </>
      ))}
    </select>
    <button type="submit">Submit</button>
    </form>
  );
}
