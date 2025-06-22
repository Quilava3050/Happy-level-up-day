import React, { useState } from 'react';

const ImageRow = ({ direction = 'right', images }) => {
  const [failedImages, setFailedImages] = useState([]);

  // Gandakan array gambar
  const loopedImages = [...images, ...images];

  // Pilih animasi berdasarkan arah
  const animationClass = direction === 'right' ? 'move-right' : 'move-left';

  const handleError = (index) => {
    setFailedImages((prev) => [...prev, index]);
  };

  // Data love untuk animasi hujan
  const loveCount = 20;
  const loves = Array.from({ length: loveCount }).map((_, i) => ({
    left: Math.random() * 100, // posisi X acak (persen)
    delay: Math.random() * 5,  // delay animasi acak (detik)
    size: 20 + Math.random() * 20, // ukuran acak (px)
    key: i,
  }));

  return (
    <div className="overflow-hidden h-[25vh] w-full relative">
      {/* Animasi hujan love */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-10">
        {loves.map(love => (
          <span
            key={love.key}
            className="love-fall"
            style={{
              left: `${love.left}%`,
              animationDelay: `${love.delay}s`,
              fontSize: `${love.size}px`,
            }}
          >❤️</span>
        ))}
      </div>
      <div className={`flex w-max h-full ${animationClass}`}>
        {loopedImages.map((src, index) => {
          const isFailed = failedImages.includes(index % images.length);
          return isFailed ? (
            <div
              key={index}
              className="flex items-center justify-center bg-pink-600 text-white font-bold text-sm aspect-square w-[24vw] sm:w-[12.5vw] h-auto"
            >
              I love you
            </div>
          ) : (
            <img
              key={index}
              src={src}
              alt={`Image ${index}`}
              loading="lazy"
              onError={() => handleError(index % images.length)}
              className="object-cover aspect-square w-[24vw] sm:w-[12.5vw] h-auto"
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageRow;
