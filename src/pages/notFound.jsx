import React from "react";
import NOT from "../assets/notFoound.PNG";
import useDocumentTitle from "../customHooks/documentTitle";
export default function NotFound() {
  useDocumentTitle("NotFound");
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full h-screen px-4 gap-6 bg-gray-50 dark:bg-gray-800">
      <div className="md:w-1/2 w-full flex justify-center">
        <img src={NOT} alt="Not Found" className="max-w-full h-auto rounded-full" />
      </div>
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center text-center space-y-4">
        <div className="text-9xl font-bold text-blue-600">404</div>
        <div className="text-4xl font-semibold text-gray-700 dark:text-white">Not Found</div>
        <p className="text-lg text-gray-500 dark:text-white">The page you’re looking for doesn’t exist.</p>
      </div>
    </div>
  );
}
