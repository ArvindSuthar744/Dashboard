import React from "react";
import { NavLink, useNavigate } from "react-router";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-[200px] h-full bg-[#032313] text-white flex flex-col gap-5 ">
        <div className="py-5 flex gap-2.5 items-center justify-center">
          <i className="fa-solid fa-chart-pie text-2xl"></i>
          <h1 className="text-xl">Invester.com</h1>
        </div>

        <div>
          <div
            onClick={() => navigate("/")}
            className="py-1 px-7 flex gap-2.5 items-center cursor-pointer"
          >
           <img src="../public/dash.png" alt="" />
            <h1 className="text-lg">Dashbord</h1>
          </div>
          <div
            onClick={() => navigate("/stocks")}
            className="py-1 px-7 flex gap-2.5 items-center cursor-pointer"
          >
            <i className="fa-solid fa-landmark text-xl"></i>
            <h1 className="text-lg">Stocks</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
