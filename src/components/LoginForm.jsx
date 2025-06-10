import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    setMessage('');
    setLoading(true);
    
    try {
      await authService.login(username, password);
      navigate('/');
    } catch (error) {
      const resMessage = 
        (error.response && 
         error.response.data && 
         error.response.data.message) ||
        error.message ||
        error.toString();
      
      setMessage(resMessage);
      setLoading(false);
    }
  };
  
  return (
    <div className="login-form">
      <h2>Giriş</h2>
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              <span>Giriş Yap</span>
            )}
          </button>
        </div>
        
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;