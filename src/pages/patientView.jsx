import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDocumentTitle from "../customHooks/documentTitle";

export default function PatientsDetails() {
  useDocumentTitle("Patients-View");

  const { id } = useParams();
  console.log("Fetched patient ID from URL:", id);

  const [patient, setPatient] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper to safely display values or "N/A"


  // Helper to format date or show "N/A"
  const formatDate = (dateStr, options = {}) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date)) return "N/A";
    return date.toLocaleDateString(undefined, options);
  };

  // Helper to format date/time or show "N/A"
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date)) return "N/A";
    return date.toLocaleString();
  };

useEffect(() => {
  const fetchPatient = async () => {
    setLoading(true); // Start loading early
    setError(""); // Reset previous errors

    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (!token || !userStr) {
        throw new Error("Missing token or user info.");
      }

      const loggedInUser = JSON.parse(userStr);
      const userId = loggedInUser._id;

      // Fetch patient
      const patientRes = await fetch(
        `https://careconnect-api-v2kw.onrender.com/api/patient/getPatient/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const patientData = await patientRes.json();
      console.log("Patient data raw:", patientData);

      if (!patientRes.ok || !patientData.patient) {
        throw new Error(patientData.message || "Failed to fetch patient data.");
      }

      setPatient(patientData.patient);

      // Fetch user
      const userRes = await fetch(
        `https://careconnect-api-v2kw.onrender.com/api/user/getOne/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userData = await userRes.json();
      console.log("User data raw:", userData);

      if (!userRes.ok || !userData.user) {
        throw new Error(userData.message || "Failed to fetch user data.");
      }

      setUser(userData.user);

    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  fetchPatient();
}, [id]);




  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  if (!patient || !user) return <div className="text-center mt-10">No data found</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 dark:bg-black">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6 space-y-6 dark:bg-black">
        <h2 className="text-3xl font-bold text-start text-gray-800 dark:text-white">Medical Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-white mt-10">
          <p><strong>Blood Type:</strong> {patient.bloodType ?? "N/A"}</p>
          <p><strong>Weight:</strong> {patient.weight} kg</p>
          <p><strong>Height:</strong> {patient.height} m</p>
          <p>
            <strong>Emergency Contact:</strong>{" "}
            {patient.emergencyContact
              ? `${patient.emergencyContact.name} (${patient.emergencyContact.relation}) - ${patient.emergencyContact.phone}`
              : "N/A"}
          </p>
          <p>
            <strong>Insurance:</strong>{" "}
            {patient.insurance
              ? `${patient.insurance.provider} (Policy #: ${patient.insurance.policyNumber})`
              : "N/A"}
          </p>
          <p><strong>Created At:</strong> {formatDateTime(patient.createdAt)}</p>
        </div>

        <h2 className="text-2xl font-bold text-start text-gray-800 pt-4 border-t dark:text-white">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-white mt-10">
          <p><strong>Name:</strong>  {patient.user ? `${patient.user.firstName} ${patient.user.lastName}` : "N/A"}</p>
           <p><strong>Username:</strong> {patient.user?.username ?? "N/A"}</p>
  <p><strong>Email:</strong> {patient.user?.email ?? "N/A"}</p>
  <p><strong>Phone:</strong> {patient.user?.phoneNumber ?? "N/A"}</p>
  <p><strong>Address:</strong> {patient.user?.address ?? "N/A"}</p>
  <p><strong>Gender:</strong> {patient.user?.gender ?? "N/A"}</p>
  <p><strong>Date of Birth:</strong> {patient.user ? formatDate(patient.user.dateOfBirth) : "N/A"}</p>
  <p><strong>Bio:</strong> {patient.user?.bio ?? "N/A"}</p>
         
        </div>
      </div>
    </div>
  );
}
