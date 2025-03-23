import React, { useEffect, useState, useRef } from "react";
import { db } from "../Backend/firestart"; // Import Firestore
import { collection, getDocs } from "firebase/firestore";
import sendIcon from "../assets/send-icon.svg";
import PieChartComponent from "../Components/PieChartComponent";
import PropagateLoader from "react-spinners/PropagateLoader";
import ChatResponse from "../Components/ChatResponse.component";
import Groq from "groq-sdk";
import taxIcon from "../assets/tax.png";
import MDEditor from "@uiw/react-md-editor";

function Dashboard() {
  const [totalInvested, setTotalInvested] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [topPerformingStocks, setTopPerformingStocks] = useState([]);
  const [lowPerformingStocks, setLowPerformingStocks] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taxSummary, setTaxSummary] = useState("");
  const scrollRef = useRef(null);

  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API,
    dangerouslyAllowBrowser: true,
  });

  // Scroll to bottom when new answers are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [answer]);

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
          console.log("mystock", stock);

          // Fetch current price from Alpha Vantage API
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
            quantity,
            buyPrice,
          });
        }

        console.log("Performers: ", stocksPerformance);

        // Calculate top and low performing stocks
        const profitableStocks = stocksPerformance
          .filter((stock) => stock.profitLoss > 0)
          .sort((a, b) => b.profitLoss - a.profitLoss);

        const lossStocks = stocksPerformance
          .filter((stock) => stock.profitLoss < 0)
          .sort((a, b) => a.profitLoss - b.profitLoss);

        const topPerformers = profitableStocks.slice(0, 5).map((stock) => ({
          symbol: stock.symbol,
          profitLoss: stock.profitLoss,
        }));

        const lowPerformers = lossStocks.slice(0, 5).map((stock) => ({
          symbol: stock.symbol,
          profitLoss: stock.profitLoss,
        }));

        // Update states
        setTotalInvested(totalInvestedValue);
        setCurrentValue(totalCurrentValue);
        setTotalProfitLoss(totalProfitLossValue);
        setTopPerformingStocks(topPerformers);
        setLowPerformingStocks(lowPerformers);
        setStocks(stocksPerformance); // Update stocks state
      } catch (error) {
        console.error("Error fetching stocks data:", error);
      }
    };

    fetchStocksAndCalculateValues();
  }, []);

  // Call createTaxSummary when stocks state is updated
  useEffect(() => {
    if (stocks.length > 0) {
      createTaxSummary();
    }
  }, [stocks]);

  // Function to generate tax summary
  const createTaxSummary = async () => {
    try {
      const newPrompt = stocks
        .map(
          (stock) =>
            `Stock name ₹${stock.symbol}: ${stock.quantity} quantity shares at ₹${stock.buyPrice} each : Total profit or loss ${stock.profitLoss}`
        )
        .join("\n");

      const response = await groq.chat.completions.create({
        model: "deepseek-r1-distill-llama-70b",
        messages: [
          {
            role: "system",
            content: `You are a AI investor tax advisor, analyze the user portfolio and give a tax summary of his portfolio. The summary is of 2-3 line maxium not exceding 3 lines ... ${newPrompt}`,
          },
        ],
      });

      const botResponse =
        response.choices[0]?.message?.content ||
        "Sorry, I couldn't understand that.";

      const removeThink = botResponse.split("</think>");
      setTaxSummary(removeThink[1]); // Set tax summary in state
    } catch (error) {
      console.error("Error generating tax summary:", error);
    }
  };

  // Function to fetch answers from Groq API
  const fetchAnswer = async () => {
    if (!question.trim()) return; // Prevent empty messages

    setLoading(true);

    try {
      const newPrompt = stocks
        .map(
          (stock) =>
            `Stock name ₹${stock.symbol}: ${stock.quantity} quantity shares at ₹${stock.buyPrice} each : Total profit or loss ${stock.profitLoss}`
        )
        .join("\n");

      const systemPrompt = `You are a AI investment advisor, your job is to analyze user's portfolio stocks and answer user's question. Always answer in show and use bullet points.. Portfolio Data: ${newPrompt}`;
      const response = await groq.chat.completions.create({
        model: "deepseek-r1-distill-llama-70b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
      });

      const botResponse =
        response.choices[0]?.message?.content ||
        "Sorry, I couldn't understand that.";
      const removeThink = botResponse.split("</think>");

      setAnswer((prev) => [...prev, { question, answer: removeThink[1] }]);
      setQuestion("");
    } catch (error) {
      console.error("Error fetching answer:", error);
    } finally {
      setLoading(false);
    }
  };

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
                    <li className="text-green-800 " key={index}>
                      {stock.symbol}{" "}
                      <span className="text-sm ms-15  ">
                        (₹{stock.profitLoss.toFixed(2)})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right */}
            <div className=" w-2/4 flex-1 gap-5 flex flex-col">
              <div className="px-5 py-3 rounded-xl flex-1 shadow-lg border-2 border-[#e8e8e8]">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-semibold">Tax Summary</h3>
                  <img className="w-[25px]" src={taxIcon} />
                </div>
                <div className="max-h-full mt-5 max-h-[30vh] overflow-y-auto">
                
                    <MDEditor.Markdown
                      className="text-sm md:text-lg"
                      source={taxSummary}
                      style={{ backgroundColor: "white", color: "black" }}
                    />{" "}
                  </div>
                
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
                    <li className="text-red-800 " key={index}>
                      {stock.symbol}{" "}
                      <span className="text-sm ms-15">
                        (₹{stock.profitLoss.toFixed(2)})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-[800px] h-[75vh] py-1 px-3 text-xl rounded-xl flex flex-col justify-between shadow-lg border-2 border-[#e8e8e8]">
            <div className="chat-diaglog h-full w-full  bg-white relative ">
              {/* Chat header */}
              <div className="chat-header  absolute w-full h-10 text-center font-semibold text-2xl md:my-3">
                Chat
              </div>

              {/* Chat body */}
              <div className="w-full  flex justify-center absolute top-14 bottom-24 ">
                <div
                  className="md:w-full overflow-y-auto no-scrollbar"
                  ref={scrollRef}
                >
                  {answer.length > 0 ? (
                    answer.map((ans, i) => (
                      <ChatResponse
                        key={i}
                        question={ans.question}
                        answer={ans.answer}
                      />
                    ))
                  ) : (
                    <div className="h-full text-center flex items-center justify-center text-2xl font-semibold text-[#4a4747]">
                      How may I help you today?
                    </div>
                  )}
                </div>
              </div>

              {/* Chat footer absolute*/}
              <div className="chat-footer w-full h-fit  flex flex-col  items-center justify-center py-6 f-fit  absolute bottom-0 ">
                <div className=" md:mb-6">
                  <PropagateLoader color="#5EBFD6" loading={loading} />
                </div>
                <div className="md:w-full text-sm md:text-lg flex items-center border-2 rounded-lg border-[#cdcdcd]">
                  <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="h-full w-full p-4 focus:outline-none"
                    placeholder="Write something here.."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") fetchAnswer();
                    }}
                  />
                  <button className="send-icon px-3 ">
                    <img src={sendIcon} onClick={fetchAnswer} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
