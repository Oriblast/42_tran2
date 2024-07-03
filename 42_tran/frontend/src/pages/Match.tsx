import React, { useState } from 'react';

const Match = ({ match, recordMatchResult }) => {
  const [winner, setWinner] = useState('');

  const handleSelectWinner = (winner) => {
    setWinner(winner);
    recordMatchResult(match.id, winner);
  };

  return (
    <div>
      <h2>Match {match.id}</h2>
      <p>{match.players[0]} vs {match.players[1]}</p>
      <button onClick={() => handleSelectWinner(match.players[0])}>
        {match.players[0]} gagne
      </button>
      <button onClick={() => handleSelectWinner(match.players[1])}>
        {match.players[1]} gagne
      </button>
    </div>
  );
};

export default Match;
