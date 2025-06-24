import React, { useState, useEffect } from 'react';

const XOXGame = ({ onClose }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getEmptySquares = (currentBoard) => {
    return currentBoard
      .map((square, index) => (square === null ? index : null))
      .filter((square) => square !== null);
  };

  const computerMove = () => {
    const emptySquares = getEmptySquares(board);
    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const computerIndex = emptySquares[randomIndex];
      
      const newBoard = [...board];
      newBoard[computerIndex] = '🤖';
      setBoard(newBoard);
      setIsXNext(true);

      const gameWinner = calculateWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
      }
    }
    setIsComputerTurn(false);
  };

  useEffect(() => {
    if (isComputerTurn && !winner) {
      const timer = setTimeout(() => {
        computerMove();
      }, 500); // Delay 500ms untuk memberikan efek "berpikir"
      return () => clearTimeout(timer);
    }
  }, [isComputerTurn, board, winner]);

  const handleClick = (index) => {
    if (board[index] || winner || isComputerTurn) return;

    const newBoard = [...board];
    newBoard[index] = '❤️';
    setBoard(newBoard);
    setIsXNext(false);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setIsComputerTurn(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsComputerTurn(false);
  };

  const renderSquare = (index) => {
    return (
      <button
        className="w-16 h-16 sm:w-20 sm:h-20 bg-white/80 hover:bg-white text-3xl sm:text-4xl font-bold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center"
        onClick={() => handleClick(index)}
        disabled={isComputerTurn}
      >
        {board[index]}
      </button>
    );
  };

  const getStatus = () => {
    if (winner) {
      return `Pemenang: ${winner}`;
    } else if (board.every(square => square)) {
      return 'Seri!';
    } else if (isComputerTurn) {
      return 'Komputer sedang berpikir...';
    } else {
      return `Giliran: ${isXNext ? '❤️ (Anda)' : '☠️ (Komputer)'}`;
    }
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
          XOX Game
        </h2>

        <div className="text-center mb-4 text-lg font-semibold text-pink-700">
          {getStatus()}
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          {Array(9).fill(null).map((_, index) => (
            <div key={index}>
              {renderSquare(index)}
            </div>
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

export default XOXGame; 
