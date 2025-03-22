import "./App.css";
import Dashboard from "./Pages/Dashboard";
import Sidebar from "./Pages/Sidebar";
import Stocks from "./Pages/Stocks";

import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <div className="flex ">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stocks" element={<Stocks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
