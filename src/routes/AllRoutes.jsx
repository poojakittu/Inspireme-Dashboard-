import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import AddProducts from "../pages/AddProducts";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import Order from "../pages/Order";
import Products from "../pages/Products";
import ResetPassword from "../pages/ResetPassword";
import TodaysOrder from "../pages/TodaysOrder";
import PrivateRoute from "./PrivateRoute";
import SingleProduct from "../pages/SingleProduct";
import Users from "../pages/Domain";
import Exchange from "../pages/Exchange";
import AllPromoCode from "../pages/AllPromoCode";
import EditPromoCode from "../pages/EditPromoCode";
import SingleOrder from "../pages/SingleOrder";
import Domain from "../pages/Domain";
import EditDomain from "../pages/EditDomain";
import OldPostData from "../pages/Old_phone";

import EmailList from "../pages/Allusers";
import EditEmail from "../pages/EditEmail";
import SingleProductPage from "../pages/SingleProductPage";
import AddPolicyPage from "../pages/AddPolicy";
import Allpolicies from "../pages/AllPolicy";
import AddReturnPolicyPage from "../pages/AddReturnPoliy";
import AllreturnPolicies from "../pages/AllreturnPolicy";
import AllBeforePolicy from "../pages/Beforestartpolicy";
import AddBeforePolicy from "../pages/AddBeforestartpolicy";
import AllAggrementPolicies from "../pages/AgrrementPolicy";
import AddAggrementPolicy from "../pages/AddAggrement";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="allproducts" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="allproducts/:id" element={<PrivateRoute><SingleProduct /></PrivateRoute>} />
        <Route path="addproducts" element={<PrivateRoute><AddProducts /></PrivateRoute>} />
        <Route path="allorders" element={<PrivateRoute><Order /></PrivateRoute>} />
        <Route path="allorders/:id" element={<PrivateRoute><SingleOrder /></PrivateRoute>} />
        <Route path="todaysorders" element={<PrivateRoute><TodaysOrder /></PrivateRoute>} />
        <Route path="domain" element={<PrivateRoute><Domain /></PrivateRoute>} />
        <Route path="domain/:id" element={<PrivateRoute><EditDomain /></PrivateRoute>} />
        <Route path="exchange" element={<PrivateRoute><Exchange /></PrivateRoute>} />
        <Route path="oldPhone" element={<PrivateRoute><OldPostData /></PrivateRoute>} />
        <Route path="allPromocode" element={<PrivateRoute><AllPromoCode /></PrivateRoute>} />
        <Route path="allusers" element={<PrivateRoute><EmailList /></PrivateRoute>} />
        <Route path="allusers/:id" element={<PrivateRoute><EditEmail /></PrivateRoute>} />
        <Route path="allPromocode/:id" element={<PrivateRoute><EditPromoCode /></PrivateRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="policy" element={<PrivateRoute><AddPolicyPage /></PrivateRoute>} />
        <Route path="Allpolicy" element={<PrivateRoute><Allpolicies /></PrivateRoute>} />
        <Route path="returnpolicy" element={<PrivateRoute><AddReturnPolicyPage/></PrivateRoute>} />
        <Route path="allreturnpolicy" element={<PrivateRoute><AllreturnPolicies /></PrivateRoute>} />

        <Route path="allbeforepolicy" element={<PrivateRoute><AllBeforePolicy /></PrivateRoute>} />
        <Route path="addbeforepolicy" element={<PrivateRoute><AddBeforePolicy /></PrivateRoute>} />
        <Route path="allaggrement" element={<PrivateRoute><AllAggrementPolicies /></PrivateRoute>} />
        <Route path="addaggrementpolicy" element={<PrivateRoute><AddAggrementPolicy /></PrivateRoute>} />

        <Route path="new/:id" element={<PrivateRoute><SingleProductPage /></PrivateRoute>} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
