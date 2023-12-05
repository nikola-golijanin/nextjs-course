import React from "react";
import { getFilteredEvents } from "../../dummy-data";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import NotFoundPage from "../404";
import ResultsTitle from "../../components/events/results-title";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;
  if (!filterData) return <p className="center">Loading...</p>;

  const year = +filterData[0];
  const month = +filterData[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month > 12 ||
    month < 1
  ) {
    return <NotFoundPage content="Invalid filter, please adjust your values" />;
  }

  const filteredEvents = getFilteredEvents({ year, month });
  if (!filteredEvents || filteredEvents.length === 0) {
    return <NotFoundPage content="No events found" />;
  }

  const date = new Date(year, month - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />;
    </>
  );
}
