import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  useEffect(() => {
    if (!currentUser) {
      navigate("/", { replace: true });
    } else {
      setLoading(false);
    }
  }, [currentUser, navigate]);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
