import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';

const TermsPage = () => {
  const { language, translations } = useLanguage();
  const { isDarkMode } = useDarkMode();

  const content = {
    az: {
      title: 'İstifadə Şərtləri',
      lastUpdated: 'Son Yenilənmə: 2024',
      introduction: 'AvtoForum-a xoş gəlmisiniz. Bu İstifadə Şərtləri, platformamızdan istifadə etdiyiniz zaman tətbiq olunan qaydaları və şərtləri müəyyən edir.',
      acceptance: 'Şərtlərin Qəbulu',
      acceptanceText: 'Platformamızdan istifadə etməklə, bu İstifadə Şərtlərini qəbul etmiş olursunuz. Əgər bu şərtlərlə razı deyilsinizsə, platformadan istifadə etməyiniz tövsiyə olunmur.',
      userAccount: 'İstifadəçi Hesabı',
      userAccountText: 'Hesab yaratmaq üçün:',
      userAccountItems: [
        'Doğru və dəqiq məlumatlar təqdim etməlisiniz',
        'Hesab məlumatlarınızı təhlükəsiz saxlamalısınız',
        'Hesabınızın təhlükəsizliyinə cavabdehsiniz',
        'Hesabınızı başqaları ilə paylaşmamalısınız'
      ],
      contentRules: 'Məzmun Qaydaları',
      contentRulesText: 'Platformada paylaşdığınız məzmun:',
      contentRulesItems: [
        'Qanunlara uyğun olmalıdır',
        'Başqalarının hüquqlarını pozmamalıdır',
        'Təhqiredici və ya nifrət sözləri ehtiva etməməlidir',
        'Spam və ya reklam məzmunu olmamalıdır'
      ],
      intellectualProperty: 'Məxfi Mülkiyyət',
      intellectualPropertyText: 'Platformada paylaşılan bütün məzmun:',
      intellectualPropertyItems: [
        'Müvafiq müəllif hüquqlarına tabedir',
        'İcazəsiz istifadə edilə bilməz',
        'Müəllifin adı ilə istinad edilməlidir',
        'Kommersiya məqsədləri üçün istifadə edilə bilməz'
      ],
      termination: 'Hesabın Ləğvi',
      terminationText: 'Biz aşağıdakı hallarda hesabınızı ləğv edə bilərik:',
      terminationItems: [
        'Şərtləri pozduğunuz halda',
        'Qanunsuz fəaliyyət göstərdiyiniz halda',
        'Digər istifadəçilərin hüquqlarını pozduğunuz halda',
        'Platformanın təhlükəsizliyinə zərər verdiyiniz halda'
      ],
      changes: 'Dəyişikliklər',
      changesText: 'Biz bu İstifadə Şərtlərini istənilən vaxt dəyişə bilərik. Dəyişikliklər haqqında sizi məlumatlandıracağıq.',
      contact: 'Əlaqə',
      contactText: 'İstifadə şərtləri ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın:',
      email: 'E-poçt: terms@avtoforum.az'
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated: 2024',
      introduction: 'Welcome to AvtoForum. These Terms of Service define the rules and conditions that apply when you use our platform.',
      acceptance: 'Acceptance of Terms',
      acceptanceText: 'By using our platform, you accept these Terms of Service. If you do not agree with these terms, you are advised not to use the platform.',
      userAccount: 'User Account',
      userAccountText: 'To create an account:',
      userAccountItems: [
        'You must provide accurate information',
        'You must keep your account information secure',
        'You are responsible for your account security',
        'You should not share your account with others'
      ],
      contentRules: 'Content Rules',
      contentRulesText: 'Content you share on the platform:',
      contentRulesItems: [
        'Must comply with laws',
        'Must not violate others\' rights',
        'Must not contain offensive or hate speech',
        'Must not be spam or advertising content'
      ],
      intellectualProperty: 'Intellectual Property',
      intellectualPropertyText: 'All content shared on the platform:',
      intellectualPropertyItems: [
        'Is subject to appropriate copyrights',
        'Cannot be used without permission',
        'Must be referenced with the author\'s name',
        'Cannot be used for commercial purposes'
      ],
      termination: 'Account Termination',
      terminationText: 'We may terminate your account in the following cases:',
      terminationItems: [
        'If you violate the terms',
        'If you engage in illegal activities',
        'If you violate other users\' rights',
        'If you harm platform security'
      ],
      changes: 'Changes',
      changesText: 'We may change these Terms of Service at any time. We will notify you about the changes.',
      contact: 'Contact',
      contactText: 'For questions about the terms of service, please contact us:',
      email: 'Email: terms@avtoforum.az'
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
                  {content[language].acceptance}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].acceptanceText}
                </p>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  {content[language].userAccount}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].userAccountText}
                </p>
                <ul className={`list-unstyled ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                  {content[language].userAccountItems.map((item, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  {content[language].contentRules}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].contentRulesText}
                </p>
                <ul className={`list-unstyled ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                  {content[language].contentRulesItems.map((item, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  {content[language].intellectualProperty}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].intellectualPropertyText}
                </p>
                <ul className={`list-unstyled ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                  {content[language].intellectualPropertyItems.map((item, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  {content[language].termination}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].terminationText}
                </p>
                <ul className={`list-unstyled ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                  {content[language].terminationItems.map((item, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h2 className={`h4 text-primary mb-3 ${isDarkMode ? 'text-light' : ''}`}>
                  {content[language].changes}
                </h2>
                <p className={isDarkMode ? 'text-light' : 'text-muted'}>
                  {content[language].changesText}
                </p>
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

export default TermsPage; 