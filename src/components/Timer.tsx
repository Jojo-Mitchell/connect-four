import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { makeWinner, startNewGame } from '../features/gameSlice';
import redBg from '../assets/turn-background-red.svg';
import yellowBg from '../assets/turn-background-yellow.svg';

const Timer = ({ isPaused }: { isPaused: boolean }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const currentPlayer = useAppSelector(state => state.game.currentPlayer);
  const isGameOver = useAppSelector(state => state.game.isGameOver);
  const winner = useAppSelector(state => state.game.winner);
  const dispatch = useAppDispatch();

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
          dispatch(makeWinner(currentPlayer === 1 ? 2 : 1));
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPlayer, isGameOver, isPaused, dispatch]);

  const containerStyle = isGameOver
    ? {
        backgroundColor: 'white',
        borderRadius: '20px',
        border: '3px solid #000',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }
    : {
        backgroundImage: `url(${currentPlayer === 1 ? redBg : yellowBg})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      };

  const handlePlayAgain = () => {
    dispatch(startNewGame());
    setTimeLeft(30);
  };

  return (
    <section className="flex items-center relative justify-center m-auto z-30">
      <div
        className="winner flex flex-col items-center absolute justify-center transition-all duration-300"
        style={containerStyle}
      >
        {isGameOver ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <p className="flex flex-col text-center text-black text-sm font-medium mb-2 mr-3">
              PLAYER {winner} <span className="block text-5xl">WINS</span>
            </p>
            <button
              onClick={handlePlayAgain}
              className="bg-game-purple-dark border-player1 text-white text-sm font-bold py-2 px-4 rounded-default hover:bg-game-purple hover:border-player2 transition-colors"
            >
              PLAY AGAIN
            </button>
          </div>
        ) : (
          <>
            <div className={`text-sm font-medium mb-1 ${currentPlayer === 1 ? 'text-black' : 'text-white'}`}>
              PLAYER {currentPlayer}'S TURN
            </div>
            <div className={`text-3xl font-bold ${timeLeft <= 10 ? 'text-game-purple-dark' : (currentPlayer === 1 ? 'text-black' : 'text-white')}`}>
              {String(timeLeft).padStart(2, '0')}s
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Timer;