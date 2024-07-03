import { useTranslation } from 'react-i18next'; // Importez useTranslation depuis react-i18next
import NavBar from './../components/NavBar';
import i18n from './../i18n'; // Importez votre instance i18n

const Settings = () => {
  const { t } = useTranslation(); // Utilisez useTranslation pour obtenir la fonction t
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="home-container">
      <NavBar />
      
      <section className="">
        <div className="container py-5">
        <button onClick={() => changeLanguage('fr')}>Français</button>
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('es')}>spanish</button>
          <div className="container rounded mb-5">
              <div className="row">
                <div className="col-md-3 border-right">
                  <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img  
                      className="rounded-circle mt-5" 
                      width="150px" 
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" 
                    />
                    <span className="font-weight-bold">Edogaru</span>
                    <span className="text-black-50">edogaru@mail.com.my</span>
                    <span> </span>
                  </div>
                </div>

                <div className="col-md-5 border-right">
                  <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h1 className="text-right"></h1>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6">
                        <label className="labels"></label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder={t('nom')}
                          value="" 
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="labels"></label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value="" 
                          placeholder={t('prenom')}
                        />
                      </div>

                      <div className="col-md-12">
                        <label className="labels"></label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="email"
                          value=""
                        />
                      </div>
                    </div>

                    <div className="mt-5 text-center">
                      <button className="btn btn-primary profile-button" type="button">
                        Sav
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
    </div>
  )
}

export default Settings