import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./App.css";
import React, { useEffect, useState } from "react";

const events = [{ title: "Meeting", start: new Date() }];

export default function App() {
  const [appointments, setAppointments] = useState([]);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  useEffect(() => {
    // Fetch appointments when the component mounts
    fetchAppointments();
    // const renderEventContent = (appointment) => {
    //   console.log("EVENTINFo", appointment);
    //   return (
    //     <div>
    //       {/* <b>{eventInfo.timeText}</b> */}
    //       {/* <i
    //         style={{
    //           whiteSpace: "nowrap",
    //           overflow: "hidden",
    //           textOverflow: "ellipsis",
    //         }}
    //       > */}
    //       {/* {eventInfo.title} */}
    //       {/* </i> */}
    //     </div>
    //   );
    // };
    console.log("A", appointments);
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/app/all");
      const data = await response.json();
      // console.log("FETCH", data);
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleEventClick = (eventInfo) => {
    // Handle event click (if needed)
    console.log("Event Clicked:", eventInfo.event);
  };

  const handleDateSelect = async (selectInfo) => {
    // Handle date selection
    const title = prompt("Enter Patient Name:");
    if (title) {
      setStart(selectInfo.start);
      setEnd(selectInfo.end);
      try {
        const response = await fetch("http://localhost:8000/api/app/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, start, end }),
        });
        const data = await response.json();
        console.log("DATA", data);
        setAppointments([...appointments, data]);
      } catch (error) {
        console.error("Error creating appointment:", error);
      }
    }
  };

  function renderEventContent(eventInfo) {
    console.log("RENDER", eventInfo);
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  // const renderEventContent = (eventInfo) => {
  //   console.log("EVENTINFo", eventInfo.event);
  //   return (
  //     <div>
  //       {/* <b>{eventInfo.timeText}</b> */}
  //       {/* <i
  //         style={{
  //           whiteSpace: "nowrap",
  //           overflow: "hidden",
  //           textOverflow: "ellipsis",
  //         }}
  //       > */}
  //       {eventInfo.title}
  //       {/* </i> */}
  //     </div>
  //   );
  // };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, bootstrap5Plugin, interactionPlugin]}
        initialView="dayGridWeek"
        selectable
        editable
        events={appointments}
        initialEvents={appointments}
        eventClick={handleEventClick}
        dateClick={handleDateSelect}
        eventContent={renderEventContent}
      />
    </div>
  );
}
// a custom render function
// function renderEventContent(appointments) {
//   return (
//     <>
//       <b>{appointments.timeText}</b>
//       <i>{appo.event.title}</i>
//     </>
//   );
// }
//   const [events, setEvents] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     patientName: "",
//     caseName: "",
//   });
//   const [isModalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     // Fetch appointments when the component mounts
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/api/app/all");
//       const data = await response.json();
//       setAppointments(data);
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     }
//   };

//   const handleDateSelect = (selectInfo) => {
//     // Handle date selection
//     setSelectedDate(selectInfo.startStr);
//     setFormData({ title: "", patientName: "", caseName: "" });
//     setModalOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8000/api/appointments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           start: selectedDate,
//           end: selectedDate,
//         }),
//       });
//       const data = await response.json();
//       setAppointments([...appointments, data]);
//       setModalOpen(false);
//     } catch (error) {
//       console.error("Error creating appointment:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   // const handleEventClick = (selectInfo) => {
//   //   // Handle event click (if needed)
//   //   setFormData({ title: "", patientName: "", caseName: "" });
//   //   setModalOpen(true);
//   //   // console.log("Event Clicked:", eventInfo.event);
//   // };

//   // const handleDateSelect = async (selectInfo) => {
//   //   // Handle date selection
//   //   const start = selectInfo.startStr;
//   //   const end = selectInfo.endStr;

//   //   const handleSubmit = async (e) => {
//   //     e.preventDefault();

//   //     try {
//   //       const response = await fetch("/api/appointments", {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({ ...formData, start, end }),
//   //       });
//   //       const data = await response.json();
//   //       setAppointments([...appointments, data]);
//   //     } catch (error) {
//   //       console.error("Error creating appointment:", error);
//   //     }
//   //   };

//   //   const handleChange = (e) => {
//   //     setFormData({ ...formData, [e.target.name]: e.target.value });

//   //     alert(`Enter Appointment Details:\n${JSON.stringify(formData, null, 2)}`);
//   //   };

