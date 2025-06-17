import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const appointmentSchema = z.object({
  patient: z.string().min(1, "Patient is required"),
  doctor: z.string().min(1, "Doctor is required"),
  date: z.string().min(1, "Date is required"),
  timeSlot: z.string().min(1, "Time slot is required"),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

export default function CreateAppointmentDoctor() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(appointmentSchema),
  });

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorName, setDoctorName] = useState("");
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
          toast.error("Authentication error");
          return;
        }

        // Set doctor ID and name from logged-in user
        setDoctorId(user._id);
        setDoctorName(`${user.firstName} ${user.lastName}`);
        setValue("doctor", user._id); // Set value for hidden input

        const patientsRes = await axios.get(
          "https://careconnect-api-v2kw.onrender.com/api/patient/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPatients(patientsRes.data.patients || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load form data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      await axios.post(
        "https://careconnect-api-v2kw.onrender.com/api/appointment/create",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Appointment created successfully!");
      setTimeout(() => {
        navigate(-1); // Go to previous page
      }, 1500);
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error(
        error.response?.data?.message || "Failed to create appointment"
      );
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow-lg dark:bg-gray-700 dark:text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-500">
        Create New Appointment
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Patient</label>
          <select
            {...register("patient")}
            className="w-full border p-2 rounded dark:text-gray-800"
            defaultValue=""
          >
            <option value="">-- Select patient --</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.user?.firstName} {patient.user?.lastName}
              </option>
            ))}
          </select>
          {errors.patient && (
            <p className="text-red-500 text-sm">{errors.patient.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Doctor</label>
          <input
            type="text"
            value={doctorName}
            disabled
            className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-600 dark:text-white"
          />
          <input
            type="hidden"
            {...register("doctor")}
            value={doctorId}
          />
          {errors.doctor && (
            <p className="text-red-500 text-sm">{errors.doctor.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full border p-2 rounded dark:text-gray-800"
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Time Slot</label>
          <input
            type="text"
            {...register("timeSlot")}
            placeholder="e.g. 10:00 AM - 10:30 AM"
            className="w-full border p-2 rounded dark:text-gray-800"
          />
          {errors.timeSlot && (
            <p className="text-red-500 text-sm">{errors.timeSlot.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Reason</label>
          <textarea
            {...register("reason")}
            rows="3"
            className="w-full border p-2 rounded dark:text-gray-800"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Notes</label>
          <textarea
            {...register("notes")}
            rows="2"
            className="w-full border p-2 rounded dark:text-gray-800"
          />
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Appointment
          </button>
        </div>
      </form>
    </div>
  );
}
