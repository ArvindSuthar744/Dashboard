import React, { useEffect, useState } from "react";
import { db } from "../Backend/firestart"; // Import Firestore
import { collection, getDocs } from "firebase/firestore";
import axios from "axios";

const GROQ_API_KEY = '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';
const GROQ_API_URL = "https://api.groq.ai/v1/chat/completions"; // Replace with the actual Groq API endpoint

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
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-3 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                name="inp"
                id="inp"
                className="border rounded-lg w-full h-[30px] my-2 text-sm px-3 font-semibold"
                placeholder="Ask AI"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSendMessage(); // Send message on Enter key press
                }}
              />
              <button onClick={handleSendMessage}>
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