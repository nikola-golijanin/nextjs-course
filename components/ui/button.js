import Link from "next/link";
import classes from "./button.module.css";

export default function Button({ children, link }) {
  return (
    <Link className={classes.btn} href={link}>
      {children}
    </Link>
  );
}
