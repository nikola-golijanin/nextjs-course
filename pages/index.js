import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

export default function HomePage({ events }) {
  return (
    <>
      <EventList events={events} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
  };
}
