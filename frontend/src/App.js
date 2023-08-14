import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Videos from "./pages/Videos";
import SingleVideo from "./pages/SingleVideo";

const App = () => {
  return (
    <BrowserRouter>
      <div className="py-10 min-h-screen bg-[#29292a] text-[#ddcfc9]">
        <div className="">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold mb-8 text-center">Tokopedia Play</h1>
          </Link>
          <Routes>
            <Route path="/" element={<Videos />} />
            <Route path="/video/:videoId" element={<SingleVideo />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
