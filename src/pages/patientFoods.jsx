import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PatientFoods() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPatientFoods() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          throw new Error("User not authenticated");
        }

        // Step 1: Get the patient ID by user ID
        const patientRes = await axios.get(
          `https://careconnect-api-v2kw.onrender.com/api/patient/getPatientByUser/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const patient = patientRes.data?.patients?.[0];
        console.log(patient._id);
        if (!patient?._id) {
          throw new Error("Patient not found.");
        }

        // Step 2: Fetch food recommendations using the patient ID
        const foodRes = await axios.get(
          `https://careconnect-api-v2kw.onrender.com/api/foods/patient/${patient._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
         let data = foodRes.data.recommendations || [];
  data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecommendations(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPatientFoods();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Recommended Foods</h1>

      {recommendations.length === 0 ? (
        <p className="text-center">No food recommendations found.</p>
      ) : (
        recommendations.map((rec, index) => (
          <div
            key={rec._id || index}
            className="mb-6 p-4 border rounded bg-gray-50 dark:bg-gray-800"
          >
            <h2 className="text-lg font-semibold mb-2">Recommendation {index + 1}</h2>

            <table className="w-full border border-gray-300 mb-3 text-sm">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="border border-gray-300 p-2 text-left">Name</th>
                  <th className="border border-gray-300 p-2 text-left">Quantity</th>
                  <th className="border border-gray-300 p-2 text-left">Time of Day</th>
                </tr>
              </thead>
              <tbody>
                {rec.recommendedFoods.map((food, i) => (
                  <tr key={i}>
                    <td className="border border-gray-300 p-2">{food.name}</td>
                    <td className="border border-gray-300 p-2">{food.quantity}</td>
                    <td className="border border-gray-300 p-2">{food.timeOfDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {rec.notes && (
              <div className="text-sm bg-white dark:bg-gray-900 p-3 border border-gray-300 rounded">
                <strong>Notes:</strong> {rec.notes}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
