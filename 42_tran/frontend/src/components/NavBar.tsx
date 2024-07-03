import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ContrastIcon from '@mui/icons-material/Contrast';
import TranslateIcon from '@mui/icons-material/Translate'; // For language switch
import { ThemeContext } from './ThemeContext';

const NavBar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { toggleTheme } = useContext(ThemeContext);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${!isNavCollapsed && 'bg-white'} blur border-radius-xl position-absolute my-3 top-0 z-index-sticky shadow my-3 py-2 start-0 end-0 mx-4`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">DragonPong</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavCollapsed ? 'collapse' : 'collapse show'} navbar-collapse`} id="navbarNavDropdown" style={{ backgroundColor: isNavCollapsed ? '' : 'white' }}>
            <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/game" onClick={() => setIsNavCollapsed(true)}>Jeux</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard" onClick={() => setIsNavCollapsed(true)}>Classement</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/settings" onClick={() => setIsNavCollapsed(true)}>Parametres</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Home" onClick={() => setIsNavCollapsed(true)}>inscription</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Header" onClick={() => setIsNavCollapsed(true)}>inscription2</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Profile" onClick={() => setIsNavCollapsed(true)}>profile</Link>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
              <button onClick={toggleTheme} type="button" className="nav-link btn btn-sm mb-0 me-1">
                <ContrastIcon /> {/* Dark theme toggle icon */}
              </button>
              <button type="button" className="nav-link btn btn-sm mb-0 me-1">
                <TranslateIcon /> {/* Language switch icon */}
              </button>
              <li className="nav-item">
                <Link className="nav-link btn btn-sm mb-0 me-1" to="/login" onClick={() => setIsNavCollapsed(true)}>Connexion</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isNavCollapsed || <div className="navbar-backdrop" />}
    </div>
  );
};

export default NavBar;

