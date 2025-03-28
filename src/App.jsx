import "./App.css";
import Dashboard from "./Pages/Dashboard";
import EquityTaxCalculator from "./Pages/EquityTaxCalculator";
import Sidebar from "./Pages/Sidebar";
import Stocks from "./Pages/Stocks";
import News from "./Pages/News";

import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <div className="flex ">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/taxcal" element={<EquityTaxCalculator/>} />
          <Route path="/news" element={<News/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
