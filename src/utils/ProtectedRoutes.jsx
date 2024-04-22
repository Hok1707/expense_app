import { Navigate, Outlet, useLocation } from "react-router-dom";
import localStorageUtil from "./LocalStorage";

const PrivateRoutes = () => {
  const location = useLocation();

  return localStorageUtil.localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
