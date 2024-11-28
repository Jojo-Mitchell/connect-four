import * as React from 'react';
import { useAppDispatch } from '../hooks';
import { setGameMode } from '../features/gameSlice';
import playerVsPlayer from '../assets/player-vs-player.svg';
import logo from '../assets/logo.svg';

const MainMenu = () => {
  const dispatch = useAppDispatch();
  
  const startGame = () => {
    dispatch(setGameMode('game'));
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="menu bg-game-purple max-sm:bg-inherit relative flex flex-col max-md:justify-center items-center
          p-12
          md:w-[480px] md:min-h-0 md:rounded-default lg:rounded-default md:border-edge lg:border-edge
          lg:w-[480px]">
          
          {/* Logo sizing and spacing */}
          <img 
            src={logo} 
            alt="Logo" 
            className="w-14 h-14 mb-16 logo max-sm:w-12 max-sm:h-12"
          />

          {/* Button container */}
          <div className="w-full max-sm:bg-transparent flex flex-col gap-4 items-center">
            <button
              onClick={startGame}
              className="menu-button bg-player2 text-black transition-all"
            >
              <span className="label">PLAY VS PLAYER</span>
              <img src={playerVsPlayer} alt="Player vs Player" className="h-8 ml-12" />
            </button>

            <button
              onClick={() => dispatch(setGameMode('rules'))}
              className="menu-button bg-white text-black transition-colors"
            >
              <span className="label">GAME RULES</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMenu;