import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Player = 1 | 2;
export type Cell = Player | null;
export type Board = Cell[][];

interface GameState {
  board: (1 | 2 | null)[][];
  currentPlayer: 1 | 2;
  winner: 1 | 2 | null;
  isGameOver: boolean;
  isDraw: boolean;
  gameMode: 'menu' | 'game' | 'rules';
  scores: {
    player1: number;
    player2: number;
  };
  firstTurnPlayer: 1 | 2;
  lastMove: { row: number; col: number } | null;
}

const initialState: GameState = {
  board: Array(6).fill(null).map(() => Array(7).fill(null)),
  currentPlayer: 1,
  winner: null,
  isGameOver: false,
  isDraw: false,
  gameMode: 'menu',
  scores: {
    player1: 0,
    player2: 0,
  },
  firstTurnPlayer: 1,
  lastMove: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (state, action: PayloadAction<number>) => {
      const col = action.payload;
      let row = -1;
      
      // Find the lowest empty row in the selected column
      for (let r = 5; r >= 0; r--) {
        if (!state.board[r][col]) {
          row = r;
          break;
        }
      }
      
      // If column is full, return without making any changes
      if (row === -1) return;
      
      // Make the move
      state.board[row][col] = state.currentPlayer;
      state.lastMove = { row, col };
      
      // Check for win
      if (checkWin(state.board, state.currentPlayer, row, col)) {
        state.winner = state.currentPlayer;
        state.isGameOver = true;
        // Update score when win is detected
        if (state.currentPlayer === 1) {
          state.scores.player1 += 1;
        } else {
          state.scores.player2 += 1;
        }
      }
      // Check for draw
      else if (checkDraw(state.board)) {
        state.isDraw = true;
        state.isGameOver = true;
      }
      // Switch players
      else {
        state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
      }
    },
    
    makeWinner: (state, action: PayloadAction<1 | 2>) => {
      state.winner = action.payload;
      state.isGameOver = true;
      if (action.payload === 1) {
        state.scores.player1 += 1;
      } else {
        state.scores.player2 += 1;
      }
    },
    
    startNewGame: (state) => {
      state.board = Array(6).fill(null).map(() => Array(7).fill(null));
      state.winner = null;
      state.isGameOver = false;
      state.isDraw = false;
      // Switch first turn player
      state.firstTurnPlayer = state.firstTurnPlayer === 1 ? 2 : 1;
      state.currentPlayer = state.firstTurnPlayer;
      state.lastMove = null;
    },
    
    resetGame: (state) => {
      return {
        ...initialState,
        gameMode: state.gameMode,
      };
    },
    
    setGameMode: (state, action: PayloadAction<GameState['gameMode']>) => {
      state.gameMode = action.payload;
    },
    
    // Add a new reducer to reset scores independently
    resetScores: (state) => {
      state.scores.player1 = 0;
      state.scores.player2 = 0;
    },
  },
});

// Helper functions remain the same
const checkWin = (board: Board, player: Player, row: number, col: number): boolean => {
  const directions = [
    [0, 1],  // horizontal
    [1, 0],  // vertical
    [1, 1],  // diagonal right
    [1, -1], // diagonal left
  ];
  
  return directions.some(([dx, dy]) => {
    let count = 1;
    
    // Check forward direction
    for (let i = 1; i < 4; i++) {
      const newRow = row + (dx * i);
      const newCol = col + (dy * i);
      if (
        newRow < 0 || newRow >= 6 ||
        newCol < 0 || newCol >= 7 ||
        board[newRow][newCol] !== player
      ) break;
      count++;
    }
    
    // Check backward direction
    for (let i = 1; i < 4; i++) {
      const newRow = row - (dx * i);
      const newCol = col - (dy * i);
      if (
        newRow < 0 || newRow >= 6 ||
        newCol < 0 || newCol >= 7 ||
        board[newRow][newCol] !== player
      ) break;
      count++;
    }
    
    return count >= 4;
  });
};

const checkDraw = (board: Board): boolean => {
  return board[0].every(cell => cell !== null);
};

export const {
  makeMove,
  makeWinner,
  startNewGame,
  resetGame,
  setGameMode,
  resetScores
} = gameSlice.actions;

export default gameSlice.reducer;