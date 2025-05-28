import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../customHooks/documentTitle";
import { useThemee } from "../components/darkTheme.jsx";
import Icon from "../assets/picc.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faPen } from "@fortawesome/free-solid-svg-icons";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useThemee();
  useDocumentTitle("Settings");

  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    address: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("Missing userId or token in localStorage.");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://careconnect-api-v2kw.onrender.com/api/user/getOne/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("User data fetched:", res.data);

        const user = res.data.user;

        setUserData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          bio: user.bio || "",
          address: user.address || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          dateOfBirth: user.dateOfBirth
            ? new Date(user.dateOfBirth).toISOString().split("T")[0]
            : "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    console.log("Submitting updated user data:", userData);

    try {
      await axios.put(
        `https://careconnect-api-v2kw.onrender.com/api/user/profile/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User data updated successfully!");
    } catch (err) {
      console.error("Failed to update user data:", err);
    }
  };

  return (
    <div className="flex flex-col justify-center p-5 gap-6 dark:text-white items-center dark:bg-black">
      <h1 className="font-bold text-5xl">Settings</h1>
      <h2 className="text-3xl font-bold mt-8 items-center justify-center flex">
        Profile
      </h2>

      <div className="w-full flex justify-center mb-6 mt-4 gap-10">
        <div className="relative">
          <img
            src={Icon}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="hidden"
          />
          <button
            type="button"
            className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-100 dark:text-gray-800"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        {selectedFile && (
          <div className="w-[20%] mt-14">
            <button
              type="button"
              className="mt-2 bg-green-500 text-white px-2 text-xs rounded"
            >
              Save Image
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-50 w-full rounded-lg shadow max-w-4xl p-6 dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
          {[
            { label: "First Name", key: "firstName", type: "text" },
            { label: "Last Name", key: "lastName", type: "text" },
            { label: "Bio", key: "bio", type: "text" },
            { label: "Address", key: "address", type: "text" },
            { label: "Email", key: "email", type: "email" },
            { label: "Phone Number", key: "phoneNumber", type: "text" },
            { label: "Date of Birth", key: "dateOfBirth", type: "date" },
          ].map((field, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row md:items-center gap-2"
            >
              <label className="md:w-[40%] w-full">{field.label}</label>
              <input
                type={field.type}
                value={userData[field.key]}
                onChange={(e) =>
                  setUserData({ ...userData, [field.key]: e.target.value })
                }
                className="border rounded-md p-2 md:w-[60%] w-full dark:text-black"
              />
            </div>
          ))}

          <div className="flex justify-end mt-4 items-center">
            <button
              type="submit"
              className="bg-green-500 text-white rounded-lg px-4 py-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className="flex md:flex-row gap-12 w-full mt-8 justify-center items-center">
        <label className="w-[70%] sm:text-2xl text-lg font-semibold">
          Update Password
        </label>
        <button
          type="button"
          onClick={() => navigate("/admin/settings/update-pass")}
          className="bg-[#FFB640] text-white rounded-lg px-2 py-2 w-[20%]"
        >
          Edit
        </button>
      </div>

      <div className="flex md:flex-row gap-12 w-full mt-8 justify-center items-center">
        <label className="w-[70%] sm:text-2xl text-lg font-semibold">
          Dark Theme
        </label>
        <button
          type="button"
          onClick={toggleDarkMode}
          className={`flex justify-center items-center sm:gap-2 gap-1 rounded-lg px-2 py-2 w-[20%] border transition duration-300 ${
            darkMode
              ? "bg-[#FFB640] text-white border-[#FFB640]"
              : "bg-white text-black border-black"
          }`}
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          <span>{darkMode ? "On" : "Off"}</span>
        </button>
      </div>
    </div>
  );
}
