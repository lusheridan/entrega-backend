import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/Products/Products";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Layout/NavBar";
import { Cart } from "./components/Cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Products />} exact />
      </Routes>
      <Routes>
        <Route path="/carrito" element={<Cart />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
