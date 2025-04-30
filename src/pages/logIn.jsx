import React from "react";
import Icon from '../assets/icon.png'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export default function Login(){
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
    alert("Form Submitted")
  };

    return(
        <div className="bg-[#f3f5ff]  flex items-center w-screen m-0 p-0 justify-center min-h-screen ">
          <div className="w-full max-w-3xl h-[450px] bg-white rounded-xl flex flex-row p-2 gap-1  ">
        <div className="w-1/2 flex flex-col p-2  bg-slate-100 rounded-md h-full">
        <div className="w-full bg-white h-2/6 flex justify-center items-center">
            <img src={Icon} alt="" />
        </div>
        <div className="w-full bg-white h-3/6 flex flex-col justify-center items-center gap-4 ">
            <div className="">
                <h2 className="text-3xl ">Welcome to</h2>
            </div>
            <div className="ml-6" >
                <h2 className="text-2xl ">CareConnect</h2>
            </div>
        </div>
        <div className="w-full bg-white h-1/6">
            <p className="p-4 text-xs"> Your health. Our priority. Thousands of doctors ready to help!</p>
        </div>
        </div>
        <div className="w-1/2">
        <div className="p-6 w-full h-full flex flex-col overflow-auto">
  <form onSubmit={handleSubmit(onSubmit)} className="w-full  flex flex-col items-start justify-start gap-4">
    <h3 className="text-2xl font-semibold text-blue-500 mb-2">Sign In</h3>

    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
    <input
      {...register("email")}
      type="email"
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-md"
      placeholder="Enter your email"
    />
    {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
    <input
    {...register("password")}
      type="password"
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-md"
      placeholder="Enter your password"
    />
     {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

    <div className="flex  gap-2">
      <input type="checkbox"  className="accent-blue-500 " />
      <label htmlFor="remember" className="text-sm text-gray-600">Remember Me</label>
    </div>

    <button
      type="submit"
      className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 w-full max-w-md"
    >
      LOG IN
    </button>
  </form>

  <div className="w-full mt-6 flex justify-between text-sm text-gray-600 max-w-md">
    <div className="flex gap-1">
      <p>New User?</p>
      <p className="text-blue-500 hover:underline cursor-pointer">Signup</p>
    </div>
    <p className="text-blue-500 hover:underline cursor-pointer">Forgot your password?</p>
  </div>
</div>

        </div>
          </div>
        </div>
    )
}