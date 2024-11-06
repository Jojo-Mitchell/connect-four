import React from 'react';
import redCounter from '../assets/counter-red-large.svg';
import yellowCounter from '../assets/counter-yellow-large.svg';

interface SlotProps {
  value: null | 1 | 2;
  column: number;
  onSlotClick: (column: number) => void;
  isWinningSlot?: boolean;
}

const Slot = ({ value, column, onSlotClick, isWinningSlot = false }: SlotProps) => {
  // Get marker image based on player
  const getCounterImage = () => {
    if (!value) return null;
    return value === 1 ? redCounter : yellowCounter;
  };

  const getPieceColor = () => {
    if (!value) return 'bg-game-purple-dark';
    return value === 1 ? 'player1' : 'player2';
  };

  return (
    <div
      onClick={() => onSlotClick(column)}
      className="w-16 h-16 p-2 cursor-pointer"
    >
      <div className="w-full h-full rounded-full slot flex items-center justify-center relative">
        {value !== null && (
          <>
            {/* Background color div */}
            <div
              className={`
                absolute w-14 h-14 rounded-full
                ${getPieceColor()}
                ${isWinningSlot ? 'animate-pulse ring-4 ring-white' : ''}
                transition-all duration-300 ease-bounce
              `}
            />
            {/* SVG marker overlay */}
            <img
              src={getCounterImage() || undefined}
              alt={`Player ${value} marker`}
              className={`
                absolute w-14 h-14
                transition-all duration-300 ease-bounce
              `}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Slot;