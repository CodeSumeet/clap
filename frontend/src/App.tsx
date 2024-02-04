import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import AuthProvider from "./hooks/useAuth";
import AuthenticatedRoute from "./components/auth/AuthenticatedRoute";
import Chats from "./pages/chats/Chats";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/chats"
            element={
              <AuthenticatedRoute>
                <Chats />
              </AuthenticatedRoute>
            }
          ></Route>

          {/*  */}
          <Route
            index
            path="/auth"
            element={<Navigate to="/auth/login" />}
          />
          <Route
            path="/auth/login"
            element={<Login />}
          />
          <Route
            path="/auth/signup"
            element={<Signup />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
