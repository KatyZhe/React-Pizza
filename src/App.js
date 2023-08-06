import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import NotFound from "./components/NotFound/NotFound";
import Cart from './components/Cart/Cart';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from "react";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
