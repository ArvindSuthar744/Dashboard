import React, { useEffect, useState } from "react";
import { db } from "../Backend/firestart"; // Import Firestore
import { collection, getDocs } from "firebase/firestore";

function Dashboard() {
  const [totalInvested, setTotalInvested] = useState(0); // State to store total invested value
  const [currentValue, setCurrentValue] = useState(0); // State to store current value
  const [totalProfitLoss, setTotalProfitLoss] = useState(0); // State to store total profit/loss

  // Fetch stocks data from Firestore and calculate total invested, current value, and profit/loss
  useEffect(() => {
    const fetchStocksAndCalculateValues = async () => {
      try {
        // Reference to the stocks subcollection for the user
        const stocksRef = collection(db, "Users", "cs@gmail.com", "stocks");

        // Fetch all documents in the stocks subcollection
        const snapshot = await getDocs(stocksRef);

        let totalInvestedValue = 0;
        let totalCurrentValue = 0;
        let totalProfitLossValue = 0;

        // Fetch current price for each stock and calculate values
        for (const doc of snapshot.docs) {
          const stock = doc.data();
          const { buyPrice, quantity, symbol } = stock;

          // Fetch current price from Alpha Vantage API
          const currentPriceResponse = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=ZNJ12HBDRNEBYCNT`
          );
          const currentPriceData = await currentPriceResponse.json();
          const currentPrice = parseFloat(currentPriceData["Global Quote"]["05. price"]);

          // Calculate values
          totalInvestedValue += buyPrice * quantity;
          totalCurrentValue += currentPrice * quantity;
          totalProfitLossValue += (currentPrice - buyPrice) * quantity;
        }

        // Update the state with the calculated values
        setTotalInvested(totalInvestedValue);
        setCurrentValue(totalCurrentValue);
        setTotalProfitLoss(totalProfitLossValue);
      } catch (error) {
        console.error("Error fetching stocks data:", error);
      }
    };

    fetchStocksAndCalculateValues(); // Call the function
  }, []); // Run only once when the component mounts

  return (
    <>
      <div className="w-[100%] border border-red-500 px-5 ">
        <div className="py-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <div className="flex items-center justify-center gap-3">
          {/* Invested */}
          <div className="w-[33%] border py-2 px-4 rounded-2xl">
            <h2 className="text-2xl text-bold">&#x20B9; {totalInvested.toFixed(2)}</h2>
            <p>Invested</p>
          </div>

          {/* Current Value */}
          <div className="w-[33%] border py-2 px-4 rounded-2xl">
            <h2 className="text-2xl text-bold">&#x20B9; {currentValue.toFixed(2)}</h2>
            <p>Current Value</p>
          </div>

          {/* Total P/L */}
          <div className="w-[33%] border py-2 px-4 rounded-2xl">
            <h2 className="text-2xl text-bold" style={{color:totalProfitLoss >= 0 ? "green" : "red"}}>&#x20B9; {totalProfitLoss.toFixed(2)}</h2>
            <p>Total P/L</p>
          </div>
        </div>

        <div className="my-3 flex items-center gap-3 h-[75vh] mt-8">
          <div className="w-[100%] flex   gap-4   h-[75vh] ">
            {/* Left */}

            <div className="w-2/4 flex-1  flex flex-col">
              {/* 3 */}
              <div className=" px-2 pb-2 border-1 rounded-xl flex-1">
                <h3 className="text-md font-bold">Market Stocks</h3>
                <ul className="pt-1 flex flex-col gap-2">
                  <li className=" py-1 px-2 ">Sampe</li>
                  <li className=" py-1 px-2 ">Sampe</li>
                  <li className=" py-1 px-2 ">Sampe</li>
                  <li className=" py-1 px-2 ">Sampe</li>
                </ul>
              </div>
              {/* 4 */}
              <div className=" px-2 pb-2 border-1 rounded-xl p-4 mt-5 flex-1">
                <h3 className="text-md font-bold">Low Performing Stocks</h3>
                <ul className="pt-1 flex flex-col gap-2">
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                </ul>
              </div>
            </div>
            {/* Right */}

            <div className="w-2/4 flex-1 flex flex-col">
              {/* 3 */}
              <div className=" px-2 pb-2 border-1 rounded-xl flex-1">
                <h3 className="text-md font-bold">Market Stocks</h3>
                <ul className="pt-1 flex flex-col gap-2">
                  <li className=" py-1 px-2 ">Sampe</li>
                  <li className=" py-1 px-2 ">Sampe</li>
                  <li className=" py-1 px-2 ">Sampe</li>
                  <li className=" py-1 px-2 ">Sampe</li>
                </ul>
              </div>
              {/* 4 */}
              <div className=" px-2 pb-2 border-1 rounded-xl p-4 mt-5 flex-1">
                <h3 className="text-md font-bold">Low Performing Stocks</h3>
                <ul className="pt-1 flex flex-col gap-2">
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                  <li className="">Sampe</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-[400px] h-[75vh] py-1 px-3 text-xl border rounded-xl flex flex-col justify-between">
            <div className="text-center">
              <h2>Ai Assistant</h2>
            </div>

            <div className="overflow-y-auto py-5 ps-1 no-scrollbar text-start px-5">
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
                quibusdam, nobis itaque ut molestias neque optio illo, esse
                libero cum.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                name="inp"
                id="inp"
                className="border rounded-lg w-full h-[30px] my-2 text-sm px-3 font-semibold"
                placeholder="Ask AI"
              />
              <button>
                <i class="fa-solid fa-check"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;