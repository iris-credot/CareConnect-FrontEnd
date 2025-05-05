import React from "react";
import Icon from "../assets/icon1.PNG";
export default function NavBar(){

    return(
        <div className="flex w-full py-2  bg-[#E6E5E5] justify-center items-center shadow-lg">
         <div className="w-1/2 text-start md:pl-20 pl-9"><img src={Icon} alt="Logo" /></div>
         <div className="w-1/2 text-end md:text-3xl font-extrabold md:pr-36 sm:pr-12 pr-8 sm:text-2xl text-xl" >CareConnect</div>
        </div>
    )
}