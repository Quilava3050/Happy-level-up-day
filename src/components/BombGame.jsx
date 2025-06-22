import React, { useState, useEffect } from 'react';

const BombGame = ({ onClose }) => {
  const [boxes, setBoxes] = useState([]);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [message, setMessage] = useState('Pilih satu kotak!');
  const [playerLoveCount, setPlayerLoveCount] = useState(0);
  const [computerLoveCount, setComputerLoveCount] = useState(0);
  const [lastMove, setLastMove] = useState(null);

  // Inisialisasi kotak saat komponen dimuat
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Buat array dengan 10 love dan 2 bom
    const items = Array(10).fill('❤️').concat(Array(2).fill('💣'));
    // Acak posisi items
    const shuffledItems = items.sort(() => Math.random() - 0.5);
    setBoxes(shuffledItems.map((item, index) => ({
      id: index,
      content: item,
      isRevealed: false,
      owner: null // null, 'player', atau 'computer'
    })));
    setSelectedBoxes([]);
    setGameStatus('playing');
    setIsComputerTurn(false);
    setMessage('Pilih satu kotak!');
    setPlayerLoveCount(0);
    setComputerLoveCount(0);
    setLastMove(null);
  };

  // Fungsi untuk gerakan komputer
  useEffect(() => {
    if (isComputerTurn && gameStatus === 'playing') {
      const timer = setTimeout(() => {
        const availableBoxes = boxes.filter(box => !box.isRevealed);
        if (availableBoxes.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableBoxes.length);
          const computerBox = availableBoxes[randomIndex];
          handleBoxClick(computerBox.id, true);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isComputerTurn, boxes, gameStatus]);

  const handleBoxClick = (boxId, isComputer = false) => {
    if (gameStatus !== 'playing') return;
    if (isComputer && !isComputerTurn) return;
    if (!isComputer && isComputerTurn) return;

    const newBoxes = [...boxes];
    const clickedBox = newBoxes.find(box => box.id === boxId);
    
    if (clickedBox && !clickedBox.isRevealed) {
      clickedBox.isRevealed = true;
      clickedBox.owner = isComputer ? 'computer' : 'player';
      setBoxes(newBoxes);
      setSelectedBoxes([...selectedBoxes, boxId]);
      setLastMove({ boxId, isComputer });

      if (clickedBox.content === '❤️') {
        if (isComputer) {
          const newCount = computerLoveCount + 1;
          setComputerLoveCount(newCount);
          if (newCount === 10) {
            setGameStatus('lost');
            setMessage('Komputer berhasil mengumpulkan semua love! 💔');
          } else {
            setMessage(`Komputer mendapatkan love! (${newCount}/10) ❤️`);
          }
        } else {
          const newCount = playerLoveCount + 1;
          setPlayerLoveCount(newCount);
          if (newCount === 10) {
            setGameStatus('won');
            setMessage('Selamat! Kamu berhasil mengumpulkan semua love! 🎉');
          } else {
            setMessage(`Kamu mendapatkan love! (${newCount}/10) ❤️`);
          }
        }
      } else {
        setGameStatus('lost');
        setMessage(isComputer ? 
          'Komputer terkena bom! Kamu menang! 🎉' : 
          'Sayang sekali, kamu terkena bom! 💔'
        );
      }

      setIsComputerTurn(!isComputerTurn);
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-6 sm:p-8 relative animate-zoomIn">
        <button
          className="absolute top-2 right-2 text-2xl text-pink-500 hover:text-pink-700 font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
          Kupon Bom
        </h2>

        <div className="text-center mb-4 text-lg font-semibold text-pink-700">
          {message}
        </div>

        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-pink-500">Kamu</div>
            <div className="text-2xl">❤️ {playerLoveCount}/10</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-500">Komputer</div>
            <div className="text-2xl">❤️ {computerLoveCount}/10</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4">
          {boxes.map((box) => (
            <button
              key={box.id}
              onClick={() => handleBoxClick(box.id)}
              disabled={box.isRevealed || gameStatus !== 'playing' || isComputerTurn}
              className={`w-16 h-16 sm:w-20 sm:h-20 text-3xl sm:text-4xl font-bold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center relative
                ${box.isRevealed 
                  ? 'bg-white' 
                  : 'bg-pink-100 hover:bg-pink-200'
                }
                ${lastMove?.boxId === box.id ? 'ring-4 ring-yellow-400' : ''}
              `}
            >
              {box.isRevealed ? box.content : '?'}
              {box.owner && (
                <div className={`absolute -top-2 -right-2 text-sm ${box.owner === 'player' ? 'text-pink-500' : 'text-blue-500'}`}>
                  {box.owner === 'player' ? '👤' : '🤖'}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={resetGame}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
          >
            Mulai Ulang
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default BombGame; 