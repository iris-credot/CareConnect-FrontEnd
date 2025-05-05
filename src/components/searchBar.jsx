import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export default function SearchBar(){

    return(
        <div className="flex  py-2 border-2 border-[#b8b6b6] max-w-2xl rounded-lg ">
          
                <input type="text" name="" placeholder="Search by name or email......" className="pl-6 text-lg w-[90%] " />
              
              <FontAwesomeIcon icon={faSearch} className=" w-[10%] text-blue-500 text-3xl"    />
        </div>
    )
}