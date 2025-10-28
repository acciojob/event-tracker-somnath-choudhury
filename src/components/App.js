
import './../styles/App.css';
import React, { useState } from "react";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import Popup from "react-popup";
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = BigCalendar.momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleSelectSlot = ({ start }) => {
    Popup.create({
      title: "Create Event",
      content: (
        <div>
          <input placeholder="Event Title" id="eventTitle" />
          <input placeholder="Event Location" id="eventLocation" />
        </div>
      ),
      buttons: {
        right: [
          {
            text: "Save",
            className: "mm-popup__btn",
            action: () => {
              const title = document.getElementById("eventTitle").value;
              const location = document.getElementById("eventLocation").value;
              if (!title) return;

              const newEvent = {
                id: Date.now(),
                title,
                location,
                start,
                end: moment(start).add(1, "hours").toDate(),
                isPast: moment(start).isBefore(moment(), "day"),
              };
              setEvents([...events, newEvent]);
              Popup.close();
            },
          },
        ],
      },
    });
  };

  const filteredEvents = events.filter((event) => {
    if (filter === "past") return event.isPast;
    if (filter === "upcoming") return !event.isPast;
    return true;
  });

  return (
    <div className="App">
      <div className="filter-buttons">
        <button className="btn" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="btn" onClick={() => setFilter("past")}>
          Past
        </button>
        <button className="btn" onClick={() => setFilter("upcoming")}>
          Upcoming
        </button>
      </div>

      <BigCalendar
        selectable
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        style={{ height: 600, margin: "50px" }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.isPast
              ? "rgb(222, 105, 135)"
              : "rgb(140, 189, 76)",
          },
        })}
      />
      <Popup />
    </div>
  );
}

export default App;