import React from "react";
import PieChartComponent from "../Components/PieChartComponent";

function Dashboard() {
  return (
    <>
      <div className="w-[100%] border">

        <div className="px-5 py-3.5 flex items-center  gap-3">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <i class="fa-solid fa-chart-simple text-2xl"></i>
        </div>

        <div className="flex items-center justify-center gap-3 pt-1.5 px-5">
          <div className="w-[33%]  py-2 px-4 rounded-xl shadow-lg">
            <h2 className="text-xl ">&#x20B9;150000</h2>
            <p className="font-semibold">Invested</p>
          </div>
          <div className="w-[33%]  py-2 px-4 rounded-xl shadow-lg">
            <h2 className="text-xl text-bold">&#x20B9;150000</h2>
            <p className="font-semibold">Current Value</p>
          </div>
          <div className="w-[33%]  py-2 px-4 rounded-xl shadow-lg">
            <h2 className="text-xl text-bold">&#x20B9;150000</h2>
            <p className="font-semibold">Total P/L</p>
          </div>
        </div>

        <div className="my-3 flex items-center gap-3 h-[75vh] mt-8 px-5">
          <div className="w-[100%] flex   gap-4   h-[75vh] ">
            {/* Left */}

            <div className="w-2/4 flex-1 gap-5 flex flex-col relative">
              {/* 3 */}
              <div className="px-5  py-3  rounded-xl flex-1 shadow-lg">
                <h3 className="text-md font-semibold">Portfolio Performance</h3>
                <PieChartComponent/>
              </div>
              {/* 4 */}
              <div className="px-5 py-3  rounded-xl  flex-1 shadow-xl">
                <div className="flex items-center justify-between">
                <h3 className="text-md font-semibold">Top Performing Stocks</h3>
                <i className="fa-solid fa-arrow-trend-up text-xl text-green-700"></i>
                </div>
                <ul className="pt-1 flex flex-col gap-2">
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                </ul>
              </div>
            </div>
            {/* Right */}

            <div className="w-2/4 flex-1 gap-5 flex flex-col">
              {/* 3 */}
              <div className="px-5  py-3 rounded-xl flex-1 shadow-lg">
                <div className="flex items-center justify-between">
                <h3 className="text-md font-semibold ">Market Stocks</h3>
                <i class="fa-solid fa-ranking-star text-xl  text-yellow-400"></i>
                </div>
                <ul className="pt-1 flex flex-col gap-2">
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                </ul>
              </div>
              {/* 4 */}
              <div className="px-5  py-3 rounded-xl flex-1 shadow-lg">
                <div className="flex items-center justify-between">
                <h3 className="text-md font-semibold">Low Performing Stocks</h3>
                <i className="fa-solid fa-arrow-trend-down text-xl text-red-600"></i>
                </div>
                <ul className="pt-1 flex flex-col gap-2">
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                </ul>
              </div>
            </div>

          </div>

          <div className="w-[400px] h-[75vh] py-1 px-3 text-xl rounded-xl flex flex-col justify-between shadow-lg">
            <div className="text-center">
              <h2>Ai Assistant</h2>
            </div>

            <div className="overflow-y-auto py-3 ps-1 no-scrollbar text-start px-5 rounded-md">
              <p className="text-[16px]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempore facere dolor quam, ab eligendi minus nulla officia
                blanditiis eius veniam nemo voluptatibus? Repellat saepe totam
                laudantium, dolorum pariatur beatae cum vel magni impedit
                explicabo nulla natus consectetur odio voluptatibus fugit
                voluptates debitis in nesciunt soluta, voluptas incidunt
                adipisci molestiae reiciendis facere? Laboriosam modi enim iste,
                in soluta voluptatem eveniet esse corporis quibusdam molestiae
                aliquid repellendus unde nobis illo corrupti accusantium eaque
                rerum. Sunt eum necessitatibus eius nobis cupiditate, velit
                repellat ea rem culpa doloribus tenetur id vitae facilis aperiam
                aspernatur impedit consequatur, consectetur amet! Incidunt
                exercitationem expedita, sit provident adipisci tempora
                doloribus magni, blanditiis reiciendis placeat ratione facere
                ipsa architecto! Earum incidunt dolore sapiente delectus sed
                neque harum vero fugiat numquam. Praesentium sapiente nemo odit
                ad quisquam eius quod illum pariatur recusandae nostrum
                explicabo deleniti dolorum iste facilis nulla nisi aut
                reiciendis, possimus est distinctio molestias esse amet! Odit
                enim quod consectetur fugiat animi. Placeat tempore sint,
                reprehenderit corporis sapiente asperiores fuga quibusdam ab,
                enim distinctio nostrum eum voluptatem in? Nesciunt ducimus
                veniam sed incidunt labore id eum consectetur? Vel voluptate
                minus labore, accusamus dolore incidunt quae debitis dicta!
                Voluptates asperiores amet perferendis tenetur? Perspiciatis
                repellendus iste eos dolorem, in eaque quam pariatur et suscipit
                repudiandae excepturi, explicabo ipsum corporis natus impedit
                saepe, ullam sunt perferendis corrupti quisquam nobis neque
                consequatur. Sint eligendi rem pariatur explicabo numquam, optio
                reprehenderit error ratione dicta deleniti minus temporibus
                magni quos repudiandae, aperiam quo iure ea incidunt repellat
                neque officiis esse aspernatur est doloremque. Maxime, aliquam
                corporis autem repudiandae eveniet expedita esse fuga repellat
                cupiditate repellendus. Temporibus, dolor explicabo culpa magni
                cumque quia qui eligendi commodi sunt saepe! Mollitia, totam id
                labore dignissimos architecto voluptatibus consequuntur maxime
                repellat exercitationem voluptate eveniet quod blanditiis
                quibusdam.
              </p>
            </div>

            <div className="flex items-center gap-3 mb-1">
              <input
                type="text"
                name="inp"
                id="inp"
                className="border rounded-lg w-full h-[30px] my-2 text-sm px-3 font-semibold"
                placeholder="Ask AI"
              />
              <button className="bg-blue-500 shadow-lg shadow-blue-500/50 py-0.5 px-2 rounded-sm">
                <i className="fa-solid fa-check"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
