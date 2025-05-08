import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/icon.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useDocumentTitle from "../customHooks/documentTitle";
// Zod schema for validation
const schema = z.object({
  code: z
    .string()
    .length(7, "Code must be exactly 7 digits") // Check for 7 digits
    .regex(/^\d{7}$/, "Code must only contain numbers"), // Check for only digits
});

export default function VerifyEmail() {
  useDocumentTitle("Verify-Email");
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", "", ""]); // State for the 7 input digits
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Verification Code Submitted:", data.code);
    alert("Code Verified!");
    reset();
    setCode(["", "", "", "", "", "", ""]); 
  };

 
  

  return (
    <div className="bg-[#f3f5ff] flex items-center justify-center w-screen min-h-screen p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl flex flex-col md:flex-row p-6 gap-8"> {/* Adjusted container width and padding */}
        {/* Left Panel */}
        <div className="md:w-1/2 w-full flex flex-col bg-slate-100 rounded-md p-6 justify-center items-center">
          <div className="mb-6">
            <img src={Icon} alt="CareConnect Logo" className="w-28 h-28" /> 
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Email Verification</h2> {/* Larger heading */}
          <p className="text-sm text-center mt-4 text-gray-600 px-4">
            Please enter the 7-digit code sent to your email address.
          </p>
        </div>

        {/* Right Panel (Form) */}
        <div className="md:w-1/2 w-full flex flex-col justify-center">
        <h2 className="flex justify-center items-center text-2xl font-bold mb-5">Enter the code.</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
          >
            <div className="flex  gap-4 w-full justify-center">
              {/* 7 Input Boxes for the Verification Code */}
              <div className="flex gap-4 w-full justify-center flex-wrap">
              {code.map((digit, index) => (
  <input
    key={index}
    type="text"
    maxLength="1"
    value={digit}
    onChange={(e) => {
      const val = e.target.value;
      if (!/^\d?$/.test(val)) return; // Only allow digits
      const newCode = [...code];
      newCode[index] = val;
      setCode(newCode);

      // Move to next input if not last and value exists
      if (val && index < code.length - 1) {
        document.getElementById(`digit-${index + 1}`)?.focus();
      }

      // Update hidden form value
      const fullCode = newCode.join("");
      setValue("code", fullCode); // from react-hook-form
    }}
    onKeyDown={(e) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        document.getElementById(`digit-${index - 1}`)?.focus();
      }
    }}
    id={`digit-${index}`}
    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-8 text-center"
    placeholder="—"
  />
))}
<input type="hidden" {...register("code")} />

              </div>
            </div>

            {/* Error Message */}
            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code.message}</p>
            )}

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => navigate("/createdoc")}
            >
              Verify Email
            </button>

            <div className="text-sm text-gray-600 mt-2 text-center">
              Didn't receive a code?{" "}
              <span className="text-blue-500 hover:underline cursor-pointer">
                Resend
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
