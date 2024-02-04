import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";

interface AuthContextProps {
  token: string | undefined;
  setToken: (newToken: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken_] = useState<string | undefined>(
    Cookies.get("accessToken")
  );

  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
