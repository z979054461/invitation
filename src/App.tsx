import React from "react";
import PictureWall from "./PictureWall";
import "./App.scss";

function App() {
  return (
    <div
      className="App"
      style={{ perspective: `${document.documentElement.clientHeight * 4}px` }}
    >
      <PictureWall />
    </div>
  );
}

export default App;
