import React, { useEffect, useState } from "react";
import { db } from "../Backend/firestart"; // Import Firestore
import { collection, getDocs } from "firebase/firestore";

import PieChartComponent from "../Components/PieChartComponent";

function Dashboard() {
  const [totalInvested, setTotalInvested] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [topPerformingStocks, setTopPerformingStocks] = useState([]);
  const [lowPerformingStocks, setLowPerformingStocks] = useState([]);
  const [portfolioAdvice, setPortfolioAdvice] = useState(""); // State to store LLM advice
  const [stocks, setStocks] = useState([]);

  // Fetch stocks data from Firestore and calculate values
  useEffect(() => {
    const fetchStocksAndCalculateValues = async () => {
      try {
        const stocksRef = collection(db, "Users", "cs@gmail.com", "stocks");
        const snapshot = await getDocs(stocksRef);

        let totalInvestedValue = 0;
        let totalCurrentValue = 0;
        let totalProfitLossValue = 0;
        const stocksPerformance = [];

        for (const doc of snapshot.docs) {
          const stock = doc.data();
          const { buyPrice, quantity, symbol } = stock;
          console.log(stock);
          const currentPriceResponse = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=ZNJ12HBDRNEBYCNT`
          );
          const currentPriceData = await currentPriceResponse.json();
          const currentPrice = parseFloat(
            currentPriceData["Global Quote"]["05. price"]
          );

          const investedValue = buyPrice * quantity;
          const currentValue = currentPrice * quantity;
          const profitLoss = (currentPrice - buyPrice) * quantity;

          totalInvestedValue += investedValue;
          totalCurrentValue += currentValue;
          totalProfitLossValue += profitLoss;

          stocksPerformance.push({
            symbol,
            profitLoss,
          });
        }

        // Sort stocks by performance
        stocksPerformance.sort((a, b) => b.profitLoss - a.profitLoss);

        console.log("Checking performers: ", stocksPerformance);

        const topPerformers = stocksPerformance
          .slice(0, 5)
          .map((stock) => stock.symbol);
        const lowPerformers = stocksPerformance
          .reverse()
          .slice(-5)
          .map((stock) => stock.symbol);
        console.log("Low: ", lowPerformers);
        setTotalInvested(totalInvestedValue);
        setCurrentValue(totalCurrentValue);
        setTotalProfitLoss(totalProfitLossValue);
        setTopPerformingStocks(topPerformers);
        setLowPerformingStocks(lowPerformers);

        // Fetch personalized advice based on the portfolio
      } catch (error) {
        console.error("Error fetching stocks data:", error);
      }
    };

    fetchStocksAndCalculateValues();
  }, []);

  return (
    <>
      <div className="w-[100%] border">
        <div className="px-5 py-3.5 flex items-center gap-3 ">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <i className="fa-solid fa-chart-simple text-2xl"></i>
        </div>

        <div className="flex items-center justify-center gap-3 pt-1.5 px-5">
          <div className="w-[33%] py-2 px-4 rounded-xl shadow-lg border-2 border-[#e8e8e8]">
            <h2 className="text-xl">&#x20B9; {totalInvested.toFixed(2)}</h2>
            <p className="font-semibold">Invested</p>
          </div>
          <div className="w-[33%] py-2 px-4 rounded-xl shadow-lg border-2 border-[#e8e8e8]">
            <h2 className="text-xl text-bold">
              &#x20B9;{currentValue.toFixed(2)}
            </h2>
            <p className="font-semibold">Current Value</p>
          </div>
          <div className="w-[33%] py-2 px-4 rounded-xl shadow-lg border-2 border-[#e8e8e8]">
            <h2
              className="text-2xl text-bold"
              style={{
                color: totalProfitLoss >= 0 ? "green" : "red",
              }}
            >
              &#x20B9; {totalProfitLoss.toFixed(2)}
            </h2>
            <p>Total P/L</p>
          </div>
        </div>

        <div className="my-3 flex items-center gap-3 h-[75vh] mt-8 px-5">
          <div className="w-[100%] flex gap-4 h-[75vh]">
            {/* Left */}
            <div className="w-2/4 flex-1 gap-5 flex flex-col relative">
              <div className="px-5 py-3 rounded-xl flex-1 shadow-lg border-2 border-[#e8e8e8]">
                <h3 className="text-md font-semibold ">
                  Portfolio Performance
                </h3>
                <PieChartComponent />
              </div>
              <div className="px-5 py-3 rounded-xl flex-1 shadow-lg border-2 border-[#e8e8e8]">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-semibold ">
                    Top Performing Stocks
                  </h3>
                  <i className="fa-solid fa-arrow-trend-up text-xl text-green-700"></i>
                </div>
                <ul className="pt-1 flex flex-col gap-2 mt-5">
                  {topPerformingStocks.map((stock, index) => (
                    <li className="text-green-800 " key={index}>{stock}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right */}
            <div className=" w-2/4 flex-1 gap-5 flex flex-col">
              <div className="px-5 py-3 rounded-xl flex-1 shadow-lg border-2 border-[#e8e8e8]">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-semibold">Market Stocks</h3>
                  <i className="fa-solid fa-ranking-star text-xl text-yellow-400"></i>
                </div>
                <ul className="pt-1 flex flex-col gap-2 mt-5">
                  <li>NHPC</li>
                  <li>TATA STEEL</li>
                  <li>TORRENT</li>
                  <li>ADANI</li>
                </ul>
              </div>
              <div className="px-5 py-3 rounded-xl flex-1 shadow-lg border-2 border-[#e8e8e8]">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-semibold">
                    Low Performing Stocks
                  </h3>
                  <i className="fa-solid fa-arrow-trend-down text-xl text-red-600"></i>
                </div>
                <ul className="pt-1 flex flex-col gap-2 mt-5">
                  {lowPerformingStocks.map((stock, index) => (
                    <li className="text-red-800 " key={index}>{stock}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-[400px] h-[75vh] py-1 px-3 text-xl rounded-xl flex flex-col justify-between shadow-lg border-2 border-[#e8e8e8]">
            <div className="text-center">
              <h2>AI Assistant</h2>
            </div>

            <div className="overflow-y-auto py-3 ps-1 no-scrollbar text-start px-5 rounded-md">
              <p className="text-[16px]">{portfolioAdvice}</p>
            </div>

            <div className="flex items-center gap-3 mb-1">
              <input
                type="text"
                name="inp"
                id="inp"
                className="border rounded-lg w-full h-[30px] my-2 text-sm px-3 font-semibold"
                placeholder="Ask AI"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
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
