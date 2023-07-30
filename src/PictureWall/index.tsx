import React, { useState, useMemo, useLayoutEffect } from "react";
import "./index.scss";

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

/** 照片相对于视口高度的缩小比例 */
const ShinkRatio = 0.9;
/** 照片的宽高比 */
const AspectRatio = 1.5;

function PictureWall() {
  const [rotateY, setRotateY] = useState(0);
  // 手指的初始位置
  const [startX, setStartX] = useState(0);

  const [baseHeight, setBaseHeight] = useState(900);
  const [baseWidth, setBaseWidth] = useState(600);

  useLayoutEffect(() => {
    const handleResize = () => {
      setBaseHeight(document.documentElement.clientHeight || 900);
      setBaseWidth(document.documentElement.clientWidth || 600);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

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

  const styles = useMemo(
    () =>
      pictures.map((item, index) => {
        let height;
        let width;
        if (window.screen.height > window.screen.width) {
          // 竖屏
          width = baseWidth * ShinkRatio;
          height = width * AspectRatio;
        } else {
          height = baseHeight * ShinkRatio;
          width = height / AspectRatio;
        }

        /** 半径 */
        const radius = ((width + 20) * pictureNumber) / (2 * Math.PI);
        /** 当前图片的角度 */
        const deg = ((index + 1) * 360) / pictureNumber;
        const x = radius * Math.sin((deg * Math.PI) / 180);
        const z = radius * Math.cos((deg * Math.PI) / 180);
        return {
          height: `${height}px`,
          width: `${width}px`,
          marginLeft: `${-width / 2}px`,
          marginTop: `${-height / 2}px`,
          transform: `translate3d(${x}px, 0, ${z}px) rotateY(${180 + deg}deg)`,
        };
      }),
    [baseHeight]
  );

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="picture-wall-wrapper"
      style={{ transform: `rotateY(${rotateY}deg)` }}
    >
      {pictures.map((picture, index) => (
        <img
          key={picture}
          onClick={(e) => handleClick(index)}
          src={picture}
          alt=""
          style={styles[index]}
        />
      ))}
    </div>
  );
}

export default PictureWall;
