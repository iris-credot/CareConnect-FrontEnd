import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useDocumentTitle from "../customHooks/documentTitle";

// Zod schema
const schema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.newPassword === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export default function UpdatePassword() {
  useDocumentTitle("Update Password");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
   alert (data)// TODO: Send password update request to your backend
    reset();
  };

  return (
    <div className="flex items-center justify-center   ">
      <div className="w-full max-w-xl bg-white rounded-xl flex flex-col p-6 gap-6 mt-20 dark:bg-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Update Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="password"
            {...register("currentPassword")}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Current Password"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>
          )}

          <input
            type="password"
            {...register("newPassword")}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="New Password"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}

          <input
            type="password"
            {...register("confirm")}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Confirm New Password"
          />
          {errors.confirm && (
            <p className="text-red-500 text-sm">{errors.confirm.message}</p>
          )}

          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
