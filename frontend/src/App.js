import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AddProduct from "./components/AddProduct";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Nav from "./components/nav";
import PrivateComponent from "./components/PrivateComponent";
import ProductList from "./components/ProductList";
import SignUp from "./components/Signup";
import Updateproduct from "./components/Updateproduct";
import Cart from "./components/cart";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<Updateproduct />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
