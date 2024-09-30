import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./pages/books";
import NotFound from "./pages/notFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/books" element={<Books />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
