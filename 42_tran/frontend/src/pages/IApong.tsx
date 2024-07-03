import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Game.css';
import NavBar from './../components/NavBar';
import i18n from './../i18n';

const Pong: React.FC = () => {
  const [ballPosition, setBallPosition] = useState({ x: 600, y: 300 });
  const [ballDirection, setBallDirection] = useState({ dx: -1, dy: 0 });
  const [raq1Position, setRaq1Position] = useState({ x: 50, y: 250 });
  const [raq2Position, setRaq2Position] = useState({ x: 1150, y: 250 });
  const [keysPressed1, setKeysPressed1] = useState<{ [key: string]: boolean }>({});
  const [keysPressed2, setKeysPressed2] = useState<{ [key: string]: boolean }>({});
  const speed = 5;
  const [score, setScore] = useState(0);
  const [scoree, setScoree] = useState(0);
  
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }

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
    const moveBall = () => {
      setBallPosition(prevPosition => ({
        x: prevPosition.x + ballDirection.dx * 4,
        y: prevPosition.y + ballDirection.dy * 4,
      }));

      // Gérer les rebonds de la balle sur les bords du terrain
      if (ballPosition.y + ballDirection.dy >= 580 || ballPosition.y + ballDirection.dy <= 0) {
        ballDirection.dy *= -1;
      }
  
      if (
        ballPosition.x >= raq1Position.x &&
        ballPosition.x <= raq1Position.x + 20 &&
        ballPosition.y >= raq1Position.y &&
        ballPosition.y <= raq1Position.y + 100
      ) {
        if (ballPosition.y >= raq1Position.y && ballPosition.y <= raq1Position.y + 40) {
          ballDirection.dy = -1;
        } else if (ballPosition.y >= raq1Position.y + 60 && ballPosition.y <= raq1Position.y + 100) {
          ballDirection.dy = 1;
        } else {
          ballDirection.dy = 0;
        }
        ballDirection.dx *= -1;
      }
  
      if (
        ballPosition.x >= raq2Position.x &&
        ballPosition.x <= raq2Position.x + 20 &&
        ballPosition.y >= raq2Position.y &&
        ballPosition.y <= raq2Position.y + 100
      ) {
        if (ballPosition.y >= raq2Position.y && ballPosition.y <= raq2Position.y + 40) {
          ballDirection.dy = -1;
        } else if (ballPosition.y >= raq2Position.y + 60 && ballPosition.y <= raq2Position.y + 100) {
          ballDirection.dy = 1;
        } else {
          ballDirection.dy = 0;
        }
        ballDirection.dx *= -1;
      }
  /*
      if (ballPosition.x >= 1200) {
        setBallPosition({ x: 600, y: 300 }); // Réinitialiser la position de la balle au centre
        // Augmenter le score pour le joueur 2
        setScore(prevScore => prevScore + 1);
      }
  
      if (ballPosition.x <= 0) {
        setBallPosition({ x: 600, y: 300 }); // Réinitialiser la position de la balle au centre
        // Augmenter le score pour le joueur 1
        setScoree(prevScoree => prevScoree + 1);
      }*/
      if (ballPosition.x >= 1200) {
        handleScoreChange(score + 1); // Augmenter le score pour le joueur 2
        setBallPosition({ x: 600, y: 300 }); // Réinitialiser la position de la balle au centre
      }
  
      if (ballPosition.x <= 0) {
        handleScoreeChange(scoree + 1); // Augmenter le score pour le joueur 1
        setBallPosition({ x: 600, y: 300 }); // Réinitialiser la position de la balle au centre
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
      if (ballPosition.y < raq2Position.y && raq2Position.y > 0) {
        setRaq2Position(prevPosition => ({ ...prevPosition, y: prevPosition.y - 1 }));
      }
      if (ballPosition.y > raq2Position.y && raq2Position.y < 480) {
        setRaq2Position(prevPosition => ({ ...prevPosition, y: prevPosition.y + 1 }));
      }
    };

const handleScoreChange = (newScore: number) => {
      setScore(newScore);
      if (newScore >= 5) {
        alert("Le joueur 1 a gagné !");
        setScore(0);
        setScoree(0);
      }
    };

    const handleScoreeChange = (newScore: number) => {
      setScoree(newScore);
      if (newScore >= 5) {
        alert("Le joueur 2 a gagné !");
        setScore(0);
        setScoree(0);
      }
    };
    
    const gameLoop = () => {
      moveBall();
      moveRaq1();
      moveRaq2();
    };

    const animationFrame = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationFrame);
  }, [raq1Position, raq2Position, keysPressed1, keysPressed2, ballDirection, ballPosition, score, scoree]);

  return (
    <div className="home-container">
      <NavBar />
      <section className="reduced-image">
        <div className="container py-5">
          <button onClick={() => changeLanguage('fr')}>Français</button>
          <button onClick={() => changeLanguage('en')}>English</button>
          <h1>{t('hello_message', { name: "ping" })}</h1>
          <div className="card mt-4">
            <div className="game-container">
              <div className="table">
                <div className="ball" style={{ left: ballPosition.x, top: ballPosition.y }} />
                <div className="raquette" style={{ left: raq1Position.x, top: raq1Position.y }} />
                <div className="raquette" style={{ left: raq2Position.x, top: raq2Position.y }} />
              </div>
            </div>
          </div>
          <div>
            <p>Score Joueur 1: {score}</p>
            <p>Score Joueur 2: {scoree}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pong;