import Head from "next/head";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import NewsletterRegistration from "../components/input/newsletter-registration";
export default function HomePage({ events }) {
  return (
    <>
      <Head>
        <title>NextJs Events</title>
        <meta
          name="description"
          content="Find a lot of great developer events that allow you to be a greate engineer"
        />
      </Head>
      <NewsletterRegistration />
      <EventList events={events} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
      revalidate: 60,
    },
  };
}
