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
        <main>
          <NavMenu onPauseTimer={() => setIsTimerPaused(true)} />
          <section className="">
            <div className="home">
              <div className="bg-red-700 player-card-wrapper">
                <PlayerCard playerNumber={1} score={scores.player1} />
                <PlayerCard playerNumber={2} score={scores.player2} />
              </div>
              <div className="flex flex-col items-center justify-between">
                <Board />
              </div>
              <Timer isPaused={isTimerPaused} />
              <Footer />
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