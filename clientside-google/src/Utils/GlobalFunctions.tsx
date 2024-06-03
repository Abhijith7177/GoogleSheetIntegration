import { IRouterParams } from "../interfaces/interface";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const ProductedRouter: React.FC<IRouterParams> = ({ children }) => {
  const token = Cookies.get("token");
  return token !== undefined ? <>{children}</> : <Navigate to="/login" />;
};

export const PublicRouter: React.FC<IRouterParams> = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (token !== undefined) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [token]);
  return <>{children}</>;
};
