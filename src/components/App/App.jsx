import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Images from "../Images/Images";
import AppBar from "../AppBar/AppBar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<AppBar />}>
            <Route path="/images" element={<Images />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
