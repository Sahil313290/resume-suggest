import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';
import Logo from './components/Logo';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeProvider value={{ darkMode, setDarkMode }}>
      <Router>
        <div className={`app-container ${darkMode ? 'dark' : ''}`}>
          <div className="particles-container">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="particle" />
            ))}
          </div>
          
          <header className="app-header glass-card">
            <div className="header-content">
              <Logo />
              <Navbar />
            </div>
          </header>

          <main className="app-main">
            <div className="content-wrapper glass-card">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 