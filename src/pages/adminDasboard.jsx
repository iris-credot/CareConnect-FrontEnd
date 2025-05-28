import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const navigate = useNavigate();

  // States for data
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [reports, setReports] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    const fetchAllData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No authentication token found");
        return;
      }

      try {
        setLoading(true);
        const [
          patientsRes,
          doctorsRes,
          appointmentsRes,
          healthRes,
          foodsRes,
          sportsRes,
        ] = await Promise.all([
          axios.get("https://careconnect-api-v2kw.onrender.com/api/patient/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://careconnect-api-v2kw.onrender.com/api/doctor/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://careconnect-api-v2kw.onrender.com/api/appointment/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://careconnect-api-v2kw.onrender.com/api/health/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://careconnect-api-v2kw.onrender.com/api/foods/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://careconnect-api-v2kw.onrender.com/api/sports/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setPatients(patientsRes.data.patients || []);
        setDoctors(doctorsRes.data.doctors || []);
        setAppointments(appointmentsRes.data.appointments || []);
        setComplaints(healthRes.data.complaints || []);
        setReports(foodsRes.data.reports || []);
        setFeedbacks(sportsRes.data.feedbacks || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Prepare data for charts

  // 1. Appointments per day (last 7 days)
  const getAppointmentsPerDay = () => {
    const counts = {};
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const dayKey = day.toISOString().split("T")[0]; // YYYY-MM-DD
      counts[dayKey] = 0;
    }
    appointments.forEach((appt) => {
      const date = appt.date.split("T")[0]; // assuming ISO format
     if (Object.prototype.hasOwnProperty.call(counts, date)) {
        counts[date]++;
      }
    });
    return counts;
  };

  const appointmentDays = Object.keys(getAppointmentsPerDay());
  const appointmentCounts = Object.values(getAppointmentsPerDay());

  // 2. Complaints by status
  const complaintsByStatus = complaints.reduce((acc, comp) => {
    const status = comp.status || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // 3. Doctors vs Patients count
  const doctorCount = doctors.length;
  const patientCount = patients.length;

  // Chart Data Objects

  const appointmentsChartData = {
    labels: appointmentDays,
    datasets: [
      {
        label: "Appointments",
        data: appointmentCounts,
        borderColor: "rgba(59, 130, 246, 1)", // Tailwind blue-500
        backgroundColor: "rgba(59, 130, 246, 0.4)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const complaintsChartData = {
    labels: Object.keys(complaintsByStatus),
    datasets: [
      {
        label: "Complaints",
        data: Object.values(complaintsByStatus),
        backgroundColor: [
          "#3b82f6", // blue
          "#ef4444", // red
          "#f59e0b", // yellow
          "#10b981", // green
          "#6b7280", // gray
        ],
      },
    ],
  };

  const doctorPatientChartData = {
    labels: ["Doctors", "Patients"],
    datasets: [
      {
        label: "Count",
        data: [doctorCount, patientCount],
        backgroundColor: ["#2563eb", "#f97316"], // blue & orange
      },
    ],
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Loading dashboard data...
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Patients" count={patientCount} onClick={() => navigate("/admin/patients")} />
        <Card title="Doctors" count={doctorCount} onClick={() => navigate("/admin/doctors")} />
        <Card
          title="Appointments"
          count={appointments.length}
          onClick={() => navigate("/admin/appointments")}
        />
        <Card
          title="Health"
          count={complaints.length}
       
        />
        <Card title="Nutrition" count={reports.length} />
        <Card title="Sports" count={feedbacks.length}  />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded shadow p-4 dark:bg-gray-700">
          <h2 className="text-xl font-semibold mb-4">Appointments Last 7 Days</h2>
          <Line data={appointmentsChartData} />
        </div>

        <div className="bg-white rounded shadow p-4 dark:bg-gray-700">
          <h2 className="text-xl font-semibold mb-4">Health by Status</h2>
          <Bar data={complaintsChartData} />
        </div>

        <div className="bg-white rounded shadow p-4 dark:bg-gray-700 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Doctors vs Patients</h2>
          <Doughnut data={doctorPatientChartData} />
        </div>
      </div>
    </div>
  );
}

// Reusable summary card component
function Card({ title, count, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white dark:bg-gray-700 rounded shadow p-6 flex flex-col items-center justify-center hover:shadow-lg transition"
      title={`View ${title}`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
}
