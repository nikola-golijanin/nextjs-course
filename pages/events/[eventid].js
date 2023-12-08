import React from "react";
import { getEventById, getFeatureEventsIds } from "../../helpers/api-util";
import NotFoundPage from "../404";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Comments from "../../components/input/comments"
import Head from "next/head";
export default function EventDetailPage({ event }) {
  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={`Event ${event.title}`} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
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
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const ids = await getFeatureEventsIds();
  const paths = ids.map((id) => ({ params: { eventid: id } }));

  return {
    paths: paths,
    fallback: true,
  };
}
