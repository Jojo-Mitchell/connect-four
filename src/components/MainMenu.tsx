import React from 'react';
import { useAppDispatch } from '../hooks';
import { setGameMode } from '../features/gameSlice';

const MainMenu = () => {
  const dispatch = useAppDispatch();

  const startGame = () => {
    dispatch(setGameMode('game'));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <h1 className="text-4xl font-bold text-indigo-600 text-center mb-8">
        Connect Four
      </h1>
      
      <div className="space-y-4">
        <button
          onClick={startGame}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-lg"
        >
          Start Game
        </button>
        
        <button
          onClick={() => dispatch(setGameMode('rules'))}
          className="w-full py-3 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors font-semibold text-lg"
        >
          Game Rules
        </button>
      </div>
    </div>
  );
};

export default MainMenu;