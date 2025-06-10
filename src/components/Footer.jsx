import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language, translations } = useLanguage();
  const { isDarkMode } = useDarkMode();
  
  // Mevcut kategoriler
  const categories = [
    { id: 1, nameAz: 'Sedan', nameEn: 'Sedan' },
    { id: 2, nameAz: 'SUV', nameEn: 'SUV' },
    { id: 3, nameAz: 'Elektrikli Avtomobillər', nameEn: 'Electric Vehicles' },
    { id: 4, nameAz: 'Klassik Avtomobillər', nameEn: 'Classic Cars' },
    { id: 5, nameAz: 'Yük Avtomobilləri', nameEn: 'Trucks' },
    { id: 6, nameAz: 'Motosikletlər', nameEn: 'Motorcycles' }
  ];

  return (
    <footer className={`${isDarkMode ? 'bg-dark' : 'bg-dark'} py-3 mt-4 border-top border-secondary`}>
      <div className="container">
        <div className="row g-3">
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-car-front-fill text-primary fs-5 me-2"></i>
              <h6 className={`mb-0 text-light`}>AvtoForum</h6>
            </div>
            <p className="text-secondary small">
              {language === 'az' 
                ? 'Avtomobil həvəskarları üçün forum platformu.'
                : 'Forum platform for car enthusiasts.'}
            </p>
            <div className="d-flex gap-2">
              <a href="#" className="text-secondary hover-primary">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-secondary hover-primary">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-secondary hover-primary">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-secondary hover-primary">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-3">
            <h6 className="text-light mb-2">
              {language === 'az' ? 'Sürətli Keçidlər' : 'Quick Links'}
            </h6>
            <ul className="list-unstyled small">
              <li className="mb-1">
                <Link 
                  className="text-secondary hover-primary text-decoration-none" 
                  to="/"
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  {translations[language].home}
                </Link>
              </li>
              <li className="mb-1">
                <Link 
                  className="text-secondary hover-primary text-decoration-none" 
                  to="/categories"
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  {translations[language].categories}
                </Link>
              </li>
              <li className="mb-1">
                <Link 
                  className="text-secondary hover-primary text-decoration-none" 
                  to="/about"
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  {translations[language].about}
                </Link>
              </li>
              <li className="mb-1">
                <Link 
                  className="text-secondary hover-primary text-decoration-none" 
                  to="/contact"
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  {language === 'az' ? 'Əlaqə' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-3">
            <h6 className="text-light mb-2">
              {language === 'az' ? 'Populyar Kateqoriyalar' : 'Popular Categories'}
            </h6>
            <ul className="list-unstyled small">
              {categories.slice(0, 5).map(category => (
                <li key={category.id} className="mb-1">
                  <Link 
                    className="text-secondary hover-primary text-decoration-none" 
                    to={`/categories/${category.id}`}
                  >
                    <i className="bi bi-chevron-right me-1"></i>
                    {language === 'az' ? category.nameAz : category.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-6 mb-3">
            <h6 className="text-light mb-2">
              {language === 'az' ? 'Hüquqi' : 'Legal'}
            </h6>
            <ul className="list-unstyled small">
              <li className="mb-1">
                <Link 
                  className="text-secondary hover-primary text-decoration-none" 
                  to="/privacy"
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  {language === 'az' ? 'Gizlilik Siyasəti' : 'Privacy Policy'}
                </Link>
              </li>
              <li className="mb-1">
                <Link 
                  className="text-secondary hover-primary text-decoration-none" 
                  to="/terms"
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  {language === 'az' ? 'İstifadə Şərtləri' : 'Terms of Service'}
                </Link>
              </li>
            </ul>
            <div className="mt-2">
              <h6 className="text-light small mb-2">
                {language === 'az' ? 'Əlaqə Məlumatları' : 'Contact Info'}
              </h6>
              <p className="text-secondary small mb-1">
                <i className="bi bi-envelope me-1"></i>
                info@avtoforum.az
              </p>
              <p className="text-secondary small mb-1">
                <i className="bi bi-telephone me-1"></i>
                +994 12 345 67 89
              </p>
              <p className="text-secondary small mb-0">
                <i className="bi bi-geo-alt me-1"></i>
                {language === 'az' ? 'Bakı şəhəri, Azərbaycan' : 'Baku city, Azerbaijan'}
              </p>
            </div>
          </div>
        </div>
        
        <hr className="my-2 bg-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-secondary small mb-0">
              &copy; {currentYear} AvtoForum. {language === 'az' ? 'Bütün hüquqlar qorunur.' : 'All rights reserved.'}
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-secondary small mb-0">
              {language === 'az' 
                ? 'Hazırlanıb sevgi ilə ❤️' 
                : 'Made with love ❤️'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;