import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/icon.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useDocumentTitle from "../customHooks/documentTitle";
// Zod schema
const schema = z
  .object({
    email: z.string().email("Enter a valid email address"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.newPassword === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export default function ResetPassword() {
  useDocumentTitle("Reset-Password");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Reset Data:", data);
    alert("Your password has been reset!");
    reset();
  };

  return (
    <div className="bg-[#f3f5ff] flex items-center justify-center w-screen min-h-screen p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl flex flex-col md:flex-row p-6 gap-8">
        {/* Left Panel */}
        <div className="md:w-1/2 w-full flex flex-col bg-slate-100 rounded-md p-6 justify-center items-center">
          <div className="mb-6">
            <img src={Icon} alt="CareConnect Logo" className="w-28 h-28" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
          <p className="text-sm text-center mt-4 text-gray-600 px-4">
            Enter your email and set a new password to regain access.
          </p>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 w-full flex flex-col justify-center">
          <h2 className="flex justify-center items-center text-2xl font-bold mb-5">
            Create New Password
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
          >
            <input
              type="email"
              {...register("email")}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              type="password"
              {...register("newPassword")}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="New Password"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}

            <input
              type="password"
              {...register("confirm")}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm Password"
            />
            {errors.confirm && (
              <p className="text-red-500 text-sm">{errors.confirm.message}</p>
            )}

            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => navigate("/")}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
