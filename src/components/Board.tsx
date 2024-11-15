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

  // Handle touch events for mobile
  const handleTouchColumn = (colIndex: number) => {
    setHoveredColumn(colIndex);
  };

  return (
    <div className="max-w-[600px] w-full mx-auto px-2 sm:px-4">
      <div
        className="bg-transparent rounded-xl overflow-hidden flex"
        onMouseLeave={() => setHoveredColumn(null)}
      >
        {/* Column marker container */}
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 p-1 sm:p-2 h-12 sm:h-16 absolute z-50">
          <img
            src={getMarkerImage()}
            alt={`Player ${currentPlayer} marker`}
            className={`
              absolute w-8 h-8 sm:w-14 sm:h-14
              transition-transform duration-200 ease-in-out
              ${hoveredColumn === null ? 'opacity-0' : 'opacity-100'}
            `}
            style={{
              transform: hoveredColumn === null
                ? 'translateX(-100%)'
                : `translateX(${hoveredColumn * (100/7)}%)`,
              transitionProperty: 'transform, opacity',
            }}
          />
        </div>

        {/* Game grid */}
        <div className="board mx-auto grid grid-cols-7 bg-white border-black border-2 mt-0">
        {/* grid grid-cols-7 gap-0.5 sm:gap-1 p-1 sm:p-2 bg-white rounded-lg border-black border-2 */}
          {board.map((row, rowIndex) => (
            <React.Fragment key={`row-${rowIndex}`}>
              {row.map((cell, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="relative"
                  // aspect-square relative
                  onMouseEnter={() => setHoveredColumn(colIndex)}
                  onTouchStart={() => handleTouchColumn(colIndex)}
                >
                  <Slot
                    value={cell}
                    column={colIndex}
                    onSlotClick={handleSlotClick}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;