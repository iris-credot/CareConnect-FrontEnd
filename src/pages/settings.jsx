import React,{useRef,useState} from "react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../customHooks/documentTitle";
import { useThemee } from "../components/darkTheme.jsx";
import Icon from '../assets/picc.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon,faSun,faPen } from '@fortawesome/free-solid-svg-icons';

export default function SettingsPage(){
    const navigate=useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const {darkMode,toggleDarkMode}=useThemee();
    useDocumentTitle("Settings");
   
    const fileInputRef = useRef(null);
      
     const handleEditClick = () => {
          fileInputRef.current.click();
        };
      
     const handleFileChange = (event) => {
          const file = event.target.files[0];
          if (file) {
            setSelectedFile(file);
           
            console.log("Selected file:", file);
          }
        };
        const handleSaveImage = () => {
            if (selectedFile) {
              // ✅ Your logic to upload the image goes here
              console.log("Saving image:", selectedFile);
            }
          };
    return (
        <div className="flex flex-col justify-center  p-5 gap-6 dark:text-white items-center">
            <h1 className="font-bold text-5xl ">Settings</h1>
            <h2 className="text-3xl font-bold mt-8 items-center justify-center flex ">Profile</h2>

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
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleEditClick}
        className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-100 dark:text-gray-800 "
      >
        <FontAwesomeIcon icon={faPen} />
      </button>
 
    </div>
    {selectedFile && (
        <div className="w-[20%] mt-14">
  <button
    type="button"
    onClick={handleSaveImage}
    className="mt-2 bg-green-500 text-white px-2  text-xs rounded"
  >
    Save Image
  </button>
  </div>
)}
      </div>

            <div className="bg-gray-50 w-full rounded-lg shadow max-w-4xl p-6 dark:bg-gray-700 ">
                <form onSubmit="" className="flex flex-col space-y-4 w-full">
                    {[
                        { label: "Names", type: "text" },
                        { label: "Bio", type: "text" },
                        { label: "Address", type: "text" },
                        { label: "Email", type: "email" },
                        { label: "Phone Number", type: "text" },
                        { label: "Date of Birth", type: "date" },
                    ].map((field, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2">
                            <label className="md:w-[40%] w-full">{field.label}</label>
                            <input
                                type={field.type}
                                className="border rounded-md p-2 md:w-[60%] w-full"
                            />
                        </div>
                    ))}
                </form>
                <div className="flex justify-end mt-4 items-center">
                          <button
                              type="submit"
                                className="bg-green-500 text-white rounded-lg px-4 py-2"
                                       >
                                Save Changes
                                </button>
                                    </div>
            </div>
            <div className="flex  md:flex-row gap-12 w-full mt-8 justify-center items-center">
                        <label className="w-[70%] sm:text-2xl text-lg font-semibold">Update Password</label>
                        <button
                            type="button"
                            onClick={() => navigate("/doctor/settings/update-pass")}
                            className="bg-blue-500 text-white rounded-lg px-2 py-2 w-[20%] "
                        >
                            Edit
                        </button>
                    </div>
                    <div className="flex  md:flex-row gap-12 w-full mt-8 justify-center items-center ">
                        <label className="w-[70%] sm:text-2xl text-lg font-semibold ">Dark Theme</label>
                        <button
                            type="button"
                            onClick={toggleDarkMode}
                            className={`flex justify-center items-center sm:gap-2 gap-1 rounded-lg px-2 py-2 w-[20%] border transition duration-300 ${
                                darkMode
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white text-black border-black" 
                            }`}
                        >
                     <FontAwesomeIcon icon={darkMode ? faSun  : faMoon }   /> 
                     <span>{darkMode ? "On" : "Off"}</span>
                        </button>
                    </div>
        </div>
    );
}