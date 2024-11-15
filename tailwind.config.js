/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Game specific colors
        'game-purple': '#7945FF', // Main background
        'game-purple-dark': '#5C2DD5', // Darker purple for depth
        'player1': '#FD6687', // Pink/Coral for player 1
        'player2': '#FFCE67', // Yellow for player 2
        'board-white': '#FFFFFF', // Board background
        'timer-pink': '#FF6B8D', // Timer background

        // System colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        'game': '1rem',
        lg: 'var(--radius)',
        default: "40px",
        small: "20px",
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'piece-drop': 'dropIn 0.5s ease-in-out',
        'piece-bounce': 'bounce 0.5s ease-in-out',
      },
      keyframes: {
        dropIn: {
          '0%': { transform: 'translateY(-200%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10%)' },
        }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}