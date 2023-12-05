import React from "react";
import Button from "../components/ui/button";
import ErrorAlert from "../components/ui/error-alert";

export default function NotFoundPage({ content }) {
  return (
    <>
      <ErrorAlert>
        <p>{content}</p>
      </ErrorAlert>
      <div className="center">
        <Button link="/events">Show All events</Button>
      </div>
    </>
  );
}
