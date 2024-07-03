import { useTranslation } from 'react-i18next'; // Importez useTranslation depuis react-i18next
import NavBar from './../components/NavBar';
import i18n from './../i18n'; // Importez votre instance i18n


const ProfilePage = () => {
  const { t } = useTranslation(); // Utilisez useTranslation pour obtenir la fonction t
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="home-container">

        <NavBar />
        <h1 className=''>ProfilePage</h1>

        <h2>{t('info')}</h2>
        
    </div>
  )
}

export default ProfilePage