import React, { useState } from 'react';
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//   } from "@/components/ui/alert-dialog";
import { useAppDispatch } from '../hooks';
import { setGameMode, resetGame } from '../features/gameSlice';
import { RotateCcw } from 'lucide-react';
import logo from '../assets/logo.svg';

const NavMenu = ({ onPauseTimer }: { onPauseTimer: () => void }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const dispatch = useAppDispatch();

  const handleMenuClick = () => {
    setShowMenu(true);
    onPauseTimer();
  };

  const handleQuitGame = () => {
    dispatch(setGameMode('menu'));
    dispatch(resetGame());
  };

  return (
    <div className="text-white flex justify-evenly px-4 mt-3">
      <button
        onClick={handleMenuClick}
        className="px-4 py-2 bg-game-purple-dark rounded-lg hover:bg-indigo-700 transition"
      >
        Menu
      </button>

      <div>
        <img src={logo} alt="Logo" className="w-10 h-10 ml-4" />
      </div>

      <button
        onClick={() => dispatch(resetGame())}
        className={`
          flex items-center gap-2 px-4 py-2 bg-game-purple-dark
          rounded-lg hover:opacity-90 transition
        `}
      >
        <RotateCcw size={20} />
        Restart
      </button>
    </div>
  );
};

export default NavMenu;