import Link from "next/link";
import classes from "./button.module.css";

export default function Button({ children, link, onClick }) {
  if (link) {
    return (
      <Link className={classes.btn} href={link}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes.button} onClick={onClick}>
      {children}
    </button>
  );
}
