import React, { useState } from 'react';

const GameMenu = ({ onSelectGame }) => {
  const [isOpen, setIsOpen] = useState(false);

  const games = [
    { id: 'xox', name: 'XOX Game', icon: '🎮' },
    { id: 'bomb', name: 'Kupon Bom', icon: '💣' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
        aria-label="Game Menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 animate-fadeIn">
          <div className="py-1">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => {
                  onSelectGame(game.id);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-pink-100 rounded-md transition-colors duration-200 flex items-center gap-2"
              >
                <span>{game.icon}</span>
                <span>{game.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameMenu; 