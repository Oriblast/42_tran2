import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './../components/NavBar';
import { Link } from 'react-router-dom';

const Game: React.FC = () => {
 
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }
  return (
    <div className="home-container">
      <NavBar />
      <section className="reduced-image">
        <div className="container py-5">
          <button onClick={() => changeLanguage('fr')}>Français</button>
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('es')}>spanish</button>
          <h1>{t('hello_message', { name: "ping" })}</h1>
          <div className="card mt-4">
          <Link to="/pong">1 V 1 </Link>
          <Link to="/IApong">1 V IA </Link>
          <Link to="/Tournament"> tournoi </Link>
          <Link to="/Multiplayer"> 2 v 2 </Link>
          <Link to="/PongGame"> 2 v 2 </Link>
          <Link to="/murpong"> murpong </Link>
          <Link to="/Pong3D"> 3dpong </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Game;
