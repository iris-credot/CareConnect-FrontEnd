import React, { useEffect, useState } from "react";
import Loading from "./loadingPage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          throw new Error("User not authenticated");
        }

        // Fetch patient by userId
        const patientRes = await axios.get(
          `https://careconnect-api-v2kw.onrender.com/api/patient/getPatientByUser/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const patientData = patientRes.data;

        if (!patientData.patients || patientData.patients.length === 0) {
          setAppointments([]);
          setLoading(false);
          return;
        }

        const fetchedPatientId = patientData.patients[0]._id;

        // Fetch appointments by patientId
        const appointRes = await axios.get(
          `https://careconnect-api-v2kw.onrender.com/api/appointment/byPatient/${fetchedPatientId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const appointData = appointRes.data;

        // Sort appointments by date descending
        appointData.appointments.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Fetch doctor details for each appointment in parallel
        const detailedAppointments = await Promise.all(
          appointData.appointments.map(async (appt) => {
            try {
              const doctorRes = await axios.get(
                `https://careconnect-api-v2kw.onrender.com/api/doctor/getDoctorByUser/${appt.doctor?.user}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
 const doctor = doctorRes.data;

      // 2. Fetch user details for that doctor using doctor.user
      const userRes = await axios.get(
        `https://careconnect-api-v2kw.onrender.com/api/user/getOne/${doctor.user}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const user = userRes.data.user;
console.log(user);
      // 3. Combine doctor and user info inside appointment object
      return {
        ...appt,
        doctorDetails: {
          ...doctor,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
    } catch (err) {
      console.error("Error fetching doctor or user details:", err);
      return appt; // return appointment as is if fetch fails
    }
  })
);
        setAppointments(detailedAppointments);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 dark:text-white">
      <h1 className="text-xl font-bold mb-4 text-center">Patient Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-center">No appointments found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 dark:text-white">
              <th className="border border-gray-300 p-2 text-left">Doctor</th>
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
                <tr
                  key={appt._id}
                  className="hover:bg-slate-100 dark:hover:bg-blue-950"
                >
                  <td className="border border-gray-300 p-2">
                    {appt.doctorDetails
                      ? `${appt.doctorDetails.firstName} ${appt.doctorDetails.lastName}`
                      : "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">{formattedDate}</td>
                  <td className="border border-gray-300 p-2">{formattedTime}</td>
                  <td className="border border-gray-300 p-2 text-center flex justify-center gap-2">
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
