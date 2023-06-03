import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLogin from "./Pages/AdminLogin";
import Dashboard from "./Pages/Dashboard";

import MyProfile from "./Pages/MyAccount/MyProfile";

import Orders from "./Pages/Orders/Orders";
import ViewSingleOrder from "./Pages/Orders/ViewSingleOrder";
import Invoice from "./Pages/Orders/Invoice";

import Products from "./Pages/Products/Products";
import ViewSingleProduct from "./Pages/Products/ViewSingleProduct";
import AddProducts from "./Pages/Products/AddProducts";

import SubAdmin from "./Pages/Sub-Admin/SubAdmin";
import CreateNewAdmin from "./Pages/Sub-Admin/CreateNewAdmin";

import Customers from "./Pages/Customers/Customers";
import ViewCustomerOrder from "./Pages/Customers/ViewCustomerOrder";

import ErrorPage from "../Utils/ErrorPage";

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route exect path="/" element={<AdminLogin />} />
        <Route exect path="/admin/dashboard" element={<Dashboard />} />
        {/* //! My Profile */}
        <Route exect path="/admin/my-profile" element={<MyProfile />} />
        {/* //! Orders */}
        <Route exect path="/admin/orders" element={<Orders />} />
        <Route exect path="/admin/order/:id" element={<ViewSingleOrder/>} />
        <Route exect path="/admin/order/invoice" element={<Invoice/>} />
        {/* //! Products */}
        <Route exect path="/admin/products" element={<Products />} />
        <Route exect path="/admin/product/view/:id" element={<ViewSingleProduct/>} />
        <Route exect path="/admin/products/add-product" element={<AddProducts />} />
        {/* //! Customers */}
        <Route exect path="/admin/customers" element={<Customers />} />
        <Route exect path="/admin/customer/view-order/:id" element={<ViewCustomerOrder />} />
        {/* //! Sub Admins */}
        <Route exect path="/admin/view-admin" element={<SubAdmin />} />
        <Route exect path="/admin/create-admin" element={<CreateNewAdmin />} />

        {/* //! Page Not Found. */}
        <Route path="/*" element={<ErrorPage/>} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
