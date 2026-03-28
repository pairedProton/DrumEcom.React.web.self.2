import React from "react";
import Navbar from "../components/layout/navbar/Navbar";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";
import {footerLinks, footerContact} from "../constants/footerData";
import AuthModal from "../components/auth/AuthModal";


const MainLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer footerLinks={footerLinks} footerContact={footerContact} />
      <AuthModal />
    </div>
  );
};

export default MainLayout;
