import { useRouter } from "next/router";
import React from "react";
import { getEventById } from "../../dummy-data";
import NotFoundPage from "../404";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

export default function EventDetailPage() {
  const router = useRouter();

  //this one can go ===> const eventId = router.query.eventid
  const eventId = router.query["eventid"];

  const event = getEventById(eventId);
  if (!event)
    return <NotFoundPage content={`Event with id ${eventId} is not found`} />;

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}
