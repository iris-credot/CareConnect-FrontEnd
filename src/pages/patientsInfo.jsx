import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useDocumentTitle from "../customHooks/documentTitle";

export default function PatientsPage() {
  useDocumentTitle("Patients");

  const { id } = useParams(); // Doctor ID from URL
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!id) {
        console.warn("No doctor ID provided.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        console.log("Doctor ID from URL:", id);
        console.log("Token from localStorage:", token);

        const response = await fetch(
          `https://careconnect-api-v2kw.onrender.com/api/patient/getPatientByDoctor/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch patient data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched patients data:", data);

        if (Array.isArray(data.patients)) {
          setCitizens(data.patients);
        } else {
          console.warn("Unexpected response structure:", data);
          setCitizens([]);
        }

      } catch (error) {
        console.error("❌ Error fetching patients:", error);
        setError("Failed to fetch patient data.");
        setCitizens([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [id]);

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
                  <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                    View
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
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
