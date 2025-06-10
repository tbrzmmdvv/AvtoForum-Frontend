import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';
import axios from 'axios';

const CategoryPage = () => {
  const { language, translations } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, topicsResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/categories/${id}`),
          axios.get(`http://localhost:8080/api/topics/category/${id}`)
        ]);
        setCategory(categoryResponse.data);
        setTopics(topicsResponse.data);
        setLoading(false);
      } catch (err) {
        let errorMessage = 'Veriler yüklenirken bir hata oluştu.';
        
        if (err.response) {
          // Sunucudan gelen hata mesajı
          errorMessage = err.response.data.message || errorMessage;
        } else if (err.request) {
          // İstek yapıldı ama yanıt alınamadı
          errorMessage = 'Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.';
        } else {
          // İstek yapılırken bir hata oluştu
          errorMessage = err.message;
        }
        
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
          <div className="mt-2">
            <Link to="/" className="btn btn-outline-danger btn-sm">
              <i className="bi bi-arrow-left me-1"></i>
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Kategori Başlığı */}
      <div className={`card mb-4 ${isDarkMode ? 'bg-dark-gray text-light' : 'bg-white'}`}>
        <div className="card-body">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className={`text-decoration-none ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                  <i className="bi bi-house-door me-1"></i>
                  Ana Sayfa
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {category?.name}
              </li>
            </ol>
          </nav>
          <h1 className="card-title text-primary mb-3">
            <i className="bi bi-folder me-2"></i>
            {category?.name}
          </h1>
          <p className="card-text text-muted">{category?.description}</p>
        </div>
      </div>

      {/* Konular */}
      <div className={`card ${isDarkMode ? 'bg-dark-gray text-light' : 'bg-white'}`}>
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-chat-dots me-2"></i>
            Konular
          </h5>
          <Link to={`/topics/create?categoryId=${id}`} className="btn btn-light btn-sm">
            <i className="bi bi-plus-circle me-1"></i>
            Yeni Konu
          </Link>
        </div>
        <div className="card-body p-0">
          {topics.length === 0 ? (
            <div className="p-4 text-center text-muted">
              <i className="bi bi-info-circle me-2"></i>
              Henüz konu bulunmuyor.
            </div>
          ) : (
            <div className="table-responsive">
              <table className={`table mb-0 ${isDarkMode ? 'table-dark' : ''}`}>
                <thead>
                  <tr>
                    <th style={{ width: '50%' }}>Konu</th>
                    <th style={{ width: '20%' }}>Yazar</th>
                    <th style={{ width: '15%' }}>Yanıtlar</th>
                    <th style={{ width: '15%' }}>Son Mesaj</th>
                  </tr>
                </thead>
                <tbody>
                  {topics.map(topic => (
                    <tr key={topic.id}>
                      <td>
                        <Link 
                          to={`/topics/${topic.id}`}
                          className={`text-decoration-none ${isDarkMode ? 'text-light' : 'text-dark'}`}
                        >
                          <div className="d-flex align-items-center">
                            <div className={`rounded-circle p-2 me-3 ${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
                              <i className="bi bi-chat-left-text text-primary"></i>
                            </div>
                            <div>
                              <h6 className="mb-0">{topic.title}</h6>
                              <small className="text-muted">
                                {new Date(topic.createdAt).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={topic.user?.profilePicture || 'https://via.placeholder.com/40'} 
                            alt={topic.user?.username || 'Anonim'}
                            className="rounded-circle me-2"
                            width="30"
                            height="30"
                          />
                          <span>{topic.user?.username || 'Anonim'}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {topic.comments?.length || 0} yanıt
                        </span>
                      </td>
                      <td>
                        {topic.lastComment ? (
                          <div>
                            <small className="text-muted">
                              {new Date(topic.lastComment.createdAt).toLocaleDateString()}
                            </small>
                            <div className="small">
                              {topic.lastComment.user?.username || 'Anonim'}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted">Henüz yanıt yok</span>
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

export default CategoryPage;