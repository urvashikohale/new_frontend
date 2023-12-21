import React from "react";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Calendar from "./Calendar";
import SummaryPage from "./SummaryPage";

function ALLL() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/summarypage" element={<SummaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default ALLL;
