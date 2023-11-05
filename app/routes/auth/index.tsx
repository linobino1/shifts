import { Outlet } from "@remix-run/react";
import classes from "./index.module.css";

export default function Auth() {
  return (
    <div className={classes.main}>
      <Outlet />
    </div>
  )
}