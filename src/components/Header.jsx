import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../api/authService';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';

const Header = () => {
  const navigate = useNavigate();
  const { language, translations, changeLanguage } = useLanguage();
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentUser = authService.getCurrentUser();
  
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  
  return (
    <header className={`navbar navbar-expand-lg sticky-top ${isDarkMode ? 'navbar-dark bg-dark-gray' : 'navbar-light bg-white'}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-car-front-fill text-primary fs-4 me-2"></i>
          <span>AvtoForum</span>
        </Link>
        
        <div className="d-flex align-items-center">
          <div className="me-3">
            <select 
              className="language-select"
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="az">AZ</option>
              <option value="en">EN</option>
            </select>
          </div>
          
          <button 
            className={`btn btn-sm ${isDarkMode ? 'btn-outline-light' : 'btn-nav-outline'} me-3`}
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? translations[language].lightMode : translations[language].darkMode}
          >
            <i className={`bi bi-${isDarkMode ? 'sun' : 'moon'}`}></i>
          </button>

          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setIsMenuOpen(false)}>
                <i className="bi bi-house-door me-1"></i>
                {translations[language].home}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories" onClick={() => setIsMenuOpen(false)}>
                <i className="bi bi-grid me-1"></i>
                {translations[language].categories}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={() => setIsMenuOpen(false)}>
                <i className="bi bi-info-circle me-1"></i>
                {translations[language].about}
              </Link>
            </li>
          </ul>
          
          <form className="search-form me-3">
            <input 
              className="form-control"
              type="search" 
              placeholder={translations[language].search}
              aria-label="Search"
            />
            <button className="btn" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
          
          {currentUser ? (
            <>
              <div className="d-flex align-items-center">
                <Link 
                  to="/topics/create" 
                  className={`btn btn-nav ${isDarkMode ? 'btn-outline-light' : 'btn-nav-primary'} me-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="bi bi-plus-lg me-1"></i>
                  {language === 'az' ? 'Yeni Mövzu' : 'New Topic'}
                </Link>
              </div>
              
              <div className="position-relative">
                <button 
                  className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-nav-outline'} d-flex align-items-center`}
                  type="button" 
                  onClick={toggleDropdown}
                >
                  <img
                    src={currentUser.profilePicture || '/default-avatar.png'}
                    alt={currentUser.username}
                    className="rounded-circle me-2"
                    style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                  />
                  <span className="d-none d-md-inline">{currentUser.username}</span>
                  <i className={`bi bi-chevron-${isDropdownOpen ? 'up' : 'down'} ms-1`}></i>
                </button>
                
                {isDropdownOpen && (
                  <div 
                    className={`dropdown-menu show ${isDarkMode ? 'bg-dark-gray' : 'bg-white'}`}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      zIndex: 1000,
                      minWidth: '200px',
                      boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                      display: 'block'
                    }}
                  >
                    <Link 
                      className={`dropdown-item ${isDarkMode ? 'text-light' : 'text-dark'}`}
                      to="/profile"
                      onClick={() => {
                        closeDropdown();
                        setIsMenuOpen(false);
                      }}
                    >
                      <i className="bi bi-person me-2"></i>
                      {translations[language].profile}
                    </Link>
                    <Link 
                      className={`dropdown-item ${isDarkMode ? 'text-light' : 'text-dark'}`}
                      to="/my-topics"
                      onClick={() => {
                        closeDropdown();
                        setIsMenuOpen(false);
                      }}
                    >
                      <i className="bi bi-file-text me-2"></i>
                      {translations[language].myTopics}
                    </Link>
                    {currentUser.roles && currentUser.roles.includes("ROLE_ADMIN") && (
                      <>
                        <Link 
                          className={`dropdown-item ${isDarkMode ? 'text-light' : 'text-dark'}`}
                          to="/admin"
                          onClick={() => {
                            closeDropdown();
                            setIsMenuOpen(false);
                          }}
                        >
                          <i className="bi bi-gear me-2"></i>
                          {translations[language].adminPanel}
                        </Link>
                        <Link 
                          className={`dropdown-item ${isDarkMode ? 'text-light' : 'text-dark'}`}
                          to="/categories/create"
                          onClick={() => {
                            closeDropdown();
                            setIsMenuOpen(false);
                          }}
                        >
                          <i className="bi bi-plus-circle me-2"></i>
                          {translations[language].createCategory}
                        </Link>
                      </>
                    )}
                    <div className={`dropdown-divider ${isDarkMode ? 'bg-light' : 'bg-dark'}`}></div>
                    <button 
                      className={`dropdown-item ${isDarkMode ? 'text-light' : 'text-dark'}`}
                      onClick={() => {
                        closeDropdown();
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      {translations[language].logout}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`btn btn-nav ${isDarkMode ? 'btn-outline-light' : 'btn-nav-outline'} me-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>
                {translations[language].login}
              </Link>
              <Link 
                to="/register" 
                className={`btn btn-nav ${isDarkMode ? 'btn-light' : 'btn-nav-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="bi bi-person-plus me-1"></i>
                {translations[language].register}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;