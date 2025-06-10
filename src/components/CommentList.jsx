import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="alert alert-info">
        Henüz yorum yapılmamış. İlk yorumu siz yapın!
      </div>
    );
  }

  return (
    <div className="comments">
      {comments.map((comment) => (
        <div key={comment.id} className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-2 text-center">
                <img 
                  src={comment.user?.profilePicture || "https://via.placeholder.com/100"} 
                  alt={comment.user?.username || "Kullanıcı"}
                  className="rounded-circle mb-2"
                  style={{ width: "60px", height: "60px" }}
                />
                <p className="mb-0">
                  <strong>
                    {comment.user ? (
                      <Link to={`/profile/${comment.user.id}`}>
                        {comment.user.username}
                      </Link>
                    ) : (
                      "Anonim"
                    )}
                  </strong>
                </p>
                <small className="text-muted">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </small>
              </div>
              <div className="col-md-10">
                <div className="comment-content">
                  {comment.content.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;