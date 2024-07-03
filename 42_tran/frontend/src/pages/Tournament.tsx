import React, { useState } from 'react';
import PlayerForm from './PlayerForm';
import Match from './Match';

const Tournament = () => {
  const [players, setPlayers] = useState([]); // État pour stocker les joueurs
  const [matches, setMatches] = useState([]); // État pour stocker les matchs
  const [winner, setWinner] = useState(''); // État pour stocker le vainqueur du tournoi

  // Fonction pour ajouter un joueur à la liste des joueurs
  const addPlayer = (player) => {
    setPlayers([...players, player]);
  };

  // Fonction pour enregistrer le résultat d'un match
  const recordMatchResult = (matchId, winner) => {
    handleMatchComplete(matchId, winner);
  };

  // Fonction pour démarrer le tournoi en initialisant les premiers matchs
  const startTournament = () => {
    if (players.length === 4) {
      setMatches([
        { id: 1, players: [players[0], players[1]], winner: null },
        { id: 2, players: [players[2], players[3]], winner: null },
      ]);
    }
  };

  // Fonction pour gérer la fin des matchs et organiser la finale
  const handleMatchComplete = (matchId, matchWinner) => {
    const updatedMatches = matches.map((match) =>
      match.id === matchId ? { ...match, winner: matchWinner } : match
    );
    setMatches(updatedMatches);

    const completedMatches = updatedMatches.filter((match) => match.winner);
    if (completedMatches.length === 2) {
      const finalists = completedMatches.map((match) => match.winner);
      setMatches([
        ...updatedMatches,
        { id: 3, players: [finalists[0], finalists[1]], winner: null },
      ]);
    } else if (completedMatches.length === 3) {
      const finalWinner = completedMatches.find((match) => match.id === 3).winner;
      setWinner(finalWinner);
    }
  };

  // Fonction pour ouvrir une nouvelle fenêtre avec la route /pong
  const openPongWindow = () => {
    window.open('/pong', '_blank', 'width=1300,height=1300');
  };

  return (
    <div>
      <h1>Tournoi</h1>
      <h1>ouvrez le pong et jouer le premier a 5 but gagne</h1>
      {players.length < 4 ? (
        <PlayerForm addPlayer={addPlayer} />
      ) : (
        <>
          <button onClick={startTournament}>Démarrer le tournoi</button>
          {matches.map((match) => (
            <Match key={match.id} match={match} recordMatchResult={recordMatchResult} />
          ))}
        </>
      )}
      {winner && <h2>Le vainqueur du tournoi est {winner}</h2>}
      <button onClick={openPongWindow}>Ouvrir le jeu Pong</button>
    </div>
  );
};

export default Tournament;
