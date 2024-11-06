import React, { useState } from 'react';
import { useAppSelector } from './hooks';
import MainMenu from './components/MainMenu';
import NavMenu from './components/NavMenu';
import Board from './components/Board';
import PlayerCard from './components/PlayerCard';
import Timer from './components/Timer';
import Footer from './components/Footer';

const App = () => {
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const gameMode = useAppSelector(state => state.game.gameMode);
  const scores = useAppSelector(state => state.game.scores);

  if (gameMode === 'menu') {
    return (
      <div className="min-h-screen bg-indigo-100 p-4 flex items-center justify-center">
        <MainMenu />
      </div>
    );
  }

  return (
    <div className="min-h-screen grid bg-game-purple p-4">
      {/* Navigation */}
      <NavMenu onPauseTimer={() => setIsTimerPaused(true)} />
      <div className="max-w-4xl mx-auto relative">
        {/* Game Content */}
        <div className="mt-16 space-y-8">
          <div className="flex justify-between items-center">
            <PlayerCard playerNumber={1} score={scores.player1} />
            <Board />
            <PlayerCard playerNumber={2} score={scores.player2} />
          </div>
          <Timer isPaused={isTimerPaused} />
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;