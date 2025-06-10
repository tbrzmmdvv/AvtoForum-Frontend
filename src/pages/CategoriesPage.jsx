import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../api/authService';
import API_URL from '../config';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_URL+'api/categories');
        console.log("Fetching categories from URL:", url);
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
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger shadow-sm" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="text-primary">Kategoriler</h1>
          <p className="lead text-muted">
            Tüm tartışma kategorilerini keşfedin ve ilgi alanlarınıza göre konulara katılın.
          </p>
        </div>
        <div className="col-md-4 text-end">
          {currentUser?.roles?.includes('ROLE_ADMIN') && (
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/categories/create')}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Yeni Kategori Ekle
            </button>
          )}
        </div>
      </div>

      <div className="row">
        {categories.map(category => (
          <div key={category.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title text-primary mb-0">{category.name}</h5>
                  <span className="badge bg-primary">
                    <i className="bi bi-folder me-1"></i>
                    {category.topics?.length || 0} konu
                  </span>
                </div>
                <p className="card-text text-muted mb-4">{category.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <Link 
                    to={`/categories/${category.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    <i className="bi bi-arrow-right me-1"></i>
                    Konuları Gör
                  </Link>
                  {currentUser?.roles?.includes('ROLE_ADMIN') && (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => navigate(`/categories/${category.id}/edit`)}
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Düzenle
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="alert alert-info shadow-sm">
          <i className="bi bi-info-circle me-2"></i>
          Henüz kategori bulunmuyor.
        </div>
      )}
    </div>
  );
};

export default CategoriesPage; 