//   //   // Render a form for entering appointment details
//   //   const form = (
//   //     <form onSubmit={handleSubmit}>
//   //       <label>
//   //         Title:
//   //         <input
//   //           type="text"
//   //           name="title"
//   //           value={formData.title}
//   //           onChange={handleChange}
//   //         />
//   //       </label>
//   //       <br />
//   //       <label>
//   //         Patient Name:
//   //         <input
//   //           type="text"
//   //           name="patientName"
//   //           value={formData.patientName}
//   //           onChange={handleChange}
//   //         />
//   //       </label>
//   //       <br />
//   //       <label>
//   //         Case Name:
//   //         <input
//   //           type="text"
//   //           name="caseName"
//   //           value={formData.caseName}
//   //           onChange={handleChange}
//   //         />
//   //       </label>
//   //       <br />
//   //       <button type="submit">Create Appointment</button>
//   //     </form>
//   //   );

//   //   // Display the form using your preferred UI/modal library or method
//   //   // For simplicity, alert is used here
//   //   // alert(form);
//   // };

//   // const handleDateSelect = async (selectInfo) => {
//   //   // Handle date selection
//   //   const title = prompt("Enter event title:");
//   //   const patientName = prompt("Enter patient name:");
//   //   const caseName = prompt("Enter case name:");

//   //   if (title && patientName && caseName) {
//   //     const start = selectInfo.startStr;
//   //     const end = selectInfo.endStr;

//   //     try {
//   //       const response = await fetch("/api/app/create", {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({ title, start, end, patientName, caseName }),
//   //       });
//   //       const data = await response.json();
//   //       setAppointments([...appointments, data]);
//   //     } catch (error) {
//   //       console.error("Error creating appointment:", error);
//   //     }
//   //   }
//   // };
//   // const newEvent = (start) => {
//   //   alert("CLICKED");
//   // };

//   // const editEvent = (calEvent) => {
//   //   alert("EDIT EVENT");
//   // };

//   return (
//     <div>
//       <h1>Demo App</h1>
//       {/* <div>
//         <button onClick={handleCreateAppointment}>Create Appointment</button>
//       </div> */}
//       {/* <div className="full"> */}
//       <FullCalendar
//         plugins={[dayGridPlugin, bootstrap5Plugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         weekends={false}
//         events={appointments}
//         eventContent={renderEventContent}
//         editable
//         selectable
//         // select={handleSelect}
//         // eventClick={handleEventClick}
//         dateClick={handleDateSelect}
//       />

//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Title:
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//             />
//           </label>
//           <br />
//           <label>
//             Patient Name:
//             <input
//               type="text"
//               name="patientName"
//               value={formData.patientName}
//               onChange={handleChange}
//             />
//           </label>
//           <br />
//           <label>
//             Case Name:
//             <input
//               type="text"
//               name="caseName"
//               value={formData.caseName}
//               onChange={handleChange}
//             />
//           </label>
//           <br />
//           <button type="submit">Create Appointment</button>
//         </form>
//       </Modal>
//       {/* </div> */}
//     </div>
//   );
// }

// // a custom render function
// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }

// // import React, { useState, useEffect } from "react";
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// // import axios from "axios";
// // import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import moment from "moment";

// // const localizer = momentLocalizer(moment);
// // const DnDCalendar = withDragAndDrop(Calendar);

// // const App = () => {
// //   const [events, setEvents] = useState([]);

// //   useEffect(() => {
// //     fetchAppointments();
// //   }, []);

// //   const fetchAppointments = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:8000/api/app/all");
// //       setEvents(
// //         response.data.map((appointment) => ({
// //           ...appointment,
// //           start: new Date(appointment.start),
// //           end: new Date(appointment.end),
// //         }))
// //       );
// //     } catch (error) {
// //       console.error("Error fetching appointments:", error);
// //     }
// //   };

// //   const handleEventDrop = async ({ event }) => {
// //     try {
// //       await axios.post("http://localhost:5000/api/app/create", {
// //         ...event,
// //         start: event.start.toISOString(),
// //         end: event.end.toISOString(),
// //       });
// //       fetchAppointments();
// //     } catch (error) {
// //       console.error("Error updating appointment:", error);
// //     }
// //   };

// //   const handleEventDelete = async (event) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/api/${event._id}/delete`);
// //       fetchAppointments();
// //     } catch (error) {
// //       console.error("Error deleting appointment:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <DnDCalendar
// //         localizer={localizer}
// //         events={events}
// //         defaultView="week"
// //         views={["week"]}
// //         onSelectSlot={({ start, end }) => console.log(start, end)}
// //         onEventDrop={handleEventDrop}
// //         onDoubleClickEvent={handleEventDelete}
// //         resizable
// //         style={{ height: "70vh" }}
// //       />
// //     </div>
// //   );
// // };

// // export default App;

// // // import React from "react";
// // // import Calendar from "@toast-ui/react-calendar";
// // // import "@toast-ui/calendar/dist/toastui-calendar.min.css";

// // // const App = () => {
// // //   return (
// // //     <div>
// // //       <Calendar />
// // //     </div>
// // //   );
// // // };

// // // export default App;
