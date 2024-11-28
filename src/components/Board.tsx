import React, { useState, useEffect } from 'react';
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

  // Reset hovered column when game restarts
  useEffect(() => {
    setHoveredColumn(null);
  }, [board]);

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
    <div className="max-w-[600px] min-md:w-full mx-auto px-2 sm:px-4 sm:pt-2">
      <div
        className="bg-transparent rounded-xl overflow-hidden flex"
        onMouseLeave={() => setHoveredColumn(null)}
      >
        {/* Column marker container */}
        <div className="lg:w-[525px] max-md:hidden absolute z-50 h-14 -top-10">
          <img
            src={getMarkerImage()}
            alt={`Player ${currentPlayer} marker`}
            className={`
              absolute w-14 h-12 sm:w-14 sm:h-14
              transition-all duration-500 ease-in-out
              ${hoveredColumn === null ? 'opacity-0' : 'opacity-100'}
              transform -translate-y-2
            `}
            style={{
              left: hoveredColumn !== null ? `${(hoveredColumn * (100/7))}%` : '100%',
              transform: `translateX(30%)`,
            }}
          />
        </div>
        {/* Game grid */}
        <div className="board w-full grid grid-cols-7 bg-white mt-0">
          {board.map((row, rowIndex) => (
            <React.Fragment key={`row-${rowIndex}`}>
              {row.map((cell, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="relative aspect-square"
                  onMouseEnter={() => setHoveredColumn(colIndex)}
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