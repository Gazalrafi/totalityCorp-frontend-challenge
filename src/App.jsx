import React from 'react';
import { Routes,Route } from 'react-router-dom';
import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Checkout, PageNotFound } from "./pages"
import ForgetPassword from './pages/ForgetPassword';

const App = () => {
  return (
   <>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
      </Routes>
   </>
  )
}

export default App