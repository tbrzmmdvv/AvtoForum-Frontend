import axios from 'axios';
import API_URL from '../config';



const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post('http://165.227.151.218/api/auth/login', {
        username,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        return { success: true, data: response.data };
      }
      
      return { 
        success: false, 
        message: 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.' 
      };
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          return { 
            success: false, 
            message: 'Kullanıcı adı veya şifre hatalı.' 
          };
        }
        return { 
          success: false, 
          message: error.response.data.message || 'Giriş işlemi başarısız oldu.' 
        };
      }
      return { 
        success: false, 
        message: 'Sunucu ile bağlantı kurulamadı.' 
      };
    }
  },
  
  register: async (userData) => {
    try {
      const response = await axios.post(API_URL + 'auth/register', userData);
      if (response.status === 201) {
        return { success: true, message: response.data.message };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      if (error.response) {
        return { 
          success: false, 
          message: error.response.data.message || 'Kayıt işlemi başarısız oldu' 
        };
      }
      return { 
        success: false, 
        message: 'Sunucu ile bağlantı kurulamadı' 
      };
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  }
};

export default authService;