import React, { useState } from 'react';
import { useAppSelector } from './hooks';
import MainMenu from './components/MainMenu';
import NavMenu from './components/NavMenu';
import Board from './components/Board';
import PlayerCard from './components/PlayerCard';
import Timer from './components/Timer';
import Footer from './components/Footer';
import Rules from './components/Rules';

const App = () => {
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const gameMode = useAppSelector(state => state.game.gameMode);
  const scores = useAppSelector(state => state.game.scores);

  // Render different layouts based on game mode
  switch (gameMode) {
    case 'menu':
      return (
        <div className="bg-game-purple-dark max-sm:bg-game-purple flex items-center justify-center">
          <MainMenu />
        </div>
      );

    case 'rules':
      return (
        <div className="min-h-screen bg-game-purple-dark max-sm:bg-game-purple">
          <Rules />
        </div>
      );

    case 'game':
      return (
        <main className="min-h-screen flex flex-col relative max-sm:bg-game-purple">
          <NavMenu onPauseTimer={() => setIsTimerPaused(true)} />
          <section className="flex-1">
            <div className="home relative">
              <div className="player-card-wrapper flex">
                <PlayerCard playerNumber={1} score={scores.player1} />
                <div className="spacer min-w-[5px] max-w-[24px] lg:min-w-[605px]" />
                <PlayerCard playerNumber={2} score={scores.player2} />
              </div>
              <div className="flex flex-col items-center justify-between relative z-20">
                <Board />
                <div className="
                  absolute 
                  bottom-0
                  left-1/2 -translate-x-1/2 
                  z-30 
                  w-full
                ">
                  <Timer isPaused={isTimerPaused} />
                </div>
              </div>
              <div className="absolute -bottom-16 md:-bottom-24 left-0 right-0 z-10 max-sm:h-[236px]">
                <Footer />
              </div>
            </div>
          </section>
        </main>
      );

    default:
      return (
        <main className="min-h-screen bg-game-purple-dark max-sm:bg-game-purple p-8 flex items-center justify-center max-sm:mt-6">
          <MainMenu />
        </main>
      );
  }
};

export default App;