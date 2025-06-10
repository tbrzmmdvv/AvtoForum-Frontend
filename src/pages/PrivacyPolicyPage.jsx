import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';

const PrivacyPolicyPage = () => {
  const { language, translations } = useLanguage();
  const { isDarkMode } = useDarkMode();

  const content = {
    az: {
      title: 'Gizlilik Siyasəti',
      lastUpdated: 'Son Yenilənmə: 2024',
      introduction: 'AvtoForum-da gizliliyiniz bizim üçün vacibdir. Bu Gizlilik Siyasəti, şəxsi məlumatlarınızı necə topladığımızı, istifadə etdiyimizi və qoruduğumuzu izah edir.',
      dataCollection: 'Məlumatların Toplanması',
      dataCollectionText: 'Biz aşağıdakı məlumatları toplayırıq:',
      dataCollectionItems: [
        'Qeydiyyat zamanı təqdim etdiyiniz şəxsi məlumatlar',
        'İstifadəçi davranışı və platforma istifadəsi haqqında məlumatlar',
        'Avtomatik toplanan texniki məlumatlar (IP ünvanı, brauzer növü və s.)'
      ],
      dataUsage: 'Məlumatların İstifadəsi',
      dataUsageText: 'Toplanan məlumatlar aşağıdakı məqsədlər üçün istifadə olunur:',
      dataUsageItems: [
        'Hesabınızın idarə edilməsi',
        'Platformanın təkmilləşdirilməsi',
        'Təhlükəsizliyin təmin edilməsi',
        'İstifadəçi dəstəyinin göstərilməsi'
      ],
      dataProtection: 'Məlumatların Qorunması',
      dataProtectionText: 'Şəxsi məlumatlarınızı qorumaq üçün aşağıdakı tədbirləri görürük:',
      dataProtectionItems: [
        'Şifrələnmiş rabitə',
        'Mütəmadi təhlükəsizlik yeniləmələri',
        'Məhdud işçi girişi',
        'Mütəmadi təhlükəsizlik auditləri'
      ],
      cookies: 'Cookies',
      cookiesText: 'Platformamız cookies istifadə edir. Bunlar:',
      cookiesItems: [
        'Əsas cookies - platformanın düzgün işləməsi üçün',
        'Analitik cookies - istifadəçi davranışını başa düşmək üçün',
        'Funksional cookies - istifadəçi təcrübəsini yaxşılaşdırmaq üçün'
      ],
      rights: 'İstifadəçi Hüquqları',
      rightsText: 'Siz aşağıdakı hüquqlara maliksiniz:',
      rightsItems: [
        'Məlumatlarınıza giriş',
        'Məlumatlarınızı düzəltmə',
        'Məlumatlarınızı silmə',
        'Məlumatların emalına etiraz etmə'
      ],
      contact: 'Əlaqə',
      contactText: 'Gizlilik siyasətimizlə bağlı suallarınız üçün bizimlə əlaqə saxlayın:',
      email: 'E-poçt: privacy@avtoforum.az'
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: 2024',
      introduction: 'Your privacy is important to us at AvtoForum. This Privacy Policy explains how we collect, use, and protect your personal information.',
      dataCollection: 'Data Collection',
      dataCollectionText: 'We collect the following information:',
      dataCollectionItems: [
        'Personal information provided during registration',
        'Information about user behavior and platform usage',
        'Automatically collected technical information (IP address, browser type, etc.)'
      ],
      dataUsage: 'Data Usage',
      dataUsageText: 'Collected information is used for the following purposes:',
      dataUsageItems: [
        'Managing your account',
        'Improving the platform',
        'Ensuring security',
        'Providing user support'
      ],
      dataProtection: 'Data Protection',
      dataProtectionText: 'We take the following measures to protect your personal information:',
      dataProtectionItems: [
        'Encrypted communication',
        'Regular security updates',
        'Limited employee access',
        'Regular security audits'
      ],
      cookies: 'Cookies',
      cookiesText: 'Our platform uses cookies. These include:',
      cookiesItems: [
        'Essential cookies - for proper platform functioning',
        'Analytical cookies - to understand user behavior',
        'Functional cookies - to improve user experience'
      ],
      rights: 'User Rights',
      rightsText: 'You have the following rights:',
      rightsItems: [
        'Access to your information',
        'Correction of your information',
        'Deletion of your information',
        'Objection to data processing'
      ],
      contact: 'Contact',
      contactText: 'For questions about our privacy policy, please contact us:',
      email: 'Email: privacy@avtoforum.az'
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
              <p className={`text-muted mb-4 ${isDarkMode ? 'text-light' : ''}`}>
                {content[language].lastUpdated}
              </p>

              <div className="mb-5">
                <p className={`lead ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                  {content[language].introduction}
                </p>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  {content[language].dataCollection}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].dataCollectionText}
                </p>
                <ul className={`list-unstyled ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                  {content[language].dataCollectionItems.map((item, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  {content[language].dataUsage}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].dataUsageText}
                </p>
                <ul className={`list-unstyled ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                  {content[language].dataUsageItems.map((item, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  {content[language].dataProtection}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].dataProtectionText}
                </p>
                <ul className={`list-unstyled ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                  {content[language].dataProtectionItems.map((item, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  {content[language].cookies}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].cookiesText}
                </p>
                <ul className={`list-unstyled ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                  {content[language].cookiesItems.map((item, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  {content[language].rights}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].rightsText}
                </p>
                <ul className={`list-unstyled ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                  {content[language].rightsItems.map((item, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  {content[language].contact}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].contactText}
                </p>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 