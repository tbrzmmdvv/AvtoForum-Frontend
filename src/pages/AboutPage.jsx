import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';

const AboutPage = () => {
  const { language, translations } = useLanguage();
  const { isDarkMode } = useDarkMode();

  const content = {
    az: {
      whoWeAre: 'AvtoForum, avtomobil həvəskarlarının görüşmə nöqtəsidir. 2024-cü ildə qurulan platformamız, avtomobil maraqlılarının məlumat mübadiləsi edə biləcəyi, müzakirə edə biləcəyi və bir-biri ilə əlaqə qura biləcəyi bir cəmiyyət yaratmağı hədəfləyir.',
      mission: 'Avtomobil həvəskarlarını bir araya gətirərək, məlumat mübadiləsini təşviq etmək və avtomobil dünyasındakı inkişafları izləmək üçün etibarlı bir platform təqdim etməkdir.',
      vision: 'Azərbaycanın ən böyük avtomobil cəmiyyəti olmaq və avtomobil sənayesində istinad nöqtəsinə çevrilməkdir.',
      features: [
        'Kateqoriyalara bölünmüş müzakirə platforması',
        'Mütəxəssis rəyləri və texniki məlumatlar',
        'Avtomobil xəbərləri və güncəl inkişaflar',
        'İstifadəçi dostu interfeys',
        'Təhlükəsiz və moderatorlu mühit'
      ],
      community: 'AvtoForum, minlərlə aktiv üzvü ilə böyüyən bir cəmiyyətdir. Hər gün yeni üzvlərin qoşulması ilə daha da güclənirik.'
    },
    en: {
      whoWeAre: 'AvtoForum is the meeting point for car enthusiasts. Our platform, established in 2024, aims to create a community where car enthusiasts can share information, discuss, and communicate with each other.',
      mission: 'To bring car enthusiasts together, encourage information sharing, and provide a reliable platform for following developments in the automotive world.',
      vision: 'To become Azerbaijan\'s largest car community and a reference point in the automotive industry.',
      features: [
        'Categorized discussion platform',
        'Expert opinions and technical information',
        'Car news and current developments',
        'User-friendly interface',
        'Safe and moderated environment'
      ],
      community: 'AvtoForum is a growing community with thousands of active members. We are getting stronger every day with the participation of new members.'
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className={`card border-0 shadow-sm ${isDarkMode ? 'bg-dark' : ''}`}>
            <div className="card-body p-4">
              <h1 className={`text-primary mb-4 ${isDarkMode ? 'text-light' : ''}`}>
                {translations[language].about}
              </h1>
              
              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  <i className="bi bi-info-circle me-2"></i>
                  {translations[language].whoWeAre}
                </h2>
                <p className={`lead ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                  {content[language].whoWeAre}
                </p>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  <i className="bi bi-lightbulb me-2"></i>
                  {translations[language].mission}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].mission}
                </p>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  <i className="bi bi-eye me-2"></i>
                  {translations[language].vision}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].vision}
                </p>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  <i className="bi bi-check-circle me-2"></i>
                  {translations[language].whatWeOffer}
                </h2>
                <ul className={`list-unstyled ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                  {content[language].features.map((feature, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  <i className="bi bi-people me-2"></i>
                  {translations[language].ourCommunity}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].community}
                </p>
              </div>

              <div className="text-center mt-4">
                <Link to="/register" className={`btn btn-primary me-2 ${isDarkMode ? 'btn-light' : ''}`}>
                  <i className="bi bi-person-plus me-2"></i>
                  {translations[language].joinUs}
                </Link>
                <Link to="/contact" className={`btn btn-outline-primary me-2 ${isDarkMode ? 'btn-outline-light' : ''}`}>
                  <i className="bi bi-envelope me-2"></i>
                  {translations[language].contactUs}
                </Link>
                <a 
                  href="https://www.youtube.com/watch?v=A6a2uITki1Y" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`btn btn-outline-success ${isDarkMode ? 'btn-outline-light' : ''}`}
                >
                  <i className="bi bi-music-note-beamed me-2"></i>
                  {translations[language].specialSurprise}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 