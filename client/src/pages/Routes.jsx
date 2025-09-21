import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Frontend from "./Frontend";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import FAQPage from "../components/FAQ";
import { useSelector } from "react-redux";

const Index = () => {
  const user  = useSelector((state) => state.user.user);
  return (
    <>
      <Routes>
        <Route path="/*" element={<Frontend />} />
        <Route path="auth/*" element={<Auth />} />
        <Route path="dashboard/*" element={user?.role === "admin" ? <Dashboard /> : <Navigate to="/auth/login" />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </>
  );
};

export default Index;
