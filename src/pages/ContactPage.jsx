import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';

const ContactPage = () => {
  const { language, translations } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const content = {
    az: {
      title: 'Əlaqə',
      subtitle: 'Bizimlə əlaqə saxlayın',
      description: 'Suallarınız, təklifləriniz və ya şikayətləriniz üçün aşağıdakı formu doldurun və ya bizə birbaşa yazın.',
      name: 'Ad Soyad',
      email: 'E-poçt',
      subject: 'Mövzu',
      message: 'Mesaj',
      submit: 'Göndər',
      success: 'Mesajınız uğurla göndərildi!',
      error: 'Mesajınız göndərilərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
      contactInfo: 'Əlaqə Məlumatları',
      address: 'Ünvan',
      addressValue: 'Bakı şəhəri, Azərbaycan',
      phone: 'Telefon',
      phoneValue: '+994 12 345 67 89',
      emailLabel: 'E-poçt',
      emailValue: 'info@avtoforum.az',
      workingHours: 'İş Saatları',
      workingHoursValue: 'Bazar ertəsindən Şənbəyə qədər: 09:00 - 18:00'
    },
    en: {
      title: 'Contact',
      subtitle: 'Get in Touch',
      description: 'Fill out the form below or write to us directly for your questions, suggestions, or complaints.',
      name: 'Full Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      submit: 'Submit',
      success: 'Your message has been sent successfully!',
      error: 'An error occurred while sending your message. Please try again.',
      contactInfo: 'Contact Information',
      address: 'Address',
      addressValue: 'Baku city, Azerbaijan',
      phone: 'Phone',
      phoneValue: '+994 12 345 67 89',
      emailLabel: 'Email',
      emailValue: 'info@avtoforum.az',
      workingHours: 'Working Hours',
      workingHoursValue: 'Monday to Saturday: 09:00 - 18:00'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Here you would typically make an API call to submit the form
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className={`card border-0 shadow-sm ${isDarkMode ? 'bg-dark' : ''}`}>
            <div className="card-body p-4">
              <h1 className={`text-primary mb-4 ${isDarkMode ? 'text-light' : ''}`}>
                {content[language].title}
              </h1>
              <h2 className={`h4 text-muted mb-4 ${isDarkMode ? 'text-light' : ''}`}>
                {content[language].subtitle}
              </h2>
              <p className={`lead ${isDarkMode ? 'text-light' : 'text-muted'} mb-5`}>
                {content[language].description}
              </p>

              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className={`form-label ${isDarkMode ? 'text-light' : ''}`}>
                        {content[language].name}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className={`form-label ${isDarkMode ? 'text-light' : ''}`}>
                        {content[language].email}
                      </label>
                      <input
                        type="email"
                        className={`form-control ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="subject" className={`form-label ${isDarkMode ? 'text-light' : ''}`}>
                        {content[language].subject}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="message" className={`form-label ${isDarkMode ? 'text-light' : ''}`}>
                        {content[language].message}
                      </label>
                      <textarea
                        className={`form-control ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    {submitStatus && (
                      <div className={`alert ${submitStatus === 'success' ? 'alert-success' : 'alert-danger'} mb-3`}>
                        {content[language][submitStatus]}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          {content[language].submit}
                        </>
                      ) : (
                        content[language].submit
                      )}
                    </button>
                  </form>
                </div>

                <div className="col-md-6">
                  <div className={`card ${isDarkMode ? 'bg-dark border-secondary' : ''} h-100`}>
                    <div className="card-body">
                      <h3 className={`h5 text-primary mb-4 ${isDarkMode ? 'text-light' : ''}`}>
                        {content[language].contactInfo}
                      </h3>

                      <div className="mb-4">
                        <h4 className={`h6 ${isDarkMode ? 'text-light' : ''}`}>
                          <i className="bi bi-geo-alt text-primary me-2"></i>
                          {content[language].address}
                        </h4>
                        <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                          {content[language].addressValue}
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className={`h6 ${isDarkMode ? 'text-light' : ''}`}>
                          <i className="bi bi-telephone text-primary me-2"></i>
                          {content[language].phone}
                        </h4>
                        <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                          {content[language].phoneValue}
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className={`h6 ${isDarkMode ? 'text-light' : ''}`}>
                          <i className="bi bi-envelope text-primary me-2"></i>
                          {content[language].emailLabel}
                        </h4>
                        <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                          {content[language].emailValue}
                        </p>
                      </div>

                      <div>
                        <h4 className={`h6 ${isDarkMode ? 'text-light' : ''}`}>
                          <i className="bi bi-clock text-primary me-2"></i>
                          {content[language].workingHours}
                        </h4>
                        <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                          {content[language].workingHoursValue}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 