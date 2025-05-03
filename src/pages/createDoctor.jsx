import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Zod schema
const schema = z.object({
  licenseNumber: z.string().min(1, "License Number is required"),
  specialization: z.string().min(1, "Specialization is required"),
  yearsOfExperience: z
    .number({ invalid_type_error: "Must be a number" })
    .optional()
    .refine(val => val === undefined || val >= 0, {
      message: "Years of experience must be a positive number",
    }),
  hospital: z.string().optional(),
 
});

export default function CreateDoctor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      availableSlots: [{ date: "", from: "", to: "" }],
    },
  });

  

  const onSubmit = (data) => {
    console.log("Doctor data submitted:", data);
    alert("Doctor created successfully!");
    reset();
  };

  return (
    <div className="bg-[#f3f5ff] flex items-center justify-center w-screen min-h-screen p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Doctor Details Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* License Number */}
          <div>
            <input
              {...register("licenseNumber")}
              placeholder="License Number"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.licenseNumber && (
              <p className="text-red-500 text-sm">{errors.licenseNumber.message}</p>
            )}
          </div>

          {/* Specialization */}
          <div>
            <input
              {...register("specialization")}
              placeholder="Specialization"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.specialization && (
              <p className="text-red-500 text-sm">{errors.specialization.message}</p>
            )}
          </div>

          {/* Years of Experience */}
          <div>
            <input
              type="number"
              {...register("yearsOfExperience", { valueAsNumber: true })}
              placeholder="Years of Experience"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.yearsOfExperience && (
              <p className="text-red-500 text-sm">{errors.yearsOfExperience.message}</p>
            )}
          </div>

          {/* Hospital */}
          <div>
            <input
              {...register("hospital")}
              placeholder="Hospital"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.hospital && (
              <p className="text-red-500 text-sm">{errors.hospital.message}</p>
            )}
          </div>

          {/* Available Slots */}
         

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Submit Info
          </button>
        </form>
      </div>
    </div>
  );
}
