import React, { useState } from 'react';
import axios from 'axios';
import authService from '../api/authService';

const CommentItem = ({ comment, onCommentDeleted }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      return;
    }

    setError('');
    setLoading(true);

    try {
      await axios.delete(
        `http://localhost:8080/api/comments/${comment.id}`,
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
          }
        }
      );
      onCommentDeleted(comment.id);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Yorum silinirken bir hata oluştu');
      } else {
        setError('Sunucu ile bağlantı kurulamadı');
      }
    } finally {
      setLoading(false);
    }
  };

  const canDelete = () => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !comment?.user) return false;
    
    return currentUser.id === comment.user.id || 
           currentUser.roles?.includes('ROLE_ADMIN') || 
           currentUser.roles?.includes('ROLE_MODERATOR');
  };

  if (!comment) return null;

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center">
            <img 
              src={comment.user?.profilePicture || '/default-avatar.png'} 
              alt={comment.user?.username || 'Anonim'}
              className="rounded-circle me-3"
              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
            <div>
              <h6 className="mb-0">{comment.user?.username || 'Anonim'}</h6>
              <small className="text-muted">
                {new Date(comment.createdAt).toLocaleString('tr-TR')}
              </small>
            </div>
          </div>
          
          {canDelete() && (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                <i className="bi bi-trash"></i>
              )}
            </button>
          )}
        </div>

        {error && (
          <div className="alert alert-danger shadow-sm">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        <p className="card-text">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentItem; 