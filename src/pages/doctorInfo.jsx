import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Loading from "./loadingPage";
export default function DoctorsPage() {

    const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctorsWithUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        setDoctors([]);
        return;
      }

      const response = await axios.get(
        "https://careconnect-api-v2kw.onrender.com/api/doctor/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const doctorsData = response.data?.doctors;
      if (!Array.isArray(doctorsData)) {
        console.error("Expected doctors array, got:", doctorsData);
        setDoctors([]);
        return;
      }

      const detailedDoctors = await Promise.all(
        doctorsData.map(async (doctor) => {
          try {
            const userRes = await axios.get(
              `https://careconnect-api-v2kw.onrender.com/api/doctor/getDoctorByUser/${doctor.user}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            return {
              ...doctor,
              user: userRes.data?.user || {},
            };
          } catch (err) {
            console.error(`Error fetching user for doctor ${doctor._id}:`, err);
            return doctor; // fallback, doctor without user details
          }
        })
      );

      setDoctors(detailedDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      await axios.delete(
        `https://careconnect-api-v2kw.onrender.com/api/doctor/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDoctors((prev) => prev.filter((doctor) => doctor._id !== id));
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor.");
    }
  };

  useEffect(() => {
    fetchDoctorsWithUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">All Doctors</h1>

      {loading ? (
          <Loading/>
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
            {Array.isArray(doctors) &&
              doctors.map((doctor, index) => (
                <tr key={index} className="dark:hover:bg-blue-950 hover:bg-slate-200">
                  <td className="border border-gray-300 p-2">
                    {doctor.user?.firstName || "N/A"} {doctor.user?.lastName || ""}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {doctor.user?.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center space-x-2">
                    <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                    onClick={() => navigate(`/admin/doctors/view/${doctor._id || doctor.user?._id}`)}>
                      View
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-800"
                      onClick={() => handleDelete(doctor._id)}
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
