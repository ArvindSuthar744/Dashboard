import React, { useState } from "react";

function EquityTaxCalculator() {
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [holdingPeriod, setHoldingPeriod] = useState("");
  const [capitalGains, setCapitalGains] = useState(null);
  const [tax, setTax] = useState(null);

  const calculateTax = () => {
    const buyPrice = parseFloat(buyingPrice);
    const sellPrice = parseFloat(sellingPrice);
    const period = parseFloat(holdingPeriod);

    if (isNaN(buyPrice) || isNaN(sellPrice) || isNaN(period)) {
      alert("Please enter valid numbers for all fields.");
      return;
    }

    const profitLoss = sellPrice - buyPrice;
    setCapitalGains(profitLoss);

    if (profitLoss <= 0) {
      setTax(0); // No tax on losses
      return;
    }

    if (period <= 12) {
      // Short-Term Capital Gains (STCG)
      const stcgTax = profitLoss * 0.15;
      setTax(stcgTax);
    } else {
      // Long-Term Capital Gains (LTCG)
      const exemptLimit = 100000; // ₹1 lakh exemption
      const taxableGains = Math.max(profitLoss - exemptLimit, 0);
      const ltcgTax = taxableGains * 0.1;
      setTax(ltcgTax);
    }
  };

  const resetCalculator = () => {
    setBuyingPrice("");
    setSellingPrice("");
    setHoldingPeriod("");
    setCapitalGains(null);
    setTax(null);
  };

  return (
    <div className="flex ps-10 pt-10 w-full h-fit max-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[95%] ">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Equity Tax Calculator
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Buying Price (₹)
            </label>
            <input
              type="number"
              value={buyingPrice}
              onChange={(e) => setBuyingPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter buying price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Selling Price (₹)
            </label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter selling price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Holding Period (Months)
            </label>
            <input
              type="number"
              value={holdingPeriod}
              onChange={(e) => setHoldingPeriod(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter holding period"
            />
          </div>
          <div className="flex justify-between space-x-4">
            <button
              onClick={calculateTax}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate Tax
            </button>
            <button
              onClick={resetCalculator}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset
            </button>
          </div>
        </div>
        {capitalGains !== null && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Results:</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Capital Gains:</span> ₹
                {capitalGains.toFixed(2)}
              </p>
              <p>
                <span className="font-medium">Applicable Tax:</span> ₹
                {tax.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EquityTaxCalculator;