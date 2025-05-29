import Loading from "./loadingPage";

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

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [health, setHealth] = useState([]);
  const [reports, setReports] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setHealth(healthRes.data.complaints || []);
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
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#ffffff',
        generateLabels: function (chart) {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            return data.labels.map((label, i) => {
              const backgroundColor = data.datasets[0].backgroundColor[i];
              return {
                text: `${label} (${backgroundColor === "#2563eb" ? "Blue" : "Orange"})`,
                fillStyle: backgroundColor,
                strokeStyle: backgroundColor,
                lineWidth: 1,
              };
            });
          }
          return [];
        },
      },
    },
  },
};

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

  const appointmentDays = Object.keys(getAppointmentsPerDay());
  const appointmentCounts = Object.values(getAppointmentsPerDay());

  const healthsByStatus = health.reduce((acc, comp) => {
    const status = comp.status || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const doctorCount = doctors.length;
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
    labels: Object.keys(healthsByStatus),
    datasets: [
      {
        label: "Health Issues",
        data: Object.values(healthsByStatus),
        backgroundColor: ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#6b7280"],
      },
    ],
  };

  const doctorPatientChartData = {
    labels: ["Doctors", "Patients"],
    datasets: [
      {
        label: "Count",
        data: [doctorCount, patientCount],
        backgroundColor: ["#2563eb", "#f97316"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  if (loading)
    return (
    
        <Loading/>
    
    );

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">🚀 Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="👥 Patients" count={patientCount} onClick={() => navigate("/admin/patients")} />
        <Card title="🩺 Doctors" count={doctorCount} onClick={() => navigate("/admin/doctors")} />
        <Card title="📅 Appointments" count={appointments.length} subtitle={`Avg: ${avgAppointments}/day`} />
        <Card title="🧠 Health" count={health.length} subtitle={`Top: ${mostCommonHealthStatus}`} />
        <Card title="🥗 Nutrition" count={reports.length} />
        <Card title="🏃 Sports" count={feedbacks.length} subtitle={`+${feedbacks.slice(-1)[0]?.rating || 0} recent`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 h-[300px]">
          <h2 className="text-xl font-semibold mb-4">📈 Appointments (Last 7 Days)</h2>
          <Line data={appointmentsChartData} options={chartOptions} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 h-[300px]">
          <h2 className="text-xl font-semibold mb-4">📊 Health by Status</h2>
          <Bar data={healthsChartData} options={chartOptions} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 h-[400px] lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">👨‍⚕️ Doctors vs 👩‍🦱 Patients</h2>
          <Doughnut data={doctorPatientChartData}  options={doughnutOptions} />
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
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
  );
}
