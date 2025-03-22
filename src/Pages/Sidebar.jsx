import React from "react";
import { NavLink, useNavigate } from "react-router";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#032313]">
      <div className="w-[200px] h-lvh  text-white flex flex-col gap-5 ">
        <div className="py-5 flex gap-2.5 items-center justify-center">
          <i className="fa-solid fa-chart-pie text-2xl"></i>
          <h1 className="text-xl">Gainers.com</h1>
        </div>

        <div className="w-full h-[85vh] flex flex-col justify-between">
          
        <div >
          <div
            onClick={() => navigate("/")}
            className="py-1 px-7 flex gap-2.5 items-center cursor-pointer"
          >
           <img src="../public/dash.png" alt="" />
            <h1 className="text-md">Dashbord</h1>
          </div>
          <div
            onClick={() => navigate("/stocks")}
            className="py-1 px-7 flex gap-2.5 items-center cursor-pointer"
          >
            <i className="fa-solid fa-landmark text-md"></i>
            <h1 className="text-md">Stocks</h1>
          </div>
          <div
            onClick={() => navigate("/news")}
            className="py-1 px-7 flex gap-2.5 items-center cursor-pointer"
          >
            <i className="fa-solid fa-landmark text-md"></i>
            <h1 className="text-md">News</h1>
          </div>
        </div>

        <div className="w-[96%] mx-1 py-2 border border-gray-400 rounded-md flex items-center gap-1.5 ">
            <img src="../public/profile.png" className="w-8 h-8 rounded-[50%] mx-2 " alt="profile photo" />

            <div className="flex justify-between pt-1.5 gap-14">
              <div>
              <p className="text-sm leading-2">Username</p>
              <small className="text-[11px] text-gray-400">Admin</small>
              </div>
              <div>
              <i class="fa-solid fa-arrow-right-from-bracket text-green-500"></i>
              </div>
            </div>

            
        </div>


        </div>

      </div>
    </div>
  );
}

export default Sidebar;
