import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./components/Cart/Cart";

import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";

export const SearchContext = createContext("");

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
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
      </SearchContext.Provider>
    </div>
  );
}

export default App;
