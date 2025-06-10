import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';
import axios from 'axios';
import API_URL from "../config";

const HomePage = () => {
  const { language, translations } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_URL+'api/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Kategoriler yüklenirken bir hata oluştu: ' + err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Forum Başlığı ve Açıklama */}
      <div className={`card mb-4 ${isDarkMode ? 'bg-dark-gray text-light' : 'bg-white'}`}>
        <div className="card-body">
          <h1 className="card-title text-primary mb-3">
            <i className="bi bi-car-front-fill me-2"></i>
            AvtoForum
          </h1>
          <p className="card-text lead text-muted">
            Otomobil tutkunlarının buluşma noktasına hoş geldiniz. 
            Sorularınızı sorun, deneyimlerinizi paylaşın ve diğer otomobil severlerle 
            bilgi alışverişinde bulunun.
          </p>
        </div>
      </div>

      {/* Kategoriler */}
      <div className={`card ${isDarkMode ? 'bg-dark-gray text-light' : 'bg-white'}`}>
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-grid me-2"></i>
            Kategoriler
          </h5>
        </div>
        <div className="card-body p-0">
          {categories.length === 0 ? (
            <div className="p-4 text-center text-muted">
              <i className="bi bi-info-circle me-2"></i>
              Henüz kategori bulunmuyor.
            </div>
          ) : (
            <div className="table-responsive">
              <table className={`table mb-0 ${isDarkMode ? 'table-dark' : ''}`}>
                <thead>
                  <tr>
                    <th style={{ width: '50%' }}>Kategori</th>
                    <th style={{ width: '20%' }}>Konular</th>
                    <th style={{ width: '30%' }}>Son Konu</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id}>
                      <td>
                        <Link 
                          to={`/categories/${category.id}`}
                          className={`text-decoration-none ${isDarkMode ? 'text-light' : 'text-dark'}`}
                        >
                          <div className="d-flex align-items-center">
                            <div className={`rounded-circle p-2 me-3 ${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
                              <i className="bi bi-folder text-primary"></i>
                            </div>
                            <div>
                              <h6 className="mb-0">{category.name}</h6>
                              <small className="text-muted">{category.description}</small>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {category.topics?.length || 0} konu
                        </span>
                      </td>
                      <td>
                        {category.lastTopic ? (
                          <div>
                            <Link 
                              to={`/topics/${category.lastTopic.id}`}
                              className={`text-decoration-none ${isDarkMode ? 'text-light' : 'text-dark'}`}
                            >
                              {category.lastTopic.title}
                            </Link>
                            <div className="small text-muted">
                              {new Date(category.lastTopic.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted">Henüz konu yok</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;