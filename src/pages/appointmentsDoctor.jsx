import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./loadingPage";
import axios from "axios";

export default function AppointmentsDoctor() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // STEP 1: Get doctorId using userId from localStorage
  useEffect(() => {
    const fetchDoctorId = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        setError("Missing user ID or token");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://careconnect-api-v2kw.onrender.com/api/doctor/getdoctorByUser/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDoctorId(res.data._id);
      } catch (err) {
        console.error("Error fetching doctor info:", err);
        setError("Failed to fetch doctor information.");
        setLoading(false);
      }
    };

    fetchDoctorId();
  }, []);

  // STEP 2: Fetch appointments using doctorId
  useEffect(() => {
    if (!doctorId) return;

    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          `https://careconnect-api-v2kw.onrender.com/api/appointment/byDoctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const appointmentsData = res.data.appointments || [];
        appointmentsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const detailedAppointments = await Promise.all(
          appointmentsData.map(async (appointment) => {
            try {
              const patientRes = await axios.get(
                `https://careconnect-api-v2kw.onrender.com/api/user/getOne/${appointment.patient?.user}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              return {
                ...appointment,
                patientDetails: patientRes.data.user,
              };
            } catch (err) {
              console.error("Error fetching patient details:", err);
              return appointment;
            }
          })
        );

        setAppointments(detailedAppointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError(err.message || "Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://careconnect-api-v2kw.onrender.com/api/appointment/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete appointment.");
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center mt-4">Error: {error}</div>;

  return (
    <div className="p-6 dark:text-white">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/doctor/appointments/create")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Add Appointment
        </button>
      </div>

      <h1 className="text-xl font-bold mb-4 text-center">Doctor Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-center">No appointments found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:text-black">
              <th className="border border-gray-300 p-2 text-left">Patient</th>
              <th className="border border-gray-300 p-2 text-left">Date</th>
              <th className="border border-gray-300 p-2 text-left">Time</th>
              <th className="border border-gray-300 p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => {
              const apptDate = new Date(appt.date);
              const formattedDate = apptDate.toLocaleDateString();
              const formattedTime = apptDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <tr key={appt._id} className="hover:bg-slate-100 dark:hover:bg-blue-950">
                  <td className="border border-gray-300 p-2">
                    {appt.patientDetails?.firstName} {appt.patientDetails?.lastName || ""}
                  </td>
                  <td className="border border-gray-300 p-2">{formattedDate}</td>
                  <td className="border border-gray-300 p-2">{formattedTime}</td>
                  <td className="border border-gray-300 p-2 text-center items-center justify-center md:space-x-2 flex md:flex-row flex-col md:gap-0 gap-2">
                    <button
                      className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                      onClick={() => navigate(`/doctor/appointments/view/${appt._id}`)}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => navigate(`/doctor/appointments/update/${appt._id}`)}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(appt._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
