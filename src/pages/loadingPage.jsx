import React from "react";



export default function Loading(){

    return(
        <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center space-y-6">
        <span className="text-4xl md:text-7xl font-bold text-blue-600">
          Loading
        </span>
        <div className="flex space-x-3">
          <span className="w-5 h-5 md:w-7 md:h-7 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-5 h-5 md:w-7 md:h-7 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-5 h-5 md:w-7 md:h-7 bg-blue-500 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
    )
}