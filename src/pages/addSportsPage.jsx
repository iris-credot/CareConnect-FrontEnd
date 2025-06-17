import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const SportRecommendationSchema = z.object({
  patient: z.string().min(1, "Patient is required"),
  recommendedSports: z
    .array(
      z.object({
        name: z.string().min(1, "Sport name is required"),
        duration: z.string().optional(),
        frequency: z.string().optional(),
        intensity: z.string().optional(),
      })
    )
    .min(1, "At least one sport item is required"),
  notes: z.string().optional(),
});

export default function AddSport() {

  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SportRecommendationSchema),
    defaultValues: {
      patient: "",
      recommendedSports: [{ name: "", duration: "", frequency: "", intensity: "" }],
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recommendedSports",
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://careconnect-api-v2kw.onrender.com/api/patient/all",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { patients: arr } = await res.json();
        setPatients(Array.isArray(arr) ? arr : []);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://careconnect-api-v2kw.onrender.com/api/sports/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        const errBody = await res.json();
        throw new Error(errBody.message || res.statusText);
      }
      navigate(-1);
    } catch (err) {
      console.error("Failed to create sport recommendation:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl space-y-8 dark:bg-gray-800"
    >
      <h2 className="text-3xl font-bold text-blue-500">🏃‍♂️ Sports Recommendation</h2>

      {/* Patient */}
      {loading ? (
        <div>Loading patients…</div>
      ) : (
        <div>
          <label className="block font-semibold mb-1 dark:text-white">Patient</label>
          <select
            {...register("patient")}
            className="w-full border p-2 rounded"
            disabled={isSubmitting}
            defaultValue=""
          >
            <option value="" disabled>
              -- Select patient --
            </option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.user?.firstName} {p.user?.lastName}
              </option>
            ))}
          </select>
          {errors.patient && (
            <p className="text-red-500 text-sm">{errors.patient.message}</p>
          )}
        </div>
      )}

      {/* Recommended Sports */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold border-b pb-1 text-gray-700 dark:text-white">
          Recommended Sports
        </h3>

        {fields.map((item, i) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border relative"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Sport Name</label>
              <input
                type="text"
                {...register(`recommendedSports.${i}.name`)}
                placeholder="e.g. Jogging, Yoga"
                className="w-full border p-2 rounded-lg mt-2"
                disabled={isSubmitting}
              />
              {errors.recommendedSports?.[i]?.name && (
                <p className="text-red-500 text-sm">
                  {errors.recommendedSports[i].name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                {...register(`recommendedSports.${i}.duration`)}
                placeholder="e.g. 20 minutes"
                className="w-full border p-2 rounded-lg mt-2"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Frequency</label>
              <input
                type="text"
                {...register(`recommendedSports.${i}.frequency`)}
                placeholder="e.g. 2 times a week"
                className="w-full border p-2 rounded-lg mt-2"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Intensity</label>
              <input
                type="text"
                {...register(`recommendedSports.${i}.intensity`)}
                placeholder="e.g. low/moderate/high"
                className="w-full border p-2 rounded-lg mt-2"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ name: "", duration: "", frequency: "", intensity: "" })}
          className="flex items-center text-blue-600 hover:underline text-sm font-medium"
          disabled={isSubmitting}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Another Sport
        </button>
      </div>

      {/* Notes */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
          Additional Notes
        </label>
        <textarea
          {...register("notes")}
          placeholder="e.g. Helps with blood circulation..."
          rows={3}
          className="w-full border p-3 rounded-lg"
          disabled={isSubmitting}
        />
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Submitting…" : "Submit Recommendation"}
        </button>
      </div>
    </form>
  );
}
