import "./App.css";
import Main from "./components/Main/Main";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./components/Cart/Cart";
import FullPizza from "./components/FullPizza/FullPizza";
import MainLayout from "./layouts/MainLayout";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
