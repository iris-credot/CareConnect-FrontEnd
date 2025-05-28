import React, { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import useDocumentTitle from "../customHooks/documentTitle";
export default function PatientsPage(){
    useDocumentTitle("Patients");
     const { id } = useParams(); // Get ID from URL
  const [citizens, setCitizens] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `https://careconnect-api-v2kw.onrender.com/api/patient/getPatientByUser/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Include this if your API requires auth
              // Authorization: `Bearer ${yourToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }

        const data = await response.json();
        setCitizens(data);
      } catch (error) {
       console.error("Error fetching citizens:", error);
      } 
    };

    if (id) {
      fetchPatients();
    }
  }, [id]);
   return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">All Patientss</h1>

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
              <td className="border border-gray-300 p-2">{citizen.names}</td>
              <td className="border border-gray-300 p-2">{citizen.email}</td>
              <td className="border border-gray-300 p-2 text-center space-x-2">
                <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                  View
                </button>
                <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}