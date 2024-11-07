import React from 'react';
import { useAppDispatch } from '../hooks';
import { setGameMode } from '../features/gameSlice';
import playerVsCpu from '../assets/player-vs-cpu.svg';
import playerVsPlayer from '../assets/player-vs-player.svg';
import logo from '../assets/logo.svg';

const MainMenu = () => {
  const dispatch = useAppDispatch();

  const startGame = () => {
    dispatch(setGameMode('game'));
  };

  return (
    <div className="bg-game-purple p-8 flex flex-col items-center rounded-xl shadow-lg max-w-md w-[480px] border-2 border-black">
      <img src={logo} alt="Logo" className="w-auto h-auto mb-8" />
      
      <div className="card relative flex flex-col justify-center w-[400px]">
          <button
            onClick={startGame}
            className="menu-button bg-player1 text-white rounded-lg hover:border-game-purple-dark "
          >
          PLAY VS CPU
          <img src={playerVsCpu} alt="Player vs CPU" className="ml-40 inline-block" />
        </button>
        <button
          onClick={startGame}
          className="menu-button bg-player2 text-black rounded-lg hover:border-game-purple-dark"
        >
          PLAY VS PLAYER
          <img src={playerVsPlayer} alt="Player vs Player" className="inline-block ml-36" />
        </button>
        
        <button
          onClick={() => dispatch(setGameMode('rules'))}
          className="w-[400px] mb-2 py-3 bg-white text-black rounded-lg hover:border-game-purple-dark border-black border-2 transition-colors font-semibold text-lg"
        >
          Game Rules
        </button>
      </div>
    </div>
  );
};

export default MainMenu;