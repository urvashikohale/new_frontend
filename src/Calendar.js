import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // for drag-and-drop
import { Link } from "react-router-dom";

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the server
    fetch("http://localhost:5000/api/appointments")
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleDrop = (info) => {
    // Update appointment in the database on drop
    const id = info.event._def.extendedProps._id;
    const { end, start } = info.event._instance.range;

    // Format dates as strings
    const formattedStart = start.toISOString();
    const formattedEnd = end.toISOString();
    console.log("IS", id);
    fetch(`http://localhost:5000/api/appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ start: formattedStart, end: formattedEnd }),
    })
      .then((response) => response.json(console.log("ress", response)))
      .then((data) => {
        console.log("Appointment updated:", data);
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === data._id ? data : appointment
          )
        );
      })
      .catch((error) => console.error("Error updating appointment:", error));
  };

  const handleEventClick = (info) => {
    console.log(info.event._def.extendedProps._id);
    // Delete appointment on event click
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (confirmDelete) {
      fetch(
        `http://localhost:5000/api/appointments/${info.event._def.extendedProps._id}`,
        {
          method: "DELETE",
        }
      )
        .then(() => {
          // Update state to remove the deleted appointment
          setAppointments((prevAppointments) =>
            prevAppointments.filter(
              (appointment) =>
                appointment._id !== info.event._def.extendedProps._id
            )
          );
        })
        .catch((error) => console.error("Error deleting appointment:", error));
    }
  };

  const handleDateClick = (info) => {
    // Add new appointment on date click
    const title = prompt("Enter patient name:");
    if (title) {
      const newAppointment = { title, start: info.date, end: info.date };
      fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppointment),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update state to include the new appointment
          setAppointments((prevAppointments) => [...prevAppointments, data]);
        })
        .catch((error) => console.error("Error adding appointment:", error));
    }
  };

  return (
    <div>
      <Link to="/summarypage">
        <button>Show Summary</button>
      </Link>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        events={appointments}
        editable={true}
        droppable={true}
        eventDrop={handleDrop}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default Calendar;
