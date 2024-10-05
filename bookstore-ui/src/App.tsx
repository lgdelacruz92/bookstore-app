import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "@pages/home";
import NotFound from "@pages/notFound";
import Login from "@pages/login";
import ProtectedRoute from "@components/protectedRoute";
import Books from "@pages/books/books";
import Favorites from "@pages/favorites";

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
                <Navigate to="/home/books" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Navigate to="/home/books" replace />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route path="books" element={<Books />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
