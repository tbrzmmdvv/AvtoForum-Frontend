import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../api/authService';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Kategoriler yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  if (loading) {
    return <div>Kategoriler yükleniyor...</div>;
  }
  
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  
  return (
    <div className="category-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Kategoriler</h2>
        {currentUser?.roles.includes("ROLE_ADMIN") && (
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/categories/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Yeni Kategori Oluştur
          </button>
        )}
      </div>
      <div className="row">
        {categories.map((category) => (
          <div className="col-md-4 mb-4" key={category.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.description}</p>
                <p>Konu Sayısı: {category.topicCount}</p>
                <Link to={`/categories/${category.id}`} className="btn btn-primary">
                  Konuları Görüntüle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;