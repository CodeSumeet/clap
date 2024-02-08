import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import { useAuth } from "./hooks/useAuth";
import Chats from "./pages/chats/Chats";
import Signup from "./pages/auth/Signup";

function App() {
  const auth = useAuth();

  return (
    <Router>
      <Routes>
        {/* Redirect to /chats if authenticated, otherwise to /auth/login */}
        <Route
          path="/"
          element={
            auth?.token === null ? (
              <Navigate to="/auth/login" />
            ) : (
              <Navigate to="/chats" />
            )
          }
        />

        {/* Chats page accessible only if authenticated */}
        <Route
          path="/chats"
          element={
            auth?.token === null ? <Navigate to="/auth/login" /> : <Chats />
          }
        />

        {/* Auth routes */}
        <Route
          path="/auth"
          element={<Navigate to="/auth/login" />}
        />
        <Route
          path="/auth/login"
          element={auth?.token === null ? <Login /> : <Navigate to="/chats" />}
        />
        <Route
          path="/auth/register"
          element={auth?.token === null ? <Signup /> : <Navigate to="/chats" />}
        />

        {/* Catch-all route for unmatched paths */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
