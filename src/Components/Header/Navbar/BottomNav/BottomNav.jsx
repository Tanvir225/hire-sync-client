import React from "react";
import { AiOutlineHome,AiOutlinePlusCircle,AiOutlineAudit,AiOutlineAreaChart,AiOutlineBgColors  } from "react-icons/ai";

import { NavLink } from "react-router-dom";
import "./BottomNav.css"
const BottomNav = () => {
  return (
    <div className=" md:hidden relative">
      <div className="fixed bottom-0 flex justify-between items-center w-full px-10 py-6 text-white bg-blue-600 text-4xl">
        <NavLink to={"/"}>
            <AiOutlineHome></AiOutlineHome>
            <span className="text-base">Home</span>
        </NavLink>
        
        <NavLink to={"/post-job"}>
            <AiOutlinePlusCircle></AiOutlinePlusCircle>
            <span className="text-base">Post</span>
        </NavLink>

        <NavLink to={"all-jobs"}>
            <AiOutlineAudit></AiOutlineAudit>
            <span className="text-base">Jobs</span>
        </NavLink>

        <NavLink to={"/my-jobs"}>
            <AiOutlineBgColors></AiOutlineBgColors>
            <span className="text-base">My jobs</span>
        </NavLink>
       
      
       
      </div>
    </div>
  );
};

export default BottomNav;
