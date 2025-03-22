import React, { useEffect, useState } from "react";
import { db } from "../Backend/firestart"; // Import Firestore
import { collection, getDocs } from "firebase/firestore";

import PieChartComponent from "../Components/PieChartComponent";

function Dashboard() {
  const [totalInvested, setTotalInvested] = useState(0); // State to store total invested value
  const [currentValue, setCurrentValue] = useState(0); // State to store current value
  const [totalProfitLoss, setTotalProfitLoss] = useState(0); // State to store total profit/loss
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [inputText, setInputText] = useState(""); // State to store user input

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
          const currentPrice = parseFloat(
            currentPriceData["Global Quote"]["05. price"]
          );

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

  // Fetch stocks data from Firestore
  const fetchStocksData = async () => {
    try {
      const stocksRef = collection(db, "Users", "cs@gmail.com", "stocks");
      const snapshot = await getDocs(stocksRef);
      const stocksData = snapshot.docs.map((doc) => doc.data());
      return stocksData;
    } catch (error) {
      console.error("Error fetching stocks data:", error);
      return [];
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (inputText.trim() === "") return; // Ignore empty messages

    // Add user's message to the chat
    const userMessage = { text: inputText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear the input field
    setInputText("");

    // Fetch stocks data from Firestore
    const stocksData = await fetchStocksData();

    // Generate AI response
    const aiResponseText = await generateAIResponse(inputText, stocksData);
    const aiResponse = { text: aiResponseText, sender: "ai" };

    // Add AI's response to the chat
    setMessages((prevMessages) => [...prevMessages, aiResponse]);
  };




  return (
    <>
      <div className="w-[100%] border">
        <div className="px-5 py-3.5 flex items-center  gap-3">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <i class="fa-solid fa-chart-simple text-2xl"></i>
        </div>

        <div className="flex items-center justify-center gap-3 pt-1.5 px-5">
          <div className="w-[33%]  py-2 px-4 rounded-xl shadow-lg">
            <h2 className="text-xl ">&#x20B9; {totalInvested.toFixed(2)}</h2>
            <p className="font-semibold">Invested</p>
          </div>
          <div className="w-[33%]  py-2 px-4 rounded-xl shadow-lg">
            <h2 className="text-xl text-bold">
              &#x20B9;{currentValue.toFixed(2)}
            </h2>
            <p className="font-semibold">Current Value</p>
          </div>
          <div className="w-[33%]  py-2 px-4 rounded-xl shadow-lg">
            <h2
              className="text-2xl text-bold"
              style={{
                color: totalProfitLoss >= 0 ? "green" : "red", // Green for profit, red for loss
              }}
            >
              &#x20B9; {totalProfitLoss.toFixed(2)}
            </h2>
            <p>Total P/L</p>
          </div>
        </div>

        <div className="my-3 flex items-center gap-3 h-[75vh] mt-8 px-5">
          <div className="w-[100%] flex   gap-4   h-[75vh] ">
            {/* Left */}

            <div className="w-2/4 flex-1 gap-5 flex flex-col relative ">
              {/* 3 */}
              <div className="px-5  py-3  rounded-xl flex-1 shadow-lg">
                <h3 className="text-md font-semibold">Portfolio Performance</h3>
                <PieChartComponent />
              </div>
              {/* 4 */}
              <div className="px-5 py-3  rounded-xl  flex-1 shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-semibold">
                    Top Performing Stocks
                  </h3>
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
                  <h3 className="text-md font-semibold">
                    Low Performing Stocks
                  </h3>
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
            <div className="flex items-center gap-2 justify-center">
            <i class="fa-solid fa-message text-[17px]"></i>
              <h2>Ai Assistant</h2>
            </div>

            <div className="overflow-y-auto py-3 ps-1 no-scrollbar text-start px-5 rounded-md shadow-inner">
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
                placeholder="Ask AI..."
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
