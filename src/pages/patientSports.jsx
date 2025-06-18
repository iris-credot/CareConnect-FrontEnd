import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PatientSports() {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPatientSports() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          throw new Error("User not authenticated.");
        }

        // Step 1: Get patient ID by user ID
        const patientRes = await axios.get(
          `https://careconnect-api-v2kw.onrender.com/api/patient/getPatientByUser/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const patient = patientRes.data?.patients?.[0];
        if (!patient?._id) {
          throw new Error("Patient not found.");
        }

        // Step 2: Fetch sport recommendations by patient ID
        const sportRes = await axios.get(
          `https://careconnect-api-v2kw.onrender.com/api/sports/patient/${patient._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        let data = sportRes.data.recommendations || [];
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
console.log(data);
        setSports(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPatientSports();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 dark:text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Recommended Sports</h1>

      {sports.length === 0 ? (
        <p className="text-center">No sport recommendations found.</p>
      ) : (
        sports.map((rec, index) => (
          <div
            key={rec._id || index}
            className="mb-8 p-4 border rounded bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">Recommendation {index + 1}</h2>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {new Date(rec.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="overflow-x-auto text-sm">
              <table className="w-full mb-3 border border-gray-300 text-left">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="border border-gray-300 p-2">Sport</th>
                    <th className="border border-gray-300 p-2">Duration</th>
                    <th className="border border-gray-300 p-2">Frequency</th>
                    <th className="border border-gray-300 p-2">Intensity</th>
                  </tr>
                </thead>
                <tbody>
                  {rec.recommendedSports.map((sport, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 p-2">{sport.name || "N/A"}</td>
                      <td className="border border-gray-300 p-2">{sport.duration || "N/A"}</td>
                      <td className="border border-gray-300 p-2">{sport.frequency || "N/A"}</td>
                      <td className="border border-gray-300 p-2">{sport.intensity || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {rec.notes && (
              <p className="text-sm bg-white dark:bg-gray-900 p-3 border border-gray-300 rounded">
                <strong>Notes:</strong> {rec.notes}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
