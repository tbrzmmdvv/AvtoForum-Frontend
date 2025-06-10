import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TopicPage from './pages/TopicPage';
import CategoryPage from './pages/CategoryPage';
import CreateCategoryPage from './pages/CreateCategoryPage';
import CreateTopicPage from './pages/CreateTopicPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';
import setupAxiosInterceptors from './api/axiosConfig';
import authService from './api/authService';
import './styles/App.css';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import { LanguageProvider } from './context/LanguageContext';
import { DarkModeProvider } from './context/DarkModeContext';

// Koruma altına alınmış rota için bileşen
const PrivateRoute = ({ children }) => {
  const currentUser = authService.getCurrentUser();
  
  return currentUser ? children : <Navigate to="/login" />;
};

// Admin rotası için bileşen
const AdminRoute = ({ children }) => {
  const currentUser = authService.getCurrentUser();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Kullanıcının admin rolü var mı kontrol et
  const isAdmin = currentUser.roles.includes("ROLE_ADMIN");
  
  return isAdmin ? children : <Navigate to="/" />;
};

const App = () => {
  useEffect(() => {
    // Axios interceptor'ları kur
    setupAxiosInterceptors();

    // Load Bootstrap JavaScript
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
    script.integrity = 'sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <LanguageProvider>
      <DarkModeProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/topics/:id" element={<TopicPage />} />
                <Route path="/categories/:id" element={<CategoryPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route 
                  path="/categories/create" 
                  element={
                    <AdminRoute>
                      <CreateCategoryPage />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/topics/create" 
                  element={
                    <PrivateRoute>
                      <CreateTopicPage />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/my-topics" 
                  element={
                    <PrivateRoute>
                      <div>Konularım</div>
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <div>Yönetim Paneli</div>
                    </AdminRoute>
                  } 
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/faq" element={<div className="container mt-4"><h2>SSS</h2></div>} />
                <Route path="*" element={<div className="container mt-4"><h2>Sayfa Bulunamadı</h2></div>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </DarkModeProvider>
    </LanguageProvider>
  );
};

export default App;