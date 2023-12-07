import React from "react";
import { getFilteredEvents } from "../../helpers/api-util";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import NotFoundPage from "../404";
import ResultsTitle from "../../components/events/results-title";

export default function FilteredEventsPage({ hasError, events, date }) {
  const router = useRouter();
  // const filterData = router.query.slug;
  // if (!filterData) return <p className="center">Loading...</p>;

  // const year = +filterData[0];
  // const month = +filterData[1];

  if (hasError) {
    return <NotFoundPage content="Invalid filter, please adjust your values" />;
  }

  if (!events || events.length === 0) {
    return <NotFoundPage content="No events found" />;
  }

  const formatedDate = new Date(date.year, date.month);
  return (
    <>
      <ResultsTitle date={formatedDate} />
      <EventList events={events} />;
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filteredData = params.slug;
  const year = +filteredData[0];
  const month = +filteredData[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month > 12 ||
    month < 1
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({ year, month });
  return {
    props: {
      events: filteredEvents,
      date: {
        year: year,
        month: month,
      },
    },
  };
}
