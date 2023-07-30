import React, { useState } from "react";
import "./App.scss";

const pictures = [
  "./pictures/0K7A0898.jpg",
  "./pictures/0K7A0916.jpg",
  "./pictures/0K7A0952.jpg",
  "./pictures/0K7A1092.jpg",
  "./pictures/0K7A1104.jpg",
  "./pictures/0K7A1143.jpg",
  "./pictures/0K7A1174.jpg",
  "./pictures/0K7A1301.jpg",
  "./pictures/0K7A1431.jpg",
  "./pictures/0K7A1476.jpg",
];

const pictureNumber = pictures.length;

function App() {
  const [rotateY, setRotateY] = useState(0);

  // 手指的初始位置
  const [startX, setStartX] = useState(0);

  const handleClick = (index: number) => {
    setRotateY(
      (((pictureNumber - index + 4 + pictureNumber) % pictureNumber) * 360) /
        pictureNumber
    );
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    setRotateY(
      (prev) => (prev + ((e.deltaY / 100) * 360) / pictureNumber) % 360
    );
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].clientX; // 获取当前手指的位置
    const distanceX = currentX - startX; // 计算手指移动的距离

    setRotateY(
      (prev) => (prev + ((distanceX / 100) * 360) / pictureNumber) % 360
    );
  };

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="App"
      style={{ transform: `rotateY(${rotateY}deg)` }}
    >
      {pictures.map((picture, index) => (
        <img onClick={(e) => handleClick(index)} src={picture} alt="" />
      ))}
    </div>
  );
}

export default App;
