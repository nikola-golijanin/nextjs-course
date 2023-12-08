import fs from "fs";
import path from "path";

export async function getAllEvents() {
  const response = await fetch("http://localhost:8080/events");
  const data = await response.json();
  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFeatureEventsIds() {
  const featuredEvents = await getFeaturedEvents();
  const eventIds = featuredEvents.map((e) => e.id);
  return eventIds;
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export function buildFilePath(fileName) {
  return path.join(process.cwd(), "data", fileName);
}

export function extractData(filePath) {
  const fileData = fs.readFileSync(filePath);

  if (fileData.toString().length === 0) {
    fs.writeFileSync(filePath, JSON.stringify([]));
    return [];
  }
  const data = JSON.parse(fileData);
  return data;
}
