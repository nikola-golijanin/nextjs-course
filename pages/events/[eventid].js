import React from "react";
import {
  getEventById,
  getAllEvents,
  getEventsIds,
} from "../../helpers/api-util";
import NotFoundPage from "../404";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

export default function EventDetailPage({ event }) {
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

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params["eventid"];

  const event = await getEventById(eventId);

  if (!event) {
    return { notFound: true };
  }

  return {
    props: {
      event: event,
    },
  };
}

export async function getStaticPaths() {
  const ids = await getEventsIds();
  const paths = ids.map((id) => ({ params: { eventid: id } }));

  return {
    paths: paths,
    fallback: false,
  };
}
