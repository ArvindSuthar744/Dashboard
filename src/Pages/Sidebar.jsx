import React from "react";
import { NavLink, useNavigate } from "react-router";

import home from "../assets/home.svg"
import stocks from "../assets/stocks.svg"
import tax from "../assets/tax.svg"
import news from "../assets/news.svg"

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#032313]">
      <div className="w-[200px] h-lvh  text-white flex flex-col gap-5 ">
        <div className="py-5 mt-5 flex gap-2.5 items-center justify-center">
          <i className="fa-solid fa-chart-pie text-2xl text-green-600 "></i>
          <h1 className="text-xl font-bold">Investor-Hub</h1>
        </div>

        <div className="w-full h-[83vh] flex flex-col items-center justify-between">
          <div>
            <div
              onClick={() => navigate("/")}
              className="py-1 px-7 flex gap-2.5 items-center cursor-pointer"
            >
              <img className="w-[20px]" src={home} alt="" />
              <h1 className="text-lg">Dashbord</h1>
            </div>
            <div
              onClick={() => navigate("/stocks")}
              className="py-1 px-7 flex gap-2.5 items-center cursor-pointer mt-5"
            >
                <img className="w-[20px]" src={stocks} />
                <h1 className="text-lg">Stocks</h1>
            </div>
            <div
              onClick={() => navigate("/taxcal")}
              className="py-1 px-7 flex gap-2.5 items-center cursor-pointer mt-5"
            >
                <img className="w-[20px]" src={tax} />
                <h1 className="text-lg">Tax Cal.</h1>
            </div>
            <div
              onClick={() => navigate("/news")}
              className="py-1 px-7 flex gap-2.5 items-center cursor-pointer mt-5"
            >
                <img className="w-[16px]" src={news} />
                <h1 className="text-lg">News</h1>
            </div>
          </div>

          <div className="w-fit  py-2 border-2 border-[#c8ffa6] rounded-md flex items-center gap-1.5  ">
            <img
              src="../public/profile.png"
              className="w-8 h-8 rounded-[50%] mx-2 "
              alt="profile photo"
            />

            <div className="flex justify-between pt-1.5 gap-14">
              <div>
                <p className="text-sm leading-2">Chandan S.</p>
                <small className="text-[11px] text-gray-400">cs@gmail.com</small>
              </div>
              <div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
