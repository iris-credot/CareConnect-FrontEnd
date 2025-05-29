import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import useDocumentTitle from "../customHooks/documentTitle";
import { useNavigate } from "react-router-dom";

export default function FoodsSports() {
  const navigate = useNavigate();
  useDocumentTitle("Nutri-Sports");

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [foodRecommendations, setFoodRecommendations] = useState([]);
  const [sportRecommendations, setSportRecommendations] = useState([]);

  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please login.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          "https://careconnect-api-v2kw.onrender.com/api/patient/all",
          {
            headers: getHeaders(),
          }
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log("Fetched patients:", data);
        setPatients(Array.isArray(data.patients) ? data.patients : []);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

useEffect(() => {
  const fetchFoods = async () => {
    if (!selectedPatient) {
      setFoodRecommendations([]);
      return;
    }

    try {
      const res = await fetch(
        `https://careconnect-api-v2kw.onrender.com/api/foods/patient/${selectedPatient._id}`,
        { headers: getHeaders() }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      console.log("Fetched food recommendations:", data);
      setFoodRecommendations(Array.isArray(data.recommendations) ? data.recommendations : []);
    } catch (err) {
      console.error("Error fetching food recommendations:", err);
      setFoodRecommendations([]);
    }
  };

  fetchFoods();
}, [selectedPatient]);

// Fetch food recommendations when selectedPatient changes


// Fetch sport recommendations when selectedPatient changes
useEffect(() => {
  const fetchSports = async () => {
    if (!selectedPatient) return;

    try {
      const res = await fetch(
        `https://careconnect-api-v2kw.onrender.com/api/sports/patient/${selectedPatient._id}`,
        { headers: getHeaders() }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      console.log("Fetched sport recommendations:", data);
      setSportRecommendations(Array.isArray(data.recommendations) ? data.recommendations : []);
    } catch (err) {
      console.error("Error fetching sport recommendations:", err);
      setSportRecommendations([]);
    }
  };

  fetchSports();
}, [selectedPatient]);


  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-800">
      <div
        className={`transition-all duration-500 ease-in-out ${
          selectedPatient
            ? "mb-6"
            : "flex justify-center items-center min-h-screen"
        }`}
      >
        <div className={`w-full max-w-md ${selectedPatient ? "" : "text-center"}`}>
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            Nutrition & Sports Planner
          </h1>
          <p className="text-gray-600 mb-4 dark:text-white">
            {selectedPatient
              ? "Viewing recommendations for selected patient"
              : "Select a patient to begin"}
          </p>

          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
            Select Patient
          </label>

          {loading ? (
            <div>Loading patients...</div>
          ) : (
            <select
              onChange={(e) => {
                const selectedId = e.target.value;
                const patient = patients.find((p) => p._id === selectedId);
                setSelectedPatient(patient || null);
              }}
              className="w-full p-3 border rounded shadow text-gray-700 dark:text-white"
              defaultValue=""
            >
              <option value="" disabled className="text-gray-700 dark:text-white">
                Select patient...
              </option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.user?.firstName || "Unnamed"} {patient.user?.lastName || "Unnamed"}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {selectedPatient && (
        <>
          {/* Food Recommendations */}
          <h2 className="text-2xl font-bold mb-2 dark:text-white">
            Foods Recommendations for {selectedPatient.user?.firstName || "Unnamed"}{" "}
            {selectedPatient.user?.lastName || "Unnamed"}
          </h2>

          {foodRecommendations.length === 0 && (
            <p className="mb-6 text-gray-600 dark:text-white">No food recommendations found.</p>
          )}

          {foodRecommendations.map((rec) => (
            <div
              key={rec._id}
              className="bg-white rounded-lg shadow p-4 mb-6 border border-blue-400 dark:bg-gray-700 dark:text-white"
            >
              <div className="grid grid-cols-5 font-semibold border-b pb-2">
                <span>#</span>
                <span>Food Name</span>
                <span>Quantity</span>
                <span>Time of Day</span>
               
              </div>
              {rec.recommendedFoods.map((food, i) => (
                <div key={i} className="grid grid-cols-5 py-2 border-b">
                  <span>{i + 1}</span>
                  <span>{food.name}</span>
                  <span>{food.quantity}</span>
                  <span>{food.timeOfDay}</span>

                </div>
              ))}
              {rec.notes && (
                <div className="mt-2 italic text-sm text-gray-600 dark:text-white">
                  Notes: {rec.notes}
                </div>
              )}
            </div>
          ))}

          <button
            className="bg-gray-200 px-4 py-1 rounded shadow mb-10"
            onClick={() => navigate("/doctor/sportNutri/add-Food")}
          >
            Add Food Plan
          </button>

          {/* Sports Recommendations */}
          <h2 className="text-2xl font-bold mb-2 dark:text-white">
            Sports Recommendations for {selectedPatient.user?.firstName || "Unnamed"}{" "}
            {selectedPatient.user?.lastName || "Unnamed"}
          </h2>

          {sportRecommendations.length === 0 && (
            <p className="mb-6 text-gray-600 dark:text-white">No sports recommendations found.</p>
          )}

          {sportRecommendations.map((rec) => (
            <div
              key={rec._id}
              className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-300 dark:bg-gray-700 dark:text-white"
            >
              <div className="grid grid-cols-6 font-semibold border-b pb-2">
                <span>#</span>
                <span>Sport</span>
                <span>Duration</span>
                <span>Frequency</span>
                <span>Intensity</span>
              
              </div>
              {rec.recommendedSports.map((sport, i) => (
                <div key={i} className="grid grid-cols-6 py-2 border-b">
                  <span>{i + 1}</span>
                  <span>{sport.name}</span>
                  <span>{sport.duration}</span>
                  <span>{sport.frequency}</span>
                  <span>{sport.intensity}</span>

                </div>
              ))}
              {rec.notes && (
                <div className="mt-2 italic text-sm text-gray-600 dark:text-white">
                  Notes: {rec.notes}
                </div>
              )}
            </div>
          ))}

          <button
            className="bg-gray-200 px-4 py-1 rounded shadow"
            onClick={() => navigate("/doctor/sportNutri/add-Sport")}
          >
            Add Sports Plan
          </button>
        </>
      )}
    </div>
  );
}
