import React from "react";
import { useLocation } from "wouter";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, navigate] = useLocation();
  const token = localStorage.getItem("autocliptoken");

  if (!token) {
    navigate('/');
  }

  return <>{children}</>;
};

export default RequireAuth;