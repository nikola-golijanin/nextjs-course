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

export async function getEventsIds() {
  const response = await fetch("http://localhost:8080/events");
  const data = await response.json();
  const eventIds = [];

  for (const key in data) {
    eventIds.push(key);
  }

  return eventIds;
}
