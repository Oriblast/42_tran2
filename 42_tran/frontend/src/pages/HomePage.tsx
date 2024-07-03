import NavBar from './../components/NavBar';
import { useTranslation } from 'react-i18next'; // Importez useTranslation depuis react-i18next
import i18n from './../i18n'; // Importez votre instance i18n

const HomePage = () => {
    const { t } = useTranslation(); // Utilisez useTranslation pour obtenir la fonction t
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
        <NavBar />
        <section className="home-container mt-5">
            <div className="container py-5">
            <button onClick={() => changeLanguage('fr')}>Français</button>
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('es')}>spanish</button>
                <div className="row align-items-center">
                <div className="col-md-6 mb-md-0 mb-4">
                <h1 className="mt-5">{t('welcom', {name: ""})}</h1>
                    <p className="lead mb-md-5 mb-4">
                    {t('coup', {name: ""})}
                    </p>
                    <p><span className="me-2">&#9679;</span>  {t('aventure')}</p>
                    <p><span className="me-2">&#9679;</span> {t('av')}</p>
                    <p><span className="me-2">&#9679;</span> {t('ave')}</p>
                    <p><span className="me-2">&#9679;</span> {t('aven')}</p>
                    <button className="btn btn-primary">Cliquez-moi</button>
                </div>
                <div className="col-md-6 mt-5">
                    <div className="blur-shadow-image text-center">
                    <img src="https://media1.giphy.com/media/pWncxUrrNHdny/giphy.gif?cid=ecf05e47pq0cwp7heqghew8fz4nvhwru99quo21mbrpgb8cs&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="ping pong" />
                    </div>
                </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default HomePage