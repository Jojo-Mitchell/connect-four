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
    <section 
      className={`
        w-full px-4 py-3 rounded-t-lg shadow-lg 
        flex justify-center items-center mt-8 
        transition-colors duration-300 
        ${getBackgroundColor()}
      `}
    >
      <div className={`text-sm transition-colors duration-300 ${getTextColor()}`}>
        Made with ❤️ | Connect Four
      </div>
    </section>
  );
};

export default Footer;