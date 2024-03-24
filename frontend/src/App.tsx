import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/home/Home";
import Signup from "./pages/auth/Signup";
import Welcome from "./pages/home/Welcome";

function App() {
  const auth = useAuth();

  return (
    <Router>
      <Routes>
        {/* LANDING PAGE: SHOW WELCOME COMPONENT IF NOT AUTHENTICATED, OTHERWISE REDIRECT TO HOME */}
        <Route
          path="/"
          element={auth?.token ? <Navigate to="/home" /> : <Welcome />}
        />

        {/* HOME ROUTE: REDIRECT TO LOGIN IF NOT AUTHENTICATED */}
        <Route
          path="/home"
          element={auth?.token ? <Home /> : <Navigate to="/auth/login" />}
        />

        {/* LOGIN ROUTE: REDIRECT TO HOME IF AUTHENTICATED */}
        <Route
          path="/auth/login"
          element={auth?.token ? <Navigate to="/home" /> : <Login />}
        />

        {/* REGISTER ROUTE: REDIRECT TO HOME IF AUTHENTICATED */}
        <Route
          path="/auth/register"
          element={auth?.token ? <Navigate to="/home" /> : <Signup />}
        />

        {/* CATCH-ALL ROUTE: REDIRECT TO HOME */}
        <Route
          path="*"
          element={<Navigate to="/home" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
