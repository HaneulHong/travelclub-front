import React from "react";
import Layout from "../component/layout/Layout";
import { Outlet } from "react-router-dom";



const MainPage = () => {

  return (
    <Layout>
        <Outlet />
    </Layout>
  );
};

export default MainPage;
