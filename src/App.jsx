import ImageRow from './components/ImageRow'
import HBDPopup from './components/HBDPopup'
import BackgroundMusic from './components/BackgroundMusic'
import XOXGame from './components/XOXGame'
import BombGame from './components/BombGame'
import GameMenu from './components/GameMenu'
import { useState } from 'react'

const images = [
  "/galeri/Gambar WhatsApp 2025-06-22 pukul 21.16.49_5d6350dd.jpg",
  "/galeri/enhance_20250610130843107.jpg",
  "/galeri/IMG-20250319-WA0184.jpg",
  "/galeri/IMG-20250321-WA0262.jpg",
  "/galeri/IMG-20250327-WA0140.jpg",
  "/galeri/IMG-20250327-WA0146.jpg",
  "/galeri/IMG-20250610-WA0041.jpg",
  "/galeri/IMG-20250610-WA0042.jpg",
  "/galeri/IMG-20250610-WA0043.jpg",
  "/galeri/IMG-20250610-WA0044.jpg",
  "/galeri/IMG-20250610-WA0045.jpg",
  "/galeri/IMG-20250610-WA0049.jpg",
  "/galeri/IMG-20250610-WA0050.jpg",
  "/galeri/IMG-20250610-WA0052.jpg",
  "/galeri/IMG-20250610-WA0055.jpg",
  "/galeri/IMG-20250610-WA0057.jpg",
  "/galeri/IMG-20250610-WA0058.jpg",
  "/galeri/IMG-20250610-WA0061.jpg",
  "/galeri/IMG-20250610-WA0063.jpg",
  "/galeri/IMG-20250610-WA0064.jpg",
  "/galeri/IMG-20250610-WA0384.jpg",
  "/galeri/IMG-20250610-WA0385.jpg",
  "/galeri/IMG-20250610-WA0386.jpg",
  "/galeri/IMG-20250622-WA0008.jpg",
  "/galeri/IMG-20250622-WA0009.jpg",
  "/galeri/IMG-20250622-WA0010.jpg"
]

function App() {
  const [showXOXGame, setShowXOXGame] = useState(false);
  const [showBombGame, setShowBombGame] = useState(false);

  const handleGameSelect = (gameId) => {
    switch (gameId) {
      case 'xox':
        setShowXOXGame(true);
        break;
      case 'bomb':
        setShowBombGame(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <BackgroundMusic />
      <HBDPopup />
      
      {/* Game Menu */}
      <div className="fixed top-4 right-4 z-50">
        <GameMenu onSelectGame={handleGameSelect} />
      </div>

      {showXOXGame && <XOXGame onClose={() => setShowXOXGame(false)} />}
      {showBombGame && <BombGame onClose={() => setShowBombGame(false)} />}
      
      <ImageRow direction="right" images={images} />
      <ImageRow direction="left" images={images} />
      <ImageRow direction="right" images={images} />
      <ImageRow direction="left" images={images} />
    </div>
  )
}

export default App
