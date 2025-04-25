import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const [username, setUsername] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('username');
    if (name) setUsername(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/'; // ✅ Recarga la app y fuerza volver al login
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/characters">
            <span className="logo-text">FUTURAMA</span>
          </Link>
        </div>

        <div className="navbar-links">
          <Link 
            to="/characters" 
            className={location.pathname === '/characters' ? 'active' : ''}
          >
            Personajes
          </Link>
          <Link 
            to="/form" 
            className={location.pathname === '/form' ? 'active' : ''}
          >
            Formulario
          </Link>
          <Link 
            to="/about" 
            className={location.pathname === '/about' ? 'active' : ''}
          >
            Acerca de
          </Link>

          {/* Botón de modo oscuro */}
          <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle-btn">
            {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
          </button>

          {/* Usuario logueado */}
          {username && (
            <div className="user-menu">
              <span className="username" onClick={() => setShowMenu(!showMenu)}>
                👤 {username}
              </span>
              {showMenu && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
