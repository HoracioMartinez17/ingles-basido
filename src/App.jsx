// App.jsx: Componente raíz con rutas
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Phrases from "./screens/Phrases";
import Study from "./screens/Study";
import Tricks from "./screens/Tricks";
import Exam from "./screens/Exam";
import Favorites from "./screens/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phrases" element={<Phrases />} />
          <Route path="/study" element={<Study />} />
          <Route path="/tricks" element={<Tricks />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}
