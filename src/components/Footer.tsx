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
        w-full h-36 px-4 py-3 relative rounded-t-default shadow-lg 
        flex justify-center items-center my-3
        transition-colors duration-300 
        ${getBackgroundColor()}
      `}
    >
      <div className={`mt-7 text-sm transition-colors duration-300 ${getTextColor()}`}>
        Made by Jojo Mitchell with ❤️ | Connect Four
      </div>
    </section>
  );
};

export default Footer;