import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/info/About";
import Terms from "../pages/info/Terms";
import Privacy from "../pages/info/Privacy";
import FAQs from "../pages/info/FAQs";
import TrackOrder from "../pages/info/TrackOrder";
import Contact from "../pages/info/Contact";
import Certifications from "../pages/info/Certifications";
import UserProfile from "../pages/UserProfile/UserProfile";

const Routing = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/deal-of-the-day" element={<Products />} />
        <Route path="/combo-offers" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<UserProfile />} />

        {/* Info Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/organic-certification" element={<Certifications />} />
      </Route>
    </Routes>
  );
};

export default Routing;
