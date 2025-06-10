import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';
import axios from 'axios';
import authService from '../api/authService';
import API_URL from "../config";

const CreateTopicPage = () => {
  const { language, translations } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: new URLSearchParams(location.search).get('categoryId') || '',
    imageUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_URL+'api/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Kategoriler yüklenirken hata oluştu:', err);
      }
    };

    fetchCategories();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Başlık alanı zorunludur';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Başlık en az 3 karakter olmalıdır';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'İçerik alanı zorunludur';
    } else if (formData.content.length < 10) {
      newErrors.content = 'İçerik en az 10 karakter olmalıdır';
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Kategori seçimi zorunludur';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Hata mesajını temizle
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        API_URL+'api/topics',
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      );

      navigate(`/topics/${response.data.id}`);
    } catch (err) {
      let errorMessage = 'Konu oluşturulurken bir hata oluştu.';
      
      if (err.response) {
        errorMessage = err.response.data.message || errorMessage;
      } else if (err.request) {
        errorMessage = 'Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.';
      } else {
        errorMessage = err.message;
      }
      
      setSubmitError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className={`card ${isDarkMode ? 'bg-dark-gray text-light' : 'bg-white'}`}>
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-plus-circle me-2"></i>
            Yeni Konu Oluştur
          </h5>
        </div>
        <div className="card-body">
          {submitError && (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Başlık</label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''} ${isDarkMode ? 'bg-dark text-light' : ''}`}
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Konu başlığını yazın..."
              />
              {errors.title && (
                <div className="invalid-feedback">
                  {errors.title}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">Kategori</label>
              <select
                className={`form-select ${errors.categoryId ? 'is-invalid' : ''} ${isDarkMode ? 'bg-dark text-light' : ''}`}
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Kategori seçin</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <div className="invalid-feedback">
                  {errors.categoryId}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label">İçerik</label>
              <textarea
                className={`form-control ${errors.content ? 'is-invalid' : ''} ${isDarkMode ? 'bg-dark text-light' : ''}`}
                id="content"
                name="content"
                rows="6"
                value={formData.content}
                onChange={handleChange}
                placeholder="Konu içeriğini yazın..."
              />
              {errors.content && (
                <div className="invalid-feedback">
                  {errors.content}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="imageUrl" className="form-label">Resim URL (İsteğe Bağlı)</label>
              <input
                type="url"
                className={`form-control ${isDarkMode ? 'bg-dark text-light' : ''}`}
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Geri Dön
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Konu Oluştur
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTopicPage;