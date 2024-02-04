import { FC, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

interface AuthenticatedRouteProps {}

const AuthenticatedRoute: FC<AuthenticatedRouteProps> = () => {
  const auth = useAuth();

  const token = Cookies.get("accessToken");

  if (token === undefined) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    auth?.setToken(token);
  }, [auth]);

  return <Outlet />;
};

export default AuthenticatedRoute;
