import React from "react";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import NotFoundPage from "../404";
import ResultsTitle from "../../components/events/results-title";
import Head from "next/head";

export default function FilteredEventsPage({ hasError, events, date }) {
  const formatedDate = new Date(date.year, date.month);

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${date.month}/${date.year}`}
      />
    </Head>
  );

  if (hasError) {
    return (
      <>
        {pageHeadData}
        <NotFoundPage content="Invalid filter, please adjust your values" />;
      </>
    );
  }

  if (!events || events.length === 0) {
    return (
      <>
        {pageHeadData}
        <NotFoundPage content="No events found" />;
      </>
    );
  }

  return (
    <>
      {pageHeadData}
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
