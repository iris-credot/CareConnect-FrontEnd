import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const FoodRecommendationSchema = z.object({
  patient: z.string().min(1, "Patient is required"),
  recommendedFoods: z
    .array(
      z.object({
        name: z.string().min(1, "Food name is required"),
        quantity: z.string().optional(),
        timeOfDay: z.string().optional(),
      })
    )
    .min(1, "At least one food item is required"),
  notes: z.string().optional(),
});

export default function FoodRecommendationForm() {

  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FoodRecommendationSchema),
    defaultValues: {
      patient: "",
      recommendedFoods: [{ name: "", quantity: "", timeOfDay: "" }],
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recommendedFoods",
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
        "https://careconnect-api-v2kw.onrender.com/api/foods/create",
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
      console.error("Failed to create food recommendation:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl space-y-8 dark:bg-gray-800"
    >
      <h2 className="text-3xl font-bold text-blue-500">🍎 Food Recommendation</h2>

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

      {/* Recommended Foods */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold border-b pb-1 text-gray-700 dark:text-white">
          Recommended Foods
        </h3>

        {fields.map((item, i) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border relative"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Food Name</label>
              <input
                type="text"
                {...register(`recommendedFoods.${i}.name`)}
                placeholder="e.g. Apple"
                className="w-full border p-2 rounded-lg mt-2"
                disabled={isSubmitting}
              />
              {errors.recommendedFoods?.[i]?.name && (
                <p className="text-red-500 text-sm">
                  {errors.recommendedFoods[i].name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="text"
                {...register(`recommendedFoods.${i}.quantity`)}
                placeholder="e.g. 2 pieces"
                className="w-full border p-2 rounded-lg mt-2"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time of Day</label>
              <input
                type="text"
                {...register(`recommendedFoods.${i}.timeOfDay`)}
                placeholder="e.g. Morning"
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
          onClick={() => append({ name: "", quantity: "", timeOfDay: "" })}
          className="flex items-center text-blue-600 hover:underline text-sm font-medium"
          disabled={isSubmitting}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Another Food
        </button>
      </div>

      {/* Notes */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
          Additional Notes
        </label>
        <textarea
          {...register("notes")}
          placeholder="e.g. Avoid sugar in the evening..."
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
