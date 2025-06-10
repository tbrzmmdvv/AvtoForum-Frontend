import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'az';
  });

  const translations = {
    az: {
      // Navigation
      home: 'Ana Səhifə',
      about: 'Haqqımızda',
      categories: 'Kateqoriyalar',
      search: 'Axtar...',
      searchButton: 'Axtar',
      login: 'Daxil Ol',
      register: 'Qeydiyyat',
      logout: 'Çıxış',
      profile: 'Profil',
      myTopics: 'Mövzularım',
      adminPanel: 'İdarə Paneli',
      createCategory: 'Kateqoriya Yarat',
      
      // About Page
      whoWeAre: 'Biz Kimik?',
      mission: 'Missiyamız',
      vision: 'Vizyonumuz',
      whatWeOffer: 'Nə Təklif Edirik?',
      ourCommunity: 'Cəmiyyətimiz',
      joinUs: 'Bizə Qoşul',
      contactUs: 'Əlaqə',
      specialSurprise: 'Xüsusi Sürpriz',
      
      // Topic Page
      comments: 'Şərhlər',
      writeComment: 'Şərh Yaz',
      submit: 'Göndər',
      noComments: 'Hələ şərh yoxdur',
      
      // Profile Page
      userProfile: 'İstifadəçi Profili',
      memberSince: 'Üzvlük Tarixi',
      topics: 'Mövzular',
      editProfile: 'Profili Redaktə Et',
      
      // Common
      loading: 'Yüklənir...',
      error: 'Xəta baş verdi',
      success: 'Uğurlu',
      back: 'Geri',
      save: 'Yadda Saxla',
      cancel: 'Ləğv Et',
      delete: 'Sil',
      edit: 'Redaktə Et',
      create: 'Yarat',
      update: 'Yenilə',
    },
    en: {
      // Navigation
      home: 'Home',
      about: 'About',
      categories: 'Categories',
      search: 'Search...',
      searchButton: 'Search',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      profile: 'Profile',
      myTopics: 'My Topics',
      adminPanel: 'Admin Panel',
      createCategory: 'Create Category',
      
      // About Page
      whoWeAre: 'Who We Are',
      mission: 'Our Mission',
      vision: 'Our Vision',
      whatWeOffer: 'What We Offer',
      ourCommunity: 'Our Community',
      joinUs: 'Join Us',
      contactUs: 'Contact Us',
      specialSurprise: 'Special Surprise',
      
      // Topic Page
      comments: 'Comments',
      writeComment: 'Write a Comment',
      submit: 'Submit',
      noComments: 'No comments yet',
      
      // Profile Page
      userProfile: 'User Profile',
      memberSince: 'Member Since',
      topics: 'Topics',
      editProfile: 'Edit Profile',
      
      // Common
      loading: 'Loading...',
      error: 'Error occurred',
      success: 'Success',
      back: 'Back',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      update: 'Update',
    }
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 