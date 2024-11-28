import React from 'react';
import { useAppSelector } from '../hooks';


const Footer = () => {
  const winner = useAppSelector(state => state.game.winner);

  const getBackgroundColor = () => {
    if (!winner) return 'bg-game-purple-dark';
    return winner === 1 ? 'bg-player1' : 'bg-player2';
  };

  const getTextColor = () => {
    if (!winner) return 'text-white';
    return winner === 1 ? 'text-black' : 'text-white';
  };

  return (
    <footer 
      className={`
        w-full h-36 px-4 py-3 rounded-t-default shadow-lg 
        flex justify-center items-center
        transition-colors duration-300 fixed bottom-0
        ${getBackgroundColor()}
      `}
    >
      <div className={`mt-20 text-sm transition-colors duration-300 ${getTextColor()}`}>
        Made by Jo with ❤️ | Connect Four
      </div>
    </footer>
  );
};

export default Footer;