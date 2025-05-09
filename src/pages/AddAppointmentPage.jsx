import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useDocumentTitle from "../customHooks/documentTitle";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for validation
const appointmentSchema = z.object({
  patient: z.string().min(1, "Patient is required"),
  doctor: z.string().min(1, "Doctor is required"),
  date: z.string().min(1, "Date is required"),
  timeSlot: z.string().min(1, "Time slot is required"),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

export default function CreateAppointment() {
  useDocumentTitle("New Appointment");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = (data) => {
    console.log("Valid appointment data:", data);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow-lg dark:bg-gray-700 dark:text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-500">Create New Appointment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

       
        <div>
          <label className="block font-semibold mb-1 ">Patient</label>
          <select
            {...register("patient")}
            className="w-full border p-2 rounded dark:text-gray-800"
          >
            <option value="">-- Select patient --</option>
            <option value="1">John Doe</option>
            <option value="2">Jane Smith</option>
          </select>
          {errors.patient && <p className="text-red-500 text-sm">{errors.patient.message}</p>}
        </div>

       
        <div>
          <label className="block font-semibold mb-1">Doctor</label>
          <select
            {...register("doctor")}
            className="w-full border p-2 rounded dark:text-gray-800"
          >
            <option value="">-- Select doctor --</option>
            <option value="1">Dr. Adams</option>
            <option value="2">Dr. Baker</option>
          </select>
          {errors.doctor && <p className="text-red-500 text-sm">{errors.doctor.message}</p>}
        </div>

       
        <div>
          <label className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full border p-2 rounded dark:text-gray-800"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        
        <div>
          <label className="block font-semibold mb-1">Time Slot</label>
          <input
            type="text"
            {...register("timeSlot")}
            placeholder="e.g. 10:00 AM - 10:30 AM"
            className="w-full border p-2 rounded dark:text-gray-800"
          />
          {errors.timeSlot && <p className="text-red-500 text-sm">{errors.timeSlot.message}</p>}
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
