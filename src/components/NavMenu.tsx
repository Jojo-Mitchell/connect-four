import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { setGameMode, resetGame } from '../features/gameSlice';
import { RotateCcw } from 'lucide-react';
import logo from '../assets/logo.svg';

interface NavMenuProps {
  onPauseTimer: () => void;
}

const NavMenu = ({ onPauseTimer }: NavMenuProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowMenu(false);
        setShowQuitConfirm(false);
      }
    };

    if (showMenu || showQuitConfirm) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showMenu, showQuitConfirm]);

  const handleMenuClick = () => {
    setShowMenu(true);
    onPauseTimer();
  };

  const handleQuitGame = () => {
    dispatch(setGameMode('menu'));
    dispatch(resetGame());
  };

  const handleRestart = () => {
    dispatch(resetGame());
    setShowMenu(false);
  };

  const handleResume = () => {
    setShowMenu(false);
  };

  // Modal backdrop click handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowMenu(false);
      setShowQuitConfirm(false);
    }
  };

  return (
    <>
      <nav className="lg:container container min-md:my-4 sm:mt-1 sm:mb-4 mx-auto flex items-center justify-evenly">
        <button
          onClick={handleMenuClick}
          className="px-10 py-2 bg-game-purple-dark rounded-small border-transparent hover:bg-player1 hover:border-player2 border-2 transition"
        >
          MENU
        </button>
        <img 
          src={logo} 
          alt="Logo" 
          className="w-14 h-14 logo max-sm:w-12 max-sm:h-12"
        />
        <button
          onClick={handleRestart}
          className={`
            flex items-center gap-2 px-4 py-2 bg-game-purple-dark
            rounded-small border-transparent hover:bg-player1 hover:border-player2 border-2 transition
          `}
        >
          <RotateCcw size={20} />
          RESTART
        </button>
      </nav>

      {/* Menu Modal */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center text-center"
          onClick={handleBackdropClick}
        >
          <div className="bg-game-purple rounded-default w-full max-w-sm mx-auto max-sm:w-80 border-edge p-8 shadow-xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center text-white justify-between mb-6">
              <h2 className="text-6xl m-auto font-bold">PAUSE</h2>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <button
                onClick={handleResume}
                className="w-full py-3 px-4 justify-center rounded-lg menu-button bg-white text-black
                         hover:bg-player1 hover:text-white hover:border-player2 transition-colors"
              >
                CONTINUE GAME
              </button>

              <button
                onClick={handleRestart}
                className="w-full py-3 px-4 justify-center rounded-lg menu-button bg-white text-black
                         hover:bg-player1 hover:text-white hover:border-player2 transition-colors"
              >
                RESTART
              </button>

              <button
                onClick={() => setShowQuitConfirm(true)}
                className="w-full py-3 px-4 justify-center rounded-lg menu-button bg-white text-black
                         hover:bg-player1 hover:text-white hover:border-player2 transition-colors"
              >
                QUIT GAME
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quit Confirmation Modal */}
      {showQuitConfirm && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg w-full max-w-sm mx-4 p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quit Game?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to quit? Your current game progress will be lost.
            </p>
            <div className="space-x-4 flex justify-end">
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="px-4 py-2 rounded-lg border bg-game-purple-dark hover:border-player1
                         hover:bg-game-purple  border-transparent  transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleQuitGame}
                className="px-4 py-2 rounded-lg bg-player1 text-white
                         hover:bg-player2  hover:border-player1 border-transparent border hover:text-black transition-colors"
              >
                QUIT GAME
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavMenu;