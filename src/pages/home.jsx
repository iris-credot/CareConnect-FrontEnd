import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/icon.png";
import Pagee from "../assets/project-3.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-white text-black flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <img src={Icon} alt="CareConnect Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-blue-500">CareConnect</h1>
        </div>
       
        <div className="flex gap-3">
         
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20 bg-[#f3f5ff]">
        {/* Left Text Section */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6 leading-tight">
            Your Health, <span className="text-blue-500">Our Priority</span>
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Book appointments, track feedback, and access helpful health resources — all in one place. CareConnect makes personalized and timely care accessible for everyone.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Get Started
          </button>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img src={Pagee} alt="CareConnect" className="w-64 md:w-96 rounded-full shadow-xl object-cover aspect-square transition-transform duration-300 hover:scale-105" />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white p-10 md:p-20 text-center max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-black">What You Can Do</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 border rounded-md shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-bold text-blue-500 mb-2">Book Appointments</h4>
            <p className="text-gray-600">Schedule visits with healthcare providers quickly and easily.</p>
          </div>
          <div className="p-6 border rounded-md shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-bold text-blue-500 mb-2">Find Providers</h4>
            <p className="text-gray-600">Search and connect with a wide network of medical professionals.</p>
          </div>
          <div className="p-6 border rounded-md shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-bold text-blue-500 mb-2">Track Feedback</h4>
            <p className="text-gray-600">View and manage your feedback and medical history in one place.</p>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-black">Additional Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-md shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-bold text-blue-500 mb-2">Health Resources</h4>
            <p className="text-gray-600">Access articles, tips, and guides to help you maintain a healthy lifestyle.</p>
          </div>
          <div className="p-6 border rounded-md shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-bold text-blue-500 mb-2">Secure Data</h4>
            <p className="text-gray-600">Your health data is protected with the highest standards of security and privacy.</p>
          </div>
          <div className="p-6 border rounded-md shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-bold text-blue-500 mb-2">24/7 Support</h4>
            <p className="text-gray-600">Our support team is available around the clock to assist you with any questions or concerns.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 p-6 border-t mt-auto">
        © {new Date().getFullYear()} CareConnect. All rights reserved.
      </footer>
    </div>
  );
}
