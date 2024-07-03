import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Game.css';
import NavBar from './../components/NavBar';

const MurPong: React.FC = () => {
  const [ball1Position, setBall1Position] = useState({ x: 300, y: 300 });
  const [ball1Direction, setBall1Direction] = useState({ dx: -1, dy: 0 });
  const [ball2Position, setBall2Position] = useState({ x: 900, y: 300 });
  const [ball2Direction, setBall2Direction] = useState({ dx: 1, dy: 0 });
  const [raq1Position, setRaq1Position] = useState({ x: 50, y: 250 });
  const [raq2Position, setRaq2Position] = useState({ x: 1100, y: 250 });
  const [keysPressed1, setKeysPressed1] = useState<{ [key: string]: boolean }>({});
  const [keysPressed2, setKeysPressed2] = useState<{ [key: string]: boolean }>({});
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [wins1, setWins1] = useState(0);
  const [wins2, setWins2] = useState(0);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'z' || event.key === 'x') {
        setKeysPressed1(prevState => ({ ...prevState, [event.key]: true }));
      }
      if (event.key === '8' || event.key === '2') {
        setKeysPressed2(prevState => ({ ...prevState, [event.key]: true }));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'z' || event.key === 'x') {
        setKeysPressed1(prevState => ({ ...prevState, [event.key]: false }));
      }
      if (event.key === '8' || event.key === '2') {
        setKeysPressed2(prevState => ({ ...prevState, [event.key]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const moveBall1 = () => {
      setBall1Position(prevPosition => ({
        x: prevPosition.x + ball1Direction.dx * 4,
        y: prevPosition.y + ball1Direction.dy * 4,
      }));

      // Gérer les rebonds de la balle sur les bords du terrain
      if (ball1Position.y + ball1Direction.dy >= 580 || ball1Position.y + ball1Direction.dy <= 0) {
        ball1Direction.dy *= -1;
      }

      // Gérer les rebonds de la balle sur le mur central
      if (ball1Position.x >= 595 && ball1Position.x <= 605) {
        ball1Direction.dy *= -2;
      }

      // Gérer les rebonds de la balle sur les raquettes
      if (
        ball1Position.x >= raq1Position.x &&
        ball1Position.x <= raq1Position.x + 20 &&
        ball1Position.y >= raq1Position.y &&
        ball1Position.y <= raq1Position.y + 100
      ) {
        if (ball1Position.y >= raq2Position.y && ball1Position.y <= raq2Position.y + 40) {
          ball1Direction.dy = -1;
        } else if (ball1Position.y >= raq2Position.y + 60 && ball1Position.y <= raq2Position.y + 100) {
          ball1Direction.dy = 1;
        } else {
          ball1Direction.dy = 0;
        }
        ball1Direction.dx *= -1;
      }

      if (
        ball1Position.x >= raq2Position.x &&
        ball1Position.x <= raq2Position.x + 20 &&
        ball1Position.y >= raq2Position.y &&
        ball1Position.y <= raq2Position.y + 100
      ) {
        if (ball1Position.y >= raq2Position.y && ball1Position.y <= raq2Position.y + 40) {
          ball1Direction.dy = -1;
        } else if (ball1Position.y >= raq2Position.y + 60 && ball1Position.y <= raq2Position.y + 100) {
          ball1Direction.dy = 1;
        } else {
          ball1Direction.dy = 0;
        }
        ball1Direction.dx *= -1;
      }

      // Gérer les buts et réinitialiser la position de la balle
      if (ball1Position.x >= 1200) {
        setScore1(score1 + 1);
        setBall1Position({ x: 300, y: 300 });
      }

      if (ball1Position.x <= 0) {
        setScore2(score2 + 1);
        setBall1Position({ x: 300, y: 300 });
      }
    };

    const moveBall2 = () => {
      setBall2Position(prevPosition => ({
        x: prevPosition.x + ball2Direction.dx * 4,
        y: prevPosition.y + ball2Direction.dy * 4,
      }));

      // Gérer les rebonds de la balle sur les bords du terrain
      if (ball2Position.y + ball2Direction.dy >= 580 || ball2Position.y + ball2Direction.dy <= 0) {
        ball2Direction.dy *= -1;
      }

      // Gérer les rebonds de la balle sur le mur central
      if (ball2Position.x >= 595 && ball2Position.x <= 605) {
        ball2Direction.dy *= -2;
      }

      // Gérer les rebonds de la balle sur les raquettes
      if (
        ball2Position.x >= raq1Position.x &&
        ball2Position.x <= raq1Position.x + 20 &&
        ball2Position.y >= raq1Position.y &&
        ball2Position.y <= raq1Position.y + 100
      ) {
        if (ball2Position.y >= raq2Position.y && ball2Position.y <= raq2Position.y + 40) {
          ball2Direction.dy = -1;
        } else if (ball2Position.y >= raq2Position.y + 60 && ball2Position.y <= raq2Position.y + 100) {
          ball2Direction.dy = 1;
        } else {
          ball2Direction.dy = 0;
        }
        ball2Direction.dx *= -1;
      }

      if (
        ball2Position.x >= raq2Position.x &&
        ball2Position.x <= raq2Position.x + 20 &&
        ball2Position.y >= raq2Position.y &&
        ball2Position.y <= raq2Position.y + 100
      ) {
        if (ball2Position.y >= raq2Position.y && ball2Position.y <= raq2Position.y + 40) {
          ball2Direction.dy = -1;
        } else if (ball2Position.y >= raq2Position.y + 60 && ball2Position.y <= raq2Position.y + 100) {
          ball2Direction.dy = 1;
        } else {
          ball2Direction.dy = 0;
        }
        ball2Direction.dx *= -1;
      }

      // Gérer les buts et réinitialiser la position de la balle
      if (ball2Position.x >= 1200) {
        setScore1(score1 + 1);
        setBall2Position({ x: 900, y: 300 });
      }

      if (ball2Position.x <= 0) {
        setScore2(score2 + 1);
        setBall2Position({ x: 900, y: 300 });
      }
    };

    const moveRaq1 = () => {
      if (keysPressed1['z'] && raq1Position.y > 0) {
        setRaq1Position(prevPosition => ({ ...prevPosition, y: prevPosition.y - 1 }));
      }
      if (keysPressed1['x'] && raq1Position.y < 480) {
        setRaq1Position(prevPosition => ({ ...prevPosition, y: prevPosition.y + 1 }));
      }
    };

    const moveRaq2 = () => {
      if (keysPressed2['8'] && raq2Position.y > 0) {
        setRaq2Position(prevPosition => ({ ...prevPosition, y: prevPosition.y - 1 }));
      }
      if (keysPressed2['2'] && raq2Position.y < 480) {
        setRaq2Position(prevPosition => ({ ...prevPosition, y: prevPosition.y + 1 }));
      }
    };

    const handleScoreChange = (newScore1: number, newScore2: number) => {
      if (newScore1 >= 5) {
        setWins1(wins1 + 1);
        setScore1(0);
        setScore2(0);
      }
      if (newScore2 >= 5) {
        setWins2(wins2 + 1);
        setScore1(0);
        setScore2(0);
      }
    };

    const gameLoop = () => {
      moveBall1();
      moveBall2();
      moveRaq1();
      moveRaq2();
      handleScoreChange(score1, score2);
    };

    const intervalId = setInterval(gameLoop, 16);

    return () => clearInterval(intervalId);
  }, [ball1Direction, ball1Position, ball2Direction, ball2Position, keysPressed1, keysPressed2, raq1Position, raq2Position, score1, score2]);

  return (
    <div className="home-container">
      <NavBar />
      <section className="reduced-image">
        <div className="container py-5">
          <button onClick={() => changeLanguage('fr')}>Français</button>
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('es')}>Español</button>
          <h1>{t('hello_message', { name: "MurPong" })}</h1>
          <div className="card mt-4">
            <div className="game-container">
              <div className="table">
                <div className="ball" style={{ left: ball1Position.x, top: ball1Position.y }} />
                <div className="ball" style={{ left: ball2Position.x, top: ball2Position.y }} />
                <div className="raquette" style={{ left: raq1Position.x, top: raq1Position.y }} />
                <div className="raquette" style={{ left: raq2Position.x, top: raq2Position.y }} />
                <div className="mur" style={{ left: '50%', top: 0 }} />
              </div>
            </div>
          </div>
          <div>
            <p>Score Joueur 1: {score1}</p>
            <p>Score Joueur 2: {score2}</p>
            <p>Victoires Joueur 1: {wins1}</p>
            <p>Victoires Joueur 2: {wins2}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MurPong;
