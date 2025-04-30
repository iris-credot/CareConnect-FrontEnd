import React from "react";
import Icon from '../assets/icon.png'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const model =z.object({
  firstname:z.string().min(3,"First Name must be atleast 3 characters"),
  lastname:z.string().min(4,"Last Name must be atleast 4 characters"),
  username:z.string().min(4,"Username must have atleast 4 characters"),
  gender:z.enum(["male","female"]),
  email:z.string().min(1,"Email is required").email("Invalid Email"),
  password:z.string().min(6,"Password must be atleast 6 characters")
});
export default function SignUp(){
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(model),
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
    alert("Form Submitted")
    reset(); 
  };
    return(

        <div className="bg-[#f3f5ff] h-screen overflow-hidden flex items-center  justify-center w-screen ">
          <div className="w-full max-w-4xl h-[650px] bg-white rounded-xl flex flex-row p-2 gap-1  ">
        <div className="w-1/2 flex flex-col p-2  bg-slate-100 rounded-md h-full">
        <div className="w-full bg-white h-2/6 flex justify-center items-center">
            <img src={Icon} alt="" />
        </div>
        <div className="w-full bg-white h-3/6 flex flex-col justify-center items-center gap-4">
            <div className="">
                <h2 className="text-3xl ">Welcome to</h2>
            </div>
            <div >
                <h2 className="text-2xl ">CareConnect</h2>
            </div>
        </div>
        <div className="w-full bg-white h-1/6">
            <p className="ml-6 p-4 text-xs"> Your health. Our priority. Thousands of doctors ready to help!</p>
        </div>
        </div>
        <div className="w-1/2">
        <div className="p-6 w-full h-full flex flex-col overflow-auto">
  <form onSubmit={handleSubmit(onSubmit)} className="w-full  flex flex-col items-start justify-start gap-2">
    <h3 className="text-2xl font-semibold text-blue-500 mb-2">Create Account</h3>

    <label htmlFor="firstname" className="text-sm font-medium text-gray-700">First Name</label>
    <input
    {...register("firstname")}
      type="firstname"
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-md"
      placeholder="Enter your first name"
    />
     {errors.firstname && (
                <p className="text-red-500 text-sm">{errors.firstname.message}</p>
              )}

    <label htmlFor="lastname" className="text-sm font-medium text-gray-700">Last Name</label>
    <input
    {...register("lastname")}
      type="lastname"
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-md"
      placeholder="Enter your last name"
    />
     {errors.lastname && (
                <p className="text-red-500 text-sm">{errors.lastname.message}</p>
              )}
    <div className="flex w-full gap-2">
      <div className="flex flex-col w-2/3 max-w-md gap-2 ">
    <label htmlFor="username" className="text-gray-700 font-medium text-sm">Username</label>
    <input {...register("username")} type="username" placeholder="Enter your username"  className="p-2 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
    {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
    </div>
    <div className="flex flex-col w-1/3 max-w-md gap-2">
    <label htmlFor="gender" className="text-gray-700 font-medium text-sm">Gender</label>
    <select
    {...register("gender")}
    name="gender"
    className="h-[42px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-700"
  >
    <option value="">Select gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
  {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
    </div>
     </div>
    <label htmlFor="email"  className="text-sm font-medium text-gray-700">Email</label>
    <input {...register("email")} type="email" placeholder="Enter your email"  className="border border-gray-300 p-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
    {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
    <input {...register("password")} type="password"  className="border border-gray-300 p-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your password" />
    {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}


    <div className="flex items-center gap-2">
      <input type="checkbox" id="remember" className="accent-blue-500 " />
      <label htmlFor="remember" className="text-sm text-gray-600">Show Password</label>
    </div>

    <button
      type="submit"
      className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 w-full max-w-md"
    >
      Create an account
    </button>
  </form>

  <div className="w-full mt-6  text-sm text-gray-600 max-w-md">
    <div className="flex gap-1">
      <p>Already have an account?</p>
      <p className="text-blue-500 hover:underline cursor-pointer">Signup</p>
    </div>
  </div>
</div>

        </div>
          </div>
        </div>
    )
}