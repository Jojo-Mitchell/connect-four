import React from 'react';
import { useAppSelector } from '../hooks';
import playerOne from '../assets/player-one.svg';
import playerTwo from '../assets/player-two.svg';

interface PlayerCardProps {
  playerNumber: 1 | 2;
  score: number;
}

const PlayerCard = ({ playerNumber }: PlayerCardProps) => {
  const currentPlayer = useAppSelector(state => state.game.currentPlayer);
  const isActive = currentPlayer === playerNumber;
  const playerImage = playerNumber === 1 ? playerOne : playerTwo;
  const scores = useAppSelector(state => state.game.scores);

  const getTextColor = () => {
    if (!isActive) return 'text-black';
    return 'text-black';
  };

  const score = playerNumber === 1 ? scores.player1 : scores.player2;

  return (
    <div 
      className={`
        p-4 rounded-lg shadow-lg 
        transition-colors duration-300
        bg-white
        ${isActive ? 'ring-2 ring-indigo-800' : ''}
        border-2 border-black
      `}
    >
      <img src={playerImage} alt={`Player ${playerNumber}`} className="w-16 h-16 mx-auto mb-2" />
      <div className={`text-lg font-bold mb-2 ${getTextColor()}`}>
        Player {playerNumber}
      </div>
      <div className={`text-3xl text-center font-bold ${getTextColor()}`}>
        {score}
      </div>
    </div>
  );
};

export default PlayerCard;