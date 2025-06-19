import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/icon.png";
import Pagee from "../assets/project-3.jpg";
import Sara from "../assets/picc.jpg"
import mic from "../assets/miv.png"

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Modern Header */}
      <header className="flex justify-between items-center px-6 py-4 md:px-12 md:py-6 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src={Icon} alt="CareConnect Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            CareConnect
          </h1>
        </div>
       
        <div className="flex gap-4 items-center">
          <nav className="hidden md:flex gap-8">
            <button  onClick={() => document.getElementById('features').scrollIntoView({behavior: 'smooth'})} className="font-medium hover:text-blue-600 transition">
              Features
            </button>
            <button  onClick={() => document.getElementById('how-it-works').scrollIntoView({behavior: 'smooth'})} className="font-medium hover:text-blue-600 transition">
              How It Works
            </button>
            <button  onClick={() => document.getElementById('testimonies').scrollIntoView({behavior: 'smooth'})}className="font-medium hover:text-blue-600 transition">
              Testimonials
            </button>
          </nav>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg hover:opacity-90 transition font-medium shadow-md"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Gradient Background */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 py-12 md:px-20 md:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Personalized Healthcare <span className="text-blue-600">Made Simple</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
            Connect with trusted healthcare providers, manage your appointments, and access your medical history—all in one secure platform designed for your convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg hover:opacity-90 transition font-medium shadow-lg text-lg"
            >
              Get Started Today
            </button>
            <button
              onClick={() => document.getElementById('how-it-works').scrollIntoView({behavior: 'smooth'})}
              className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-lg"
            >
              How It Works
            </button>
          </div>
          <div className="mt-8 flex items-center gap-4">
          
            <div>
              <p className="font-medium">Trusted by 50,000+ patients</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-600 ml-1">4.9/5 (2,500+ reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center relative">
          <img 
            src={Pagee} 
            alt="Happy patient with doctor" 
            className="w-full max-w-md rounded-2xl shadow-xl border-8 border-white transform rotate-1 hover:rotate-0 transition-transform duration-300" 
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Instant Confirmation</p>
                <p className="text-sm text-gray-500">Real-time appointment booking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="bg-gray-50 py-6 border-y">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-500 mb-4">Trusted by leading healthcare providers</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            {["Hospital A", "Clinic B", "Medical Group C", "Health System D", "Pharmacy E"].map((item) => (
              <div key={item} className="text-xl font-medium text-gray-700">{item}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Healthcare Solutions</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your healthcare journey in one integrated platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Easy Appointment Booking</h4>
              <p className="text-gray-600 mb-4">
                Schedule in-person or virtual visits with specialists in seconds, with real-time availability.
              </p>
              <ul className="space-y-2">
                {["Instant confirmation", "Automated reminders", "Reschedule anytime", "Waitlist options"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Find the Right Provider</h4>
              <p className="text-gray-600 mb-4">
                Our intelligent matching system connects you with specialists tailored to your needs.
              </p>
              <ul className="space-y-2">
                {["Verified credentials", "Patient reviews", "Specialty filters", "Insurance accepted"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Health Records & Tracking</h4>
              <p className="text-gray-600 mb-4">
                Secure, centralized access to your medical history and health metrics.
              </p>
              <ul className="space-y-2">
                {["Prescription history", "Test results", "Vaccination records", "Health trend analysis"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700">
                    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">24/7 Virtual Care</h4>
                  <p className="text-gray-600">
                    Connect with healthcare providers anytime, anywhere through secure video consultations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl border border-green-100">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Emergency Services</h4>
                  <p className="text-gray-600">
                    Immediate access to emergency care coordination when you need it most.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How CareConnect Works</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to better healthcare management
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {[
                {
                  number: "1",
                  title: "Create Your Profile",
                  description: "Set up your secure account in minutes with basic information and health preferences.",
                  icon: (
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )
                },
                {
                  number: "2",
                  title: "Find & Book Care",
                  description: "Search providers by specialty, location, or availability and book instantly.",
                  icon: (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )
                },
                {
                  number: "3",
                  title: "Manage Your Health",
                  description: "Access visit summaries, prescriptions, and health tracking tools all in one place.",
                  icon: (
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                }
              ].map((step, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-blue-600">{step.number}</span>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonies" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from people who transformed their healthcare experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-100"> <img src={Sara} alt="Sarah Johnson" className="w-full h-full object-cover" /></div>
                <div>
                  <h4 className="font-bold text-lg">Sarah Johnson</h4>
                  <p className="text-gray-600">Chronic Condition Patient</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 italic">
                "CareConnect has completely changed how I manage my diabetes. Being able to message my care team between visits and see all my test results in one place gives me so much more control over my health."
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-green-100"><img src={mic} alt="Sarah Johnson" className="w-full h-full object-cover" /></div>
                <div>
                  <h4 className="font-bold text-lg">Michael Chen</h4>
                  <p className="text-gray-600">Busy Parent</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 italic">
                "As a father of three, I don't have time to sit on hold to make doctor appointments. With CareConnect, I can book pediatric visits during my lunch break and get reminders for all my family's health needs in one app."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Healthcare?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of patients who are experiencing better, more connected care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-bold text-lg shadow-lg"
            >
              Sign Up Free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 border border-white text-black rounded-lg hover:bg-blue-700 transition font-medium text-lg"
            >
              Existing Patient Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className=" bg-black">     
<div className="border-t border-gray-800 mt-12 mb-5 pt-8 text-center text-gray-400"> © {new Date().getFullYear()} CareConnect. All rights reserved.</div>
         
      </div>
    </div>
  );
}