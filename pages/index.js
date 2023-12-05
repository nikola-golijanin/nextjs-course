import { useRouter } from "next/router";
import EventList from "../components/events/event-list";
import EventsSearch from "../components/events/events-search";
import { getFeaturedEvents } from "../dummy-data";

export default function HomePage() {
  const router = useRouter();
  const featuredEvents = getFeaturedEvents();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={featuredEvents} />
    </>
  );
}
