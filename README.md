# Connect Four Game

A modern implementation of the classic Connect Four game built with React, TypeScript, and Vite. Players take turns dropping colored discs into a grid to connect four in a row horizontally, vertically, or diagonally.

## Design Credit

This project was built based on a design challenge from [Frontend Mentor](https://www.frontendmentor.io/). Frontend Mentor provides real-world HTML, CSS, and JavaScript challenges while allowing you to work with professional designs.

[Challenge Link](https://www.frontendmentor.io/challenges/connect-four-game-6G8QVH923s)

## Features
- Interactive game board with animated disc drops
- Player turn tracking
- Win detection for horizontal, vertical, and diagonal connections
- Timer functionality for timed games
- Responsive design for various screen sizes
- Game rules explanation
- Modern UI components using shadcn/ui

## Tech Stack
- React 18
- TypeScript
- Vite
- Redux Toolkit for state management
- Tailwind CSS for styling
- shadcn/ui component library
- Radix UI primitives

## Getting Started

### Prerequisites
- Node.js (v20.17.0 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Jojo-Mitchell/connect-four.git
   ```

2. Navigate to the project directory
    ```bash
    cd connect-four 
    ```

3. Install dependencies
    ```bash
    npm install
    ```

4. Start development server
    ```bash
    npm run dev
    ```

The game will be available at http://localhost:5173

### Building for Production
To create a production build:
 ```bash
 npm run build
 ```

### Deployment
The game is deployed on GitHub Pages. You can play it at: https://jojo-mitchell.github.io/connect-four/

## Future Improvements

### High Priority
- [ ] Implement WebSocket for real-time multiplayer:
  - Live match-making system
  - Real-time game state synchronization
  - Player presence detection
  - Chat functionality between players
  - Game rooms/lobbies
  - Spectator mode

### Lower Priority
- [ ] Implement player profiles and statistics tracking
- [ ] Add sound effects for disc drops and wins
- [ ] Create different game board themes/color schemes
- [ ] Add a replay feature to watch previous games
- [ ] Implement an AI opponent with different difficulty levels
- [ ] Add game save/load functionality
- [ ] Create a leaderboard for timed games
- [ ] Add animations for winning combinations
- [ ] Implement touch/drag controls for mobile devices
