import React, { useEffect, useState } from "react";



import { useParams } from "react-router-dom";

// Zod schema for validation (optional here)


export default function ViewAppointment() {
    

  const { id } = useParams();

  const [appointment, setAppointment] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date) ? "N/A" : date.toLocaleDateString();
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date) ? "N/A" : date.toLocaleString();
  };

useEffect(() => {
  const fetchAppointmentDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Missing authentication token");

      // Fetch appointment
      const appointmentRes = await fetch(
        `https://careconnect-api-v2kw.onrender.com/api/appointment/get/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!appointmentRes.ok) throw new Error("Failed to fetch appointment");

      const data = await appointmentRes.json();
      console.log(data);
      setAppointment(data.appointment);

  

    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchAppointmentDetails();
}, [id]);


  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;

  if (!appointment) return <div className="text-center mt-10">Appointment not found.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 dark:bg-black">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6 space-y-6 dark:bg-black">
      
       
        <h2 className="text-3xl font-bold text-start text-gray-800 dark:text-white">
          Appointment Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-white mt-10">
         
          <p><strong>Date:</strong> {formatDate(appointment.date)}</p>
          <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
          <p><strong>Status:</strong> {appointment.status ?? "N/A"}</p>
          <p><strong>Created At:</strong> {formatDateTime(appointment.createdAt)}</p>
          <p><strong>Updated At:</strong> {formatDateTime(appointment.updatedAt)}</p>
          <p><strong>Reason:</strong> {appointment.reason ?? "N/A"}</p>
          <p><strong>Notes:</strong> {appointment.notes ?? "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
