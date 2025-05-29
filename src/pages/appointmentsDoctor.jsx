import React, { useEffect, useState } from "react";
import useDocumentTitle from "../customHooks/documentTitle";
import Loading from "./loadingPage";
export default function AppointmentsDoctor() {
  useDocumentTitle("Doctor Appointments");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  console.log("storedUser:", storedUser);
  const storedToken = localStorage.getItem("token");
  console.log("storedToken:", storedToken);

  if (!storedUser || !storedToken) {
    setError("Missing user or token");
    setLoading(false);
    return;
  }

  let userId;
  try {
    const parsedUser = JSON.parse(storedUser);
    console.log("parsedUser:", parsedUser);
    userId = parsedUser?._id;
    console.log("userId:", userId);
  } catch {
    setError("Invalid user data in localStorage");
    setLoading(false);
    return;
  }

  if (!userId) {
    setError("User ID not found");
    setLoading(false);
    return;
  }

  async function fetchAppointments() {
    try {
      const res = await fetch(
        `https://careconnect-api-v2kw.onrender.com/api/appointment/byDoctor/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (!res.ok) {
        if (res.status === 404) {
          console.warn("No appointments found for this user.");
          console.log(res.json)
          setAppointments(res.json);
          return;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setAppointments(data.appointments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchAppointments();
}, []);


  if (loading) return <Loading/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dark:text-white">
      <h1 className="text-center ">Doctor Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              Patient: {appointment.patientName || appointment.patientId} - Date:{" "}
              {new Date(appointment.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
