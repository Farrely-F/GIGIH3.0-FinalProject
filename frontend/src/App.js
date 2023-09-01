import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleVideo from "./pages/SingleVideo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VideosWithSuspense from "./pages/Videos";

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-tr from-slate-900 via-stone-900 to-slate-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<VideosWithSuspense />} />
          <Route path="/video/:videoId" element={<SingleVideo />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
