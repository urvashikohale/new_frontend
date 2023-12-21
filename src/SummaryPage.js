// src/SummaryPage.js
import React, { useState, useEffect } from "react";

const SummaryPage = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    fetchUpcomingAppointments();
  }, []);

  const fetchUpcomingAppointments = () => {
    fetch("http://localhost:5000/api/upcoming-appointments")
      .then((response) => response.json())
      .then((data) => setUpcomingAppointments(data))
      .catch((error) =>
        console.error("Error fetching upcoming appointments:", error)
      );
  };

  return (
    <div>
      <h2>Upcoming Appointments</h2>
      <ul>
        {upcomingAppointments.map((appointment) => (
          <li key={appointment._id}>
            <strong>{appointment.title}</strong> - {appointment.start}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SummaryPage;
