import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentForm from '../components/CommentForm';
import CommentItem from '../components/CommentItem';
import authService from '../api/authService';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';
import API_URL from "../config";

const TopicPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, translations } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(API_URL+`api/topics/${id}`);
        if (response.data) {
          setTopic(response.data);
          // Yorumları ayrı bir API çağrısı ile al
          const commentsResponse = await axios.get(API_URL+`api/comments/topic/${id}`);
          if (commentsResponse.data) {
            setComments(commentsResponse.data);
          }
        }
      } catch (err) {
        let errorMessage = 'Konu yüklenirken bir hata oluştu.';
        
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

    const incrementViews = async () => {
      try {
        await axios.put(API_URL+`api/topics/${id}/increment-views`);
      } catch (error) {
        console.error('Görüntülenme sayısı artırılırken hata oluştu:', error);
      }
    };

    fetchTopic();
    incrementViews();
  }, [id]);

  const handleCommentAdded = (newComment) => {
    setComments(prevComments => [newComment, ...prevComments]);
  };

  const handleCommentDeleted = (commentId) => {
    setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
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

  if (!topic) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Konu bulunamadı
        </div>
      </div>
    );
  }

  return (
    <div className={`container mt-4 ${isDarkMode ? 'text-light' : ''}`}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className={isDarkMode ? 'text-light' : ''}>Ana Sayfa</Link>
          </li>
          {topic.category && (
            <li className="breadcrumb-item">
              <Link to={`/categories/${topic.category.id}`} className={isDarkMode ? 'text-light' : ''}>
                {topic.category.name}
              </Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">{topic.title}</li>
        </ol>
      </nav>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h1 className="card-title h3 mb-0">{topic.title}</h1>
            <div className="text-muted">
              <small>
                {new Date(topic.createdAt).toLocaleString('tr-TR')}
                <span className="ms-2">
                  <i className="bi bi-eye me-1"></i>
                  {topic.views || 0}
                </span>
              </small>
            </div>
          </div>

          <div className="d-flex align-items-center mb-4">
            <img
              src={topic.user?.profilePicture || '/default-avatar.png'}
              alt={topic.user?.username || 'Anonim'}
              className="rounded-circle me-3"
              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
            <div>
              <h6 className="mb-0">{topic.user?.username || 'Anonim'}</h6>
              <small className="text-muted">
                {topic.category?.name || 'Kategori Yok'}
              </small>
            </div>
          </div>

          <div className="card-text mb-4">
            {topic.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-3">{paragraph}</p>
            ))}
          </div>

          {topic.imageUrl && (
            <div className="mb-4">
              <img
                src={topic.imageUrl}
                alt={topic.title}
                className="img-fluid rounded"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      </div>

      <h4 className="mb-4">Yorumlar ({comments.length})</h4>

      {authService.getCurrentUser() ? (
        <CommentForm topicId={id} onCommentAdded={handleCommentAdded} />
      ) : (
        <div className="alert alert-info">
          <i className="bi bi-info-circle-fill me-2"></i>
          Yorum yapmak için lütfen <Link to="/login">giriş yapın</Link> veya <Link to="/register">kayıt olun</Link>.
        </div>
      )}

      <div className="mt-4">
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onCommentDeleted={handleCommentDeleted}
            />
          ))
        ) : (
          <div className="alert alert-info">
            <i className="bi bi-info-circle-fill me-2"></i>
            Henüz yorum yapılmamış. İlk yorumu siz yapın!
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicPage;