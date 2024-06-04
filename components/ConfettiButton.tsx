import React, { useState, useEffect, useRef } from 'react';
const SHAPES = ['square', 'triangle'];
const COLOR_DIGIT = 'ABCDEF1234567890';

const ConfettiButton = () => {
  const [isConfettiActive, setConfettiActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isConfettiActive) {
      generateConfetti();
    }
  }, []);

  const generateRandomColor = () => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += COLOR_DIGIT[Math.floor(Math.random() * COLOR_DIGIT.length)];
    }
    return color;
  };

  const generateConfetti = () => {
    const container = containerRef.current;
    if (container) {
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        const positionX = Math.random() * window.innerWidth;
        const positionY = Math.random() * window.innerHeight;
        const rotation = Math.random() * 360;
        const size = Math.floor(Math.random() * (20 - 5 + 1)) + 5; // Set confetti styles
        confetti.style.left = `${positionX}px`;
        confetti.style.top = `${positionY}px`;
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.className =
          'confetti ' + SHAPES[Math.floor(Math.random() * 3)];
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = generateRandomColor(); // Append confetti to the container
        container.appendChild(confetti);
        // Remove confetti element after animation duration (4 seconds)
        setTimeout(() => {
          container.removeChild(confetti);
        }, 4000);
      }
    }
  };

  return (
    <div>
      <div
        className="absolute top-0 left-0 w-screen h-screen pointer-events-none z-50"
        ref={containerRef}
        id="confetti-container"
      ></div>
    </div>
  );
};

export default ConfettiButton;
