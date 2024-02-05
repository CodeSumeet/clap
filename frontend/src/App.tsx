import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import AuthProvider, { useAuth } from "./hooks/useAuth";
import Chats from "./pages/chats/Chats";
import Signup from "./pages/auth/Signup";

function App() {
  const auth = useAuth();

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Redirect to /chats if authenticated, otherwise to /auth/login */}
          <Route
            path="/"
            element={
              auth?.token === undefined ? (
                <Navigate to="/chats" />
              ) : (
                <Navigate to="/auth/login" />
              )
            }
          />

          {/* Chats page accessible only if authenticated */}
          <Route
            path="/chats"
            element={
              auth?.token === undefined ? (
                <Chats />
              ) : (
                <Navigate to="/auth/login" />
              )
            }
          />

          {/* Auth routes */}
          <Route
            path="/auth"
            element={<Navigate to="/auth/login" />}
          />
          <Route
            path="/auth/login"
            element={
              auth?.token === undefined ? <Navigate to="/chats" /> : <Login />
            }
          />
          <Route
            path="/auth/register"
            element={
              auth?.token === undefined ? <Navigate to="/chats" /> : <Signup />
            }
          />

          {/* Catch-all route for unmatched paths */}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
