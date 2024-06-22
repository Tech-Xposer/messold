import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-24 p-4 w-full">
        <Outlet />
      </main>
      <Footer/>
      <ToastContainer/>
    </div>
  );
};

export default Layout;
