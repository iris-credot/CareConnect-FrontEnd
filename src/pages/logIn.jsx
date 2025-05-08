import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/icon.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useDocumentTitle from "../customHooks/documentTitle";
const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  useDocumentTitle("Login");
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
    console.log("Login data:", data);
    alert("Form Submitted");
    reset();
  };

  return (
    <div className="md:bg-[#f3f5ff] h-screen overflow-hidden flex md:items-center md:justify-center w-screen md:p-0 p-6">
      <div className="w-full max-w-4xl h-full md:h-auto bg-white rounded-xl flex md:flex-row flex-col p-2 md:gap-1 gap-14">
        {/* Left Side */}
        <div className="md:w-1/2 w-full flex flex-col p-2 md:bg-slate-100 rounded-md md:h-full h-[20%]">
          <div className="w-full bg-white h-2/4 flex justify-center items-center">
            <img src={Icon} alt="Logo" />
          </div>
          <div className="w-full bg-white h-1/4 flex flex-col justify-center items-center gap-4">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800">Welcome to CareConnect</h2>
          </div>
          <div className="w-full bg-white h-1/4">
            <p className="ml-4 md:ml-6 p-4 text-xs text-center md:text-left">
              Your health. Our priority. Thousands of doctors ready to help!
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 w-full flex justify-center md:justify-start h-[80%]">
          <div className="p-6 w-full h-full flex flex-col max-w-md overflow-auto md:overflow-visible">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-start gap-2">
              <div className="flex justify-center md:justify-start w-full">
                <h3 className="text-2xl font-semibold text-blue-500 md:mb-2 mb-5">Sign In</h3>
              </div>

              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                {...register("email")}
                type="email"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-md"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input
                {...register("password")}
                type="password"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-md"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="accent-blue-500" />
                <label htmlFor="remember" className="text-sm text-gray-600">Show Password</label>
              </div>

              <button
                type="submit"
                className="mt-10 md:mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 w-full max-w-md" 
                onClick={() => navigate("/dashboard")}
              >
                Log In
              </button>
            </form>

            <div className="w-full mt-6 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-sm text-gray-600 gap-2 max-w-md">
  <div className="flex gap-1">
    <p>New User?</p>
    <p className="text-blue-500 hover:underline cursor-pointer"onClick={() => navigate("/signup")}>Signup</p>
  </div>
  <p className="text-blue-500 hover:underline cursor-pointer"onClick={() => navigate("/forgotpass")}>Forgot your password?</p>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}
