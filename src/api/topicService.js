import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

const topicService = {
  createTopic: async (topicData) => {
    try {
      const response = await axios.post(API_URL + 'topics', topicData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
        }
      });
      
      if (response.status === 201) {
        return { success: true, data: response.data };
      }
      
      return { 
        success: false, 
        message: 'Konu oluşturulurken bir hata oluştu.' 
      };
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          return { 
            success: false, 
            message: error.response.data.message || 'Lütfen tüm alanları doğru şekilde doldurun.' 
          };
        }
        if (error.response.status === 401) {
          return { 
            success: false, 
            message: 'Bu işlem için giriş yapmanız gerekiyor.' 
          };
        }
        return { 
          success: false, 
          message: error.response.data.message || 'Konu oluşturulurken bir hata oluştu.' 
        };
      }
      return { 
        success: false, 
        message: 'Sunucu ile bağlantı kurulamadı.' 
      };
    }
  },

  getTopics: async () => {
    try {
      const response = await axios.get(API_URL + 'topics');
      return response.data;
    } catch (error) {
      console.error('Konular yüklenirken hata:', error);
      return [];
    }
  },

  getTopic: async (id) => {
    try {
      const response = await axios.get(API_URL + `topics/${id}`);
      return response.data;
    } catch (error) {
      console.error('Konu detayları yüklenirken hata:', error);
      return null;
    }
  },

  updateTopic: async (id, topicData) => {
    try {
      const response = await axios.put(API_URL + `topics/${id}`, topicData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Konu güncellenirken hata:', error);
      throw error;
    }
  },

  deleteTopic: async (id) => {
    try {
      await axios.delete(API_URL + `topics/${id}`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
        }
      });
      return true;
    } catch (error) {
      console.error('Konu silinirken hata:', error);
      return false;
    }
  }
};

export default topicService; 