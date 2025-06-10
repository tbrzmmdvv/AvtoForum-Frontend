import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';
import axios from 'axios';
import authService from '../api/authService';

const CommentForm = ({ topicId, onCommentAdded }) => {
  const { language, translations } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        setError('Yorum yapmak için giriş yapmalısınız.');
        return;
      }

      const response = await axios.post(
        'http://localhost:8080/api/comments',
        { content, topicId },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      );

      setContent('');
      onCommentAdded(response.data);
    } catch (err) {
      let errorMessage = 'Yorum eklenirken bir hata oluştu.';
      
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm mt-4">
      <div className="card-body p-4">
        <h5 className="card-title mb-3">Yorum Yap</h5>
        
        {error && (
          <div className="alert alert-danger shadow-sm">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Yorumunuzu yazın..."
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <i className="bi bi-send me-2"></i>
            )}
            Yorum Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;