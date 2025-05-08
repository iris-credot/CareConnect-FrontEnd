import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useDocumentTitle from "../customHooks/documentTitle";
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
  useDocumentTitle("New Sport Category");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SportRecommendationSchema),
    defaultValues: {
      patient: "",
      recommendedSports: [{ name: "", duration: "", frequency: "" , intensity:""}],
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recommendedSports",
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl space-y-8"
    >
      <h2 className="text-3xl font-bold text-blue-500">🏃‍♂️ Sports Recommendation</h2>

      {/* Patient */}
      <div>
          <label className="block font-semibold mb-1">Patient</label>
          <select
            {...register("patient")}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select patient --</option>
            <option value="1">John Doe</option>
            <option value="2">Jane Smith</option>
          </select>
          {errors.patient && <p className="text-red-500 text-sm">{errors.patient.message}</p>}
        </div>

      {/* Recommended Foods */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold border-b pb-1 text-gray-700">Recommended Sports</h3>

        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border relative"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Sports Name</label>
              <input
                type="text"
                {...register(`recommendedSports.${index}.name`)}
                placeholder="e.g. Jogging, Yoga"
                className="w-full border p-2 rounded-lg mt-2"
              />
              {errors.recommendedSports?.[index]?.name && (
                <p className="text-red-500 text-sm">{errors.recommendedSports[index].name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                {...register(`recommendedSports.${index}.duration`)}
                placeholder="e.g. 20 minutes"
                className="w-full border p-2 rounded-lg mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Frequency</label>
              <input
                type="text"
                {...register(`recommendedSports.${index}.frequency`)}
                placeholder="e.g. 2 times a week"
                className="w-full border p-2 rounded-lg mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Intensity</label>
              <input
                type="text"
                {...register(`recommendedSports.${index}.intensity`)}
                placeholder="e.g. low/moderate/high"
                className="w-full border p-2 rounded-lg mt-2"
              />
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title="Remove"
            >
              <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ name: "", duration: "", frequency: "", intensity:"" })}
          className="flex items-center text-blue-600 hover:underline text-sm font-medium"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add another Exercise
        </button>
      </div>

      {/* Notes */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Additional Notes</label>
        <textarea
          {...register("notes")}
          placeholder="e.g. Helps with blood circulation..."
          rows={3}
          className="w-full border p-3 rounded-lg"
        />
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Submit Recommendation
        </button>
      </div>
    </form>
  );
}
