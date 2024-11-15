// import React from 'react';
import { useAppSelector } from '../hooks';
import playerOne from '../assets/player-one.svg';
import playerTwo from '../assets/player-two.svg';
import styles from './PlayerCard.module.css';

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
  const playerClass = playerNumber === 1 ? 'player-1' : 'player-2';

  return (
    <div 
      className={`${styles.playercard}`}
      id={playerClass}>
      <div className={`${playerClass} emoji`}>
        <img src={playerImage} alt={`Player ${playerNumber}`} className="icon-locale" />
      </div>
      <div className={`text-lg font-bold text-center label ${getTextColor()}`}>
        PLAYER {playerNumber}
      </div>
      <div className={`text-6xl mb-2 max-sm:text-4xl text-center font-bold ${getTextColor()}`}>
        {score}
      </div>
    </div>
  );
};

export default PlayerCard;