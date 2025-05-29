import useDocumentTitle from "../customHooks/documentTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./loadingPage";
export default function AppointmentsAdmin() {
     const navigate = useNavigate();
  useDocumentTitle("CareConnect-Appointments");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchAppointmentsWithUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      return;
    }

    const res = await axios.get(
      "https://careconnect-api-v2kw.onrender.com/api/appointment/all",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const appointments = res.data.appointments;

    const detailedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        try {
          const [patientUserRes, doctorUserRes] = await Promise.all([
            axios.get(
              `https://careconnect-api-v2kw.onrender.com/api/user/getOne/${appointment.patient?.user}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
            axios.get(
              `https://careconnect-api-v2kw.onrender.com/api/user/getOne/${appointment.doctor?.user}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
          ]);

          return {
            ...appointment,
            patientDetails: patientUserRes.data.user,
            doctorDetails: doctorUserRes.data.user,
          };
        } catch (error) {
          console.error("Error fetching patient/doctor user data:", error);
          return appointment; // fallback without user details
        }
      })
    );

    setAppointments(detailedAppointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      await axios.delete(
        `https://careconnect-api-v2kw.onrender.com/api/appointment/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment.");
    }
  };

  useEffect(() => {
    fetchAppointmentsWithUsers();
  }, []);

  return (
    <div className="p-6">
               <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/admin/appointments/create")} // <-- update this route as needed
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Add Appointment
        </button>
      </div>
       
      <h1 className="text-2xl font-bold mb-4 dark:text-white">All Appointments</h1>

      {loading ? (
            <Loading/>
      ) : (
        <table className="w-full border-collapse border border-gray-300 dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:text-black">
              <th className="border border-gray-300 p-2 text-left">Patient</th>
              <th className="border border-gray-300 p-2 text-left">Doctor</th>
              <th className="border border-gray-300 p-2 text-left">Purpose</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id} className="dark:hover:bg-blue-950 hover:bg-slate-200">
                <td className="border border-gray-300 p-2">
                  {appt.patientDetails?.firstName || "N/A"}{" "}
                  {appt.patientDetails?.lastName || ""}
                </td>
                <td className="border border-gray-300 p-2">
                  {appt.doctorDetails?.firstName || "N/A"}{" "}
                  {appt.doctorDetails?.lastName || ""}
                </td>
                <td className="border border-gray-300 p-2">
                  {appt.reason || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {appt.status || "Pending"}
                </td>
                <td className="border border-gray-300 p-2 text-center space-x-2">
                  <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                   onClick={() => navigate(`/admin/appointments/view/${appt._id || appt.user?._id}`)}>
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(appt._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
