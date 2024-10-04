import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Books from "@pages/books";
import NotFound from "@pages/notFound";
import Login from "@pages/login";
import ProtectedRoute from "@components/protectedRoute";

function App() {
  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn() ? (
                <Navigate to="/books" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
