import {  useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import useDocumentTitle from "../customHooks/documentTitle";
import { useNavigate } from "react-router-dom";

export default function FoodsSports() {
    const navigate=useNavigate();
  useDocumentTitle("Nutri-Sports");

  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    { _id: "p1", name: "John Doe" },
    { _id: "p2", name: "Jane Smith" }
  ];

  const recommendations = {
    p1: {
      food: [
        {
          _id: "f1",
          recommendedFoods: [
            { name: "Diabetic Plan", quantity: "1x daily", timeOfDay: "Morning" },
            { name: "Low Sugar Fruits", quantity: "2x", timeOfDay: "Evening" }
          ],
          notes: "Avoid sweet snacks."
        }
      ],
      sport: [
        {
          _id: "s1",
          recommendedSports: [
            { name: "Walking", duration: "30 mins", frequency: "Daily", intensity: "Low" }
          ],
          notes: "Maintain consistency."
        }
      ]
    },
    p2: {
      food: [
        {
          _id: "f2",
          recommendedFoods: [
            { name: "Weight Loss Plan", quantity: "2x daily", timeOfDay: "Afternoon" }
          ],
          notes: "Drink lots of water."
        }
      ],
      sport: [
        {
          _id: "s2",
          recommendedSports: [
            { name: "Yoga", duration: "1 hour", frequency: "3x week", intensity: "Moderate" }
          ],
          notes: "Focus on breathing."
        }
      ]
    }
  };

  const foodRecommendations = selectedPatient ? recommendations[selectedPatient._id].food : [];
  const sportRecommendations = selectedPatient ? recommendations[selectedPatient._id].sport : [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-800">
      {/* Title */}
      <div
  className={`transition-all duration-500 ease-in-out ${
    selectedPatient ? "mb-6" : "flex justify-center items-center min-h-screen"
  }`}
>
  <div className={`w-full max-w-md ${selectedPatient ? "" : "text-center"}`}>
    <h1 className="text-3xl font-bold text-blue-700 mb-2">
      Nutrition & Sports Planner
    </h1>
    <p className="text-gray-600 mb-4 dark:text-white">
      {selectedPatient ? "Viewing recommendations for selected patient" : "Select a patient to begin"}
    </p>

    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Select Patient</label>
    <select
      onChange={(e) => {
        const selectedId = e.target.value;
        const patient = patients.find((p) => p._id === selectedId);
        setSelectedPatient(patient || null);
      }}
      className="w-full p-3 border rounded shadow"
      defaultValue=""
    >
      <option value="" disabled>Select patient...</option>
      {patients.map((patient) => (
        <option key={patient._id} value={patient._id}>
          {patient.name}
        </option>
      ))}
    </select>
  </div>
</div>


      {/* Show recommendations after patient is selected */}
      {selectedPatient && (
        <>
          <h2 className="text-2xl font-bold mb-2 dark:text-white">Foods Recommendations for {selectedPatient.name}</h2>

        {foodRecommendations.map((rec) => (
  <div key={rec._id} className="bg-white rounded-lg shadow p-4 mb-6 border border-blue-400 dark:bg-gray-700 dark:text-white">
    <div className="grid grid-cols-5 font-semibold border-b pb-2">
      <span>#</span>
      <span>Food Name</span>
      <span>Quantity</span>
      <span>Time of Day</span>
      <span>Action</span> {/* Action column */}
    </div>
    {rec.recommendedFoods.map((food, i) => (
      <div key={i} className="grid grid-cols-5 py-2 border-b">
        <span>{i + 1}</span>
        <span>{food.name}</span>
        <span>{food.quantity}</span>
        <span>{food.timeOfDay}</span>
        <span className="flex gap-2 mt-3 "> {/* Center the actions */}
          <Pencil className="cursor-pointer text-blue-500" size={16} />
          <Trash2 className="cursor-pointer text-red-500" size={16} />
        </span>
      </div>
    ))}
    {rec.notes && <div className="mt-2 italic text-sm text-gray-600 dark:text-white">Notes: {rec.notes}</div>}
  </div>
))}
          <button className="bg-gray-200 px-4 py-1 rounded shadow mb-10"  onClick={() => navigate("/doctor/sportNutri/add-Food")}>Add Food Plan</button>

          <h2 className="text-2xl font-bold mb-2 dark:text-white">Sports Recommendations for {selectedPatient.name}</h2>

         {sportRecommendations.map((rec) => (
  <div key={rec._id} className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-300 dark:bg-gray-700 dark:text-white">
    <div className="grid grid-cols-6 font-semibold border-b pb-2">
      <span>#</span>
      <span>Sport</span>
      <span>Duration</span>
      <span>Frequency</span>
      <span>Intensity</span>
      <span>Action</span> {/* Action column */}
    </div>
    {rec.recommendedSports.map((sport, i) => (
      <div key={i} className="grid grid-cols-6 py-2 border-b">
        <span>{i + 1}</span>
        <span>{sport.name}</span>
        <span>{sport.duration}</span>
        <span>{sport.frequency}</span>
        <span>{sport.intensity}</span>
        <span className="flex gap-2 mt-3 "> {/* Center the actions */}
          <Pencil className="cursor-pointer text-blue-500" size={16} />
          <Trash2 className="cursor-pointer text-red-500" size={16} />
        </span>
      </div>
    ))}
    {rec.notes && <div className="mt-2 italic text-sm text-gray-600 dark:text-white">Notes: {rec.notes}</div>}
  </div>
))}
          <button className="bg-gray-200 px-4 py-1 rounded shadow"  onClick={() => navigate("/doctor/sportNutri/add-Sport")}>Add Sports Plan</button>
        </>
      )}
    </div>
  );
}
