import React, { useState, useEffect } from "react";

const Stocks = () => {
  const [stocks, setStocks] = useState([]); // List of added stocks
  const [name, setName] = useState(""); // Stock name input
  const [buyPrice, setBuyPrice] = useState(""); // Buy price input
  const [quantity, setQuantity] = useState(""); // Quantity input
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [recommendations, setRecommendations] = useState([]); // Stock name recommendations
  const [currentStockDetails, setCurrentStockDetails] = useState(null); // Current stock details

  // Fetch stock recommendations from Alpha Vantage API
  useEffect(() => {
    if (searchQuery) {
      fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=Z2RAKB8N42VBOPZ5`
      )
        .then((response) => response.json())
        .then((data) => {
          // Filter recommendations based on the search query
          const filteredStocks = data.bestMatches || [];
          console.log(data)
          setRecommendations(filteredStocks);
        })
        .catch((error) => {
          console.error("Error fetching stock recommendations:", error);
        });
    } else {
      setRecommendations([]); // Clear recommendations if search query is empty
    }
  }, [searchQuery]);

  // Fetch current stock details using Alpha Vantage API
  const fetchStockDetails = (symbol) => {
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=Z2RAKB8N42VBOPZ5`
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentStockDetails(data["Global Quote"]); // Set current stock details
      })
      .catch((error) => {
        console.error("Error fetching stock details:", error);
      });
  };

  // Add a new stock
  const addStock = () => {
    if (!name || !buyPrice || !quantity) {
      alert("Please fill all fields");
      return;
    }
    const newStock = {
      id: Date.now(),
      name,
      buyPrice: parseFloat(buyPrice),
      quantity: parseInt(quantity),
      currentPrice: currentStockDetails ? parseFloat(currentStockDetails["05. price"]) : 0, // Use current price from API
    };

    console.log(newStock)

    setStocks([...stocks, newStock]);
    setName("");
    setBuyPrice("");
    setQuantity("");
    setCurrentStockDetails(null); // Reset current stock details
  };

  // Remove a stock
  const removeStock = (id) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  // Calculate profit/loss for a stock
  const calculateProfitLoss = (stock) => {
    const totalBuyPrice = stock.buyPrice * stock.quantity;
    const totalCurrentPrice = stock.currentPrice * stock.quantity;
    return totalCurrentPrice - totalBuyPrice;
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-6">
      <div className="mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Stock Tracker</h1>

        {/* Search Bar for Stock Recommendations */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Search Stock
          </h2>
          <input
            type="text"
            placeholder="Search for a stock (e.g., RELIANCE, TCS)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          {/* Display Recommendations */}
          {recommendations.length > 0 && (
            <div className="mt-2 space-y-1">
              {recommendations.map((stock) => (
                <div
                  key={stock["1. symbol"]}
                  onClick={() => {
                    setName(stock["2. name"]); // Set the exact stock name
                    setSearchQuery(""); // Clear search query
                    setRecommendations([]); // Clear recommendations
                    fetchStockDetails(stock["1. symbol"]); // Fetch current stock details
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                >
                  {stock["2. name"]} ({stock["1. symbol"]})
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Stock</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Stock Name"
              value={name}
              readOnly // Prevent manual editing
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100"
            />
            <input
              type="number"
              placeholder="Buy Price"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={addStock}
            className="mt-4 w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Stock
          </button>
        </div>

        {/* Display Current Stock Details */}
        {currentStockDetails && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Current Stock Details
            </h2>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-gray-800">
                <strong>Symbol:</strong> {currentStockDetails["01. symbol"]}
              </p>
              <p className="text-gray-800">
                <strong>Price:</strong> ${currentStockDetails["05. price"]}
              </p>
              <p className="text-gray-800">
                <strong>Change:</strong> {currentStockDetails["09. change"]} (
                {currentStockDetails["10. change percent"]})
              </p>
            </div>
          </div>
        )}

        {/* Stock List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Stocks</h2>
          {stocks.length === 0 ? (
            <p className="text-gray-600">No stocks added yet.</p>
          ) : (
            <div className="space-y-4">
              {stocks.map((stock) => (
                <div
                  key={stock.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {stock.name}
                      </h3>
                      <p className="text-gray-600">
                        Buy Price: ₹{stock.buyPrice.toFixed(2)} |  Quantity:{" "}
                        {stock.quantity}
                      </p>
                      <p className="text-gray-600">
                        Total Investment: ₹
                        {(stock.buyPrice * stock.quantity).toFixed(2)}
                      </p>
                      <p
                        className={`text-sm ${
                          calculateProfitLoss(stock) >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        Profit/Loss: ₹{calculateProfitLoss(stock).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeStock(stock.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stocks;