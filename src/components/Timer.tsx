import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { makeWinner } from '../features/gameSlice';
import redBg from '../assets/turn-background-red.svg';
import yellowBg from '../assets/turn-background-yellow.svg';

const Timer = ({ isPaused }: { isPaused: boolean }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const currentPlayer = useAppSelector(state => state.game.currentPlayer);
  const isGameOver = useAppSelector(state => state.game.isGameOver);
  const dispatch = useAppDispatch();

  // Preload images
  useEffect(() => {
    const redImage = new Image();
    const yellowImage = new Image();
    redImage.src = redBg;
    yellowImage.src = yellowBg;
  }, []);

  useEffect(() => {
    // Reset timer when player changes
    setTimeLeft(30);
  }, [currentPlayer]);

  useEffect(() => {
    if (isGameOver || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Time's up - other player wins
          dispatch(makeWinner(currentPlayer === 1 ? 2 : 1));
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPlayer, isGameOver, isPaused, dispatch]);

  const backgroundStyle = {
    backgroundImage: `url(${currentPlayer === 1 ? redBg : yellowBg})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };

  const getTextColor = () => {
    return currentPlayer === 1 ? 'text-black' : 'text-white';
  };

  return (
    <section className="flex items-center justify-center pb-12">
      <div 
        className="w-32 h-32 flex flex-col items-center justify-center absolute transition-all duration-300"
        style={backgroundStyle}
      >
        <div className={`text-sm font-medium mb-1 ${getTextColor()}`}>
          PLAYER {currentPlayer}'s TURN
        </div>
        <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500' : getTextColor()}`}>
          {String(timeLeft).padStart(2, '0')}s
        </div>
      </div>
    </section>
  );
};

export default Timer;