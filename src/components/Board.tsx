import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { makeMove } from '../features/gameSlice';
import Slot from './Slot';
import redMarker from '../assets/marker-red.svg';
import yellowMarker from '../assets/marker-yellow.svg';

const Board = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(state => state.game.board);
  const winner = useAppSelector(state => state.game.winner);
  const currentPlayer = useAppSelector(state => state.game.currentPlayer);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  // Handle slot click
  const handleSlotClick = (column: number) => {
    if (!winner) {
      dispatch(makeMove(column));
    }
  };

  // Get marker image based on current player
  const getMarkerImage = () => {
    return currentPlayer === 1 ? redMarker : yellowMarker;
  };

  return (
    <div
      className="bg-transparent p-4 rounded-xl shadow-lg"
      onMouseLeave={() => setHoveredColumn(null)}
    >
      {/* Column marker container */}
      <div className="grid grid-cols-7 gap-1 p-2 h-16 relative">
        <img
          src={getMarkerImage()}
          alt={`Player ${currentPlayer} marker`}
          className={`
            absolute w-14 h-14
            transition-transform duration-200 ease-in-out
            ${hoveredColumn === null ? 'opacity-0' : 'opacity-100'}
          `}
          style={{
            transform: hoveredColumn === null 
              ? 'translateX(-100%)' 
              : `translateX(${hoveredColumn * 14.28}%)`,
            transitionProperty: 'transform, opacity',
          }}
        />
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-7 gap-1 p-2 bg-white rounded-lg border-black border-2">
        {board.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map((cell, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="relative"
                onMouseEnter={() => setHoveredColumn(colIndex)}
              >
                <Slot
                  value={cell}
                  column={colIndex}
                  onSlotClick={handleSlotClick}
                  isWinningSlot={false}
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Board;