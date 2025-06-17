
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./loadingPage";
export default function PatientsAll() {

    const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatientsWithUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const patientRes = await axios.get(
        "https://careconnect-api-v2kw.onrender.com/api/patient/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const patients = patientRes.data.patients;

      const detailedPatients = await Promise.all(
        patients.map(async (patient) => {
          try {
            const userRes = await axios.get(
              `https://careconnect-api-v2kw.onrender.com/api/patient/getPatientByUser/${patient.user}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            return {
              ...patient,
              user: userRes.data?.user || {},
            };
          } catch (err) {
            console.error("Error fetching user for patient:", err);
            return patient;
          }
        })
      );

      setPatients(detailedPatients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };
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
      setPatients((prev) => prev.filter((patient) => patient._id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient.");
    }
  };

  useEffect(() => {
    fetchPatientsWithUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">All Patients</h1>

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
            {Array.isArray(patients) &&
              patients.map((citizen, index) => (
                <tr key={index} className="dark:hover:bg-blue-950 hover:bg-slate-200">
                  <td className="border border-gray-300 p-2">
                    {citizen.user?.firstName || "N/A"} {citizen.user?.lastName || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {citizen.user?.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center space-x-2">
                    <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                    onClick={() => navigate(`/admin/patients/view/${citizen._id || citizen.user?._id}`)}>
                      View
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-800"     onClick={() => handleDelete(citizen._id)}>
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
