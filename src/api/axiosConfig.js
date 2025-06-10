import axios from 'axios';

// JWT token'ı her istekte otomatik ekleyen bir interceptor
const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        config.headers['Authorization'] = 'Bearer ' + user.token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // 401 Unauthorized hatası alındığında kullanıcıyı çıkış yaptır
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(err);
    }
  );
};

export default setupAxiosInterceptors;