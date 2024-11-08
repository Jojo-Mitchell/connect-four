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
      <div className="text-white flex justify-evenly px-4 mt-3">
        <button
          onClick={handleMenuClick}
          className="px-4 py-2 bg-game-purple-dark rounded-lg hover:bg-indigo-700 transition"
        >
          MENU
        </button>
        <div>
          <img src={logo} alt="Logo" className="w-10 h-10 ml-4" />
        </div>
        <button
          onClick={handleRestart}
          className={`
            flex items-center gap-2 px-4 py-2 bg-game-purple-dark
            rounded-lg hover:opacity-90 transition
          `}
        >
          <RotateCcw size={20} />
          RESTART
        </button>
      </div>

      {/* Menu Modal */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <div className="bg-game-purple rounded-lg w-full max-w-sm mx-4 p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center text-white justify-between mb-6">
              <h2 className="text-2xl m-auto font-bold">PAUSE</h2>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <button
                onClick={handleResume}
                className="w-full py-3 px-4 rounded-lg menu-button bg-white text-black transition-colors"
              >
                CONTINUE GAME
              </button>

              <button
                onClick={handleRestart}
                className="w-full py-3 px-4 rounded-lg menu-button bg-white text-black transition-colors"
              >
                RESTART
              </button>

              <button
                onClick={() => setShowQuitConfirm(true)}
                className="w-full py-3 px-4 rounded-lg menu-button bg-player1 text-white transition-colors"
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
                className="px-4 py-2 rounded-lg border border-gray-200
                         hover:bg-gray-50 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleQuitGame}
                className="px-4 py-2 rounded-lg bg-red-500 text-white
                         hover:bg-red-600 transition-colors"
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