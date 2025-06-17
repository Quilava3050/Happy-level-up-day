import React, { useState } from 'react';

const HBDPopup = () => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 flex flex-col items-center border-4 border-pink-400 animate-zoomIn">
        <button
          className="absolute top-3 right-3 text-2xl text-pink-500 hover:text-pink-700 font-bold focus:outline-none"
          onClick={() => setShow(false)}
          aria-label="Close"
        >
          ×
        </button>
        <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg mb-4 text-center">
          HBD MY LOVE
        </div>
        <div className="text-4xl mb-2 animate-bounce">🎉❤️🥳</div>
        <div className="text-lg text-pink-700 font-semibold text-center drop-shadow-sm">
          Semoga hari ulang tahunmu penuh kebahagiaan, cinta, dan kejutan indah!<br/>Selalu sehat dan bahagia ya! 💖
        </div>
      </div>
    </div>
  );
};

export default HBDPopup; 