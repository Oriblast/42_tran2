import React from "react";
import { useTranslation } from 'react-i18next'; // Importez useTranslation depuis react-i18next
import NavBar from './../components/NavBar';
import i18n from './../i18n'; // Importez votre instance i18n

// data about each user
interface LeaderboardEntry {
  username: string;
  win: number;
  lose: number;
  matches: number;
  rank: number | null;
}

// data about each user
const leaderboardData: LeaderboardEntry[] = [
  { username: "dsestannes", win: 125, lose: 14, matches: 150, rank: 2 },
  { username: "mdiamant", win: 77, lose: 19, matches: 101, rank: 3 },
  { username: "jsoulet", win: 68, lose: 22, matches: 82, rank: 4 },
  { username: "lolefvr", win: 50, lose: 12, matches: 147, rank: 21 },
  { username: "abeaugra", win: 30, lose: 144, matches: 214, rank: null },
  { username: "jmezea", win: 1, lose: 95, matches: 96, rank: null },
];

// Leaderboard page
const Leaderboard: React.FC = () => {
  const { t } = useTranslation(); // Utilisez useTranslation pour obtenir la fonction t
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="home-container mt-5">
      <NavBar />
      <section className="">
        <div className="container py-5">
        <button onClick={() => changeLanguage('fr')}>Français</button>
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('es')}>spanish</button>
          <h1 className="text-center">{t('classement')}</h1>
          {/* Table */}
          <section className="ftco-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-10">
                  <div className="wrap d-md-flex">
                    <div className="table-responsive">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('photo')}</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Username</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('gagne')}</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('perdre')}</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Match</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('grade')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboardData.map((entry, index) => (
                            <tr key={index}>
                              <td>
                               <img src={("../assets/a.png")} className="avatar avatar-sm me-3" alt="profile" />
                              </td>
                              <td>{entry.username}</td>
                              <td>{entry.win}</td>
                              <td>{entry.lose}</td>
                              <td>{entry.matches}</td>
                              <td>{entry.rank !== null ? entry.rank : 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
