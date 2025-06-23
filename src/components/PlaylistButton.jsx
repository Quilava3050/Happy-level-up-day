import React, { useState } from 'react';

const PlaylistButton = ({ onSelectSong }) => {
  const [isOpen, setIsOpen] = useState(false);

  const songs = [
    { title: "HAPPY LEVELUP DAY", url: "https://files.catbox.moe/bs077o.mp3"},
    { title: "Multo, Cup of Joe", url: "https://files.catbox.moe/5rz3p4.mp3" },
    { title: "Someone to Stay", url: "https://files.catbox.moe/qc3usy.mp3" },
    { title: "Sempurna English Version", url: "https://files.catbox.moe/f1uj7t.mp3" },
    { title: "Sempurna Indonesian Version", url: "https://files.catbox.moe/6sauxu.mp3" },
    { title: "Walking in the Wind - One Direction", url: "https://files.catbox.moe/hvjl0h.mp3"},
    { title: "Where We Are - One Direction", url: "https://files.catbox.moe/nplufo.mp3"},
    { title: "Lana Del Rey - Cinnamon Girl", url: "https://files.catbox.moe/es7unz.mp3" },
    { title: "Milk & Bone - Natalie", url: "https://files.catbox.moe/w32blj.mp3" },
    { title: "Sea Of Feelings (Slowed)", url: "https://files.catbox.moe/r5a8b5.mp3" },
    { title: "CHARLIE PUTH - One Call Away", url: "https://files.catbox.moe/7wg02i.mp3" },
    { title: "everything works out in the end, Luke Willies", url: "https://files.catbox.moe/3o33by.mp3" },
    { title: "ours to keep, Kendis", url: "https://files.catbox.moe/4c5c3q.mp3" },
    { title: "message in a bottle, Taylor Swift", url: "https://files.catbox.moe/jp0bfp.mp3" },
    { title: "Ava, Famy", url: "https://files.catbox.moe/g50rmm.mp3" }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
        aria-label="Playlist"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {songs.map((song, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelectSong(song);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-pink-100 rounded-md transition-colors duration-200"
              >
                {song.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistButton; 
