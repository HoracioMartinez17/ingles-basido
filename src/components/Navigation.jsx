// VIEW: Componente de navegación principal con iconos, animaciones y menú hamburguesa
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const THEME_STORAGE_KEY = "english-waiter-theme";

export default function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navItems = [
    { path: "/", icon: "🏠", label: "Inicio", label_short: "Inicio" },
    { path: "/phrases", icon: "📚", label: "Frases", label_short: "Frases" },
    { path: "/study", icon: "🎓", label: "Estudio", label_short: "Estudio" },
    { path: "/tricks", icon: "✨", label: "Trucos", label_short: "Trucos" },
    { path: "/exam", icon: "✏️", label: "Examen", label_short: "Examen" },
    { path: "/favorites", icon: "⭐", label: "Favoritos", label_short: "Favs" },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;

    setIsDarkMode(shouldUseDark);
    root.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
      return next;
    });
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg sticky top-0 z-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-3">
        {/* Header con Logo y Hamburguesa */}
        <div className="flex justify-between items-center mb-3 sm:mb-0">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleLinkClick}
            className="text-xl sm:text-2xl font-bold hover:opacity-90 transition-opacity flex-1 text-center sm:flex-none"
          >
            🍷 English Waiter
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-400 hover:bg-blue-500 transition-all dark:bg-slate-700 dark:hover:bg-slate-600"
              aria-label="Cambiar tema"
              title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              <span className="text-xl">{isDarkMode ? "☀️" : "🌙"}</span>
            </button>

            {/* Botón Hamburguesa (solo móvil) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-blue-400 hover:bg-blue-500 transition-all dark:bg-slate-700 dark:hover:bg-slate-600"
              aria-label="Toggle menu"
            >
              <span className="text-2xl">{mobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Navegación Desktop */}
        <div className="hidden sm:flex justify-center gap-1 sm:gap-2 flex-wrap">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base
                transition-all duration-300 transform
                ${
                  isActive(item.path)
                    ? "bg-white text-blue-600 shadow-lg scale-105 dark:bg-slate-100"
                    : "bg-blue-400 hover:bg-blue-500 text-white hover:scale-105 dark:bg-slate-700 dark:hover:bg-slate-600"
                }
              `}
              title={item.label}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Navegación Mobile (Desplegable) */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pb-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`
                    flex items-center gap-2 px-3 py-3 rounded-lg font-semibold text-sm
                    transition-all duration-300 transform
                    ${
                      isActive(item.path)
                        ? "bg-white text-blue-600 shadow-lg dark:bg-slate-100"
                        : "bg-blue-400 hover:bg-blue-500 text-white dark:bg-slate-700 dark:hover:bg-slate-600"
                    }
                  `}
                  title={item.label}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
