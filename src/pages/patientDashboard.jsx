
import Loading from "./loadingPage";

import React, { useEffect, useState } from "react";
import axios from "axios";

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

import { Bar, Line } from "react-chartjs-2";

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
export default function PatientDashboard(){
    
 const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [health, setHealth] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user info from localStorage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const doctorId = localStorage.getItem("userId"); // Assuming this is the doctor's ID string

  useEffect(() => {


    const fetchDoctorData = async () => {
      try {
        setLoading(true);

        const [patientsRes, appointmentsRes] = await Promise.all([
          // Fetch patients
          axios.get(
            `https://careconnect-api-v2kw.onrender.com/api/patient/getPatientByUser/${doctorId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),

          // Fetch appointments
          axios.get(
            `https://careconnect-api-v2kw.onrender.com/api/appointment/byUser/${doctorId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);

        setPatients(patientsRes.data.patients || []);
        setAppointments(appointmentsRes.data.appointments || []);
        setHealth([]); // No health API data available for now
      } catch (error) {
          if (error.response) {
    if (error.response.status === 404) {
      console.log('Patient not found');
      // Show friendly UI message
    } else if (error.response.status === 500) {
      console.log('Server error, try again later');
      // Show retry option or error message
    }}
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctorId, token, role, navigate]);

  // Prepare appointments count for last 7 days
  const getAppointmentsPerDay = () => {
    const counts = {};
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const dayKey = day.toISOString().split("T")[0];
      counts[dayKey] = 0;
    }

    appointments.forEach((appt) => {
      const date = appt.date.split("T")[0];
      if (Object.prototype.hasOwnProperty.call(counts, date)) {
        counts[date]++;
      }
    });

    return counts;
  };

  const appointmentCountsByDay = getAppointmentsPerDay();
  const appointmentDays = Object.keys(appointmentCountsByDay);
  const appointmentCounts = Object.values(appointmentCountsByDay);

  // Health data aggregation (empty for now)
  const healthsByStatus = health.reduce((acc, comp) => {
    const status = comp.status || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const patientCount = patients.length;
  const avgAppointments = (appointments.length / 7).toFixed(1);
  const mostCommonHealthStatus =
    Object.entries(healthsByStatus).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const appointmentsChartData = {
    labels: appointmentDays,
    datasets: [
      {
        label: "Appointments",
        data: appointmentCounts,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.4)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const healthsChartData = {
    labels: Object.keys(healthsByStatus).length
      ? Object.keys(healthsByStatus)
      : ["No data"],
    datasets: [
      {
        label: "Health Issues",
        data: Object.values(healthsByStatus).length
          ? Object.values(healthsByStatus)
          : [1],
        backgroundColor: ["#3b82f6"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">👨Patient Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card
          title="👥 My Patients"
          count={patientCount}
          onClick={() => navigate("/doctor/patients")}
        />
        <Card
          title="📅 My Appointments"
          count={appointments.length}
          subtitle={`Avg: ${avgAppointments}/day`}
          onClick={() => navigate("/doctor/appointments")}
        />
        <Card
          title="🧠 Patient Health Issues"
          count={health.length}
          subtitle={`Top: ${mostCommonHealthStatus}`}
          onClick={() => navigate("/doctor/health")}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 h-[300px]">
          <h2 className="text-xl font-semibold mb-4">📈 Appointments (Last 7 Days)</h2>
          <Line data={appointmentsChartData} options={chartOptions} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 h-[300px] lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">📊 Health by Status</h2>
          <Bar data={healthsChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

function Card({ title, count, subtitle = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center hover:shadow-lg transition"
    >
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold">{count}</p>
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      )}
    </div>
  );
}