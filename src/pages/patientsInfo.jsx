import React, { useState, useEffect } from "react";
import useDocumentTitle from "../customHooks/documentTitle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function PatientsPage() {
  useDocumentTitle("Patients");
const navigate=useNavigate();
  const doctorUserId = localStorage.getItem("userId"); // doctor userId

  const [doctorId, setDoctorId] = useState(null);
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Step 1: Fetch the doctor document using the userId
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `https://careconnect-api-v2kw.onrender.com/api/doctor/getdoctorByUser/${doctorUserId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch doctor info");

        const doctorData = await res.json();
        setDoctorId(doctorData._id); // doctor._id
      } catch (err) {
        console.error(err);
        setError("Failed to fetch doctor info");
        setLoading(false);
      }
    };

    if (doctorUserId) {
      fetchDoctor();
    } else {
      setError("No doctor user ID found");
      setLoading(false);
    }
  }, [doctorUserId]);
const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      await axios.delete(
        `https://careconnect-api-v2kw.onrender.com/api/patient/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update state by filtering out the deleted patient
      setCitizens((prev) => prev.filter((patient) => patient._id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient.");
    }
  };
  // Step 2: Fetch patients using doctor._id
  useEffect(() => {
    if (!doctorId) return;

    const fetchPatients = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `https://careconnect-api-v2kw.onrender.com/api/doctor/getDoctorPatients/${doctorId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch patient data. Status: ${res.status}`);
        }

        const data = await res.json();
        if (Array.isArray(data.patients)) {
          setCitizens(data.patients);
        } else {
          setCitizens([]);
        }
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to fetch patient data.");
        setCitizens([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [doctorId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">All Patients</h1>

      {loading ? (
        <p className="dark:text-white">Loading patients...</p>
      ) : error ? (
        <p className="text-red-500 dark:text-red-400">{error}</p>
      ) : citizens.length === 0 ? (
        <p className="dark:text-white">No patients found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:text-black">
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">Email</th>
              <th className="border border-gray-300 p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {citizens.map((citizen, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">
                  {citizen.user?.firstName} {citizen.user?.lastName}
                </td>
                <td className="border border-gray-300 p-2">
                  {citizen.user?.email}
                </td>
                <td className="border border-gray-300 p-2 text-center space-x-2">
                  <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                  onClick={() => navigate(`/admin/patients/view/${citizen._id || citizen.user?._id}`)}
                  >
                    View
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"onClick={() => handleDelete(citizen._id)}>
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
