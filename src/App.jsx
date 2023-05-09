import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Products from "./pages/Products";
import Signup from "./pages/Signup";
import { Routes, Route } from 'react-router-dom'


function App() {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  return (
    <>
      <Header auth={auth} setAuth={setAuth} setToken={setToken} token={token} />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} setAuth={setAuth} />} />
        <Route path="/products" element={<Products products={products} setProducts={setProducts} token={token} />} />
        <Route path="/signup" element={<Signup setToken={setToken}  />} />
        <Route path="/cart" element={<Cart token={token} />} />
        <Route path="/order" element={<Order token={token} products={products} />} />
      </Routes> 
      <Footer />
    </>
    
  );
}

export default App;
