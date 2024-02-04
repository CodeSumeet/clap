import { FC, ReactNode, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (location.pathname === "/") {
      if (token) {
        return navigate("/chats");
      } else {
        return navigate("/auth/login");
      }
    }
  }, [auth, location]);

  return children;
};

export default AuthenticatedRoute;
