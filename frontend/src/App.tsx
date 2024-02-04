import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import AuthProvider from "./hooks/useAuth";
import Home from "./pages/home/Home";
import AuthenticatedRoute from "./components/auth/AuthenticatedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<AuthenticatedRoute />}
          >
            <Route
              path="/"
              element={<Home />}
            />
          </Route>
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
