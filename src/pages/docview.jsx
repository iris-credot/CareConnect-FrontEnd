import useDocumentTitle from "../customHooks/documentTitle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DoctorsDetails() {
  useDocumentTitle("Doctors-View");

  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date) ? "N/A" : date.toLocaleDateString();
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date) ? "N/A" : date.toLocaleString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Missing authentication token");

        // Fetch doctor
        const doctorRes = await fetch(
          `https://careconnect-api-v2kw.onrender.com/api/doctor/getdoctor/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!doctorRes.ok) throw new Error("Failed to fetch doctor");

        const doctorData = await doctorRes.json();
        if (!doctorData.doctor) throw new Error("Doctor not found");

        setDoctor(doctorData.doctor);

        if (!doctorData.doctor.user) throw new Error("Doctor has no user linked");

        // ✅ Assign the user directly from the doctor object
        setUser(doctorData.doctor.user);

        console.log("Doctor:", doctorData.doctor);
        console.log("User (from doctor.user):", doctorData.doctor.user);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  if (!doctor) {
    return <div className="text-center mt-10">Doctor not found.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 dark:bg-black">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6 space-y-6 dark:bg-black">
        <h2 className="text-3xl font-bold text-start text-gray-800 dark:text-white">
          Doctor Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-white mt-10">
          <p><strong>Specialization:</strong> {doctor.specialization ?? "N/A"}</p>
          <p><strong>Hospital:</strong> {doctor.hospital ?? "N/A"}</p>
          <p><strong>License Number:</strong> {doctor.licenseNumber ?? "N/A"}</p>
          <p><strong>Years of Experience:</strong> {doctor.yearsOfExperience ?? "N/A"}</p>
          <p><strong>Created At:</strong> {formatDateTime(doctor.createdAt)}</p>
        </div>

        <h2 className="text-2xl font-bold text-start text-gray-800 pt-4 border-t dark:text-white">
          Personal Information
        </h2>

        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-white mt-10">
            <p><strong>Name:</strong> {`${user.firstName} ${user.lastName}`}</p>
            <p><strong>Username:</strong> {user.username ?? "N/A"}</p>
            <p><strong>Email:</strong> {user.email ?? "N/A"}</p>
            <p><strong>Phone:</strong> {user.phoneNumber ?? "N/A"}</p>
            <p><strong>Address:</strong> {user.address ?? "N/A"}</p>
            <p><strong>Gender:</strong> {user.gender ?? "N/A"}</p>
            <p><strong>Date of Birth:</strong> {formatDate(user.dateOfBirth)}</p>
            <p><strong>Bio:</strong> {user.bio ?? "N/A"}</p>
          </div>
        ) : (
          <div className="text-gray-500">No user information found.</div>
        )}
      </div>
    </div>
  );
}
