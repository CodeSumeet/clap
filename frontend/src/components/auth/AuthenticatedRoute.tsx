import { FC, ReactNode, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      navigate("/chats");
    } else {
      navigate("/auth/login");
    }
  }, [auth?.token]);

  return children;
};

export default AuthenticatedRoute;
