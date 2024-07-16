import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "../pages/main/GoUp";

const HeaderFooter = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default HeaderFooter;

