import React, { useState, useEffect } from "react";

const PuzzleComponent = ({ gridSize }: {gridSize: number}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setOrientation(window.innerWidth > window.innerHeight ? "landscape" : "portrait");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calcular el tamaño del puzzle basándonos en la orientación y mantener la relación 16:9
  const puzzleWidth = orientation === "portrait" ? width - 64 : (height - 64) * (16 / 9);
  const puzzleHeight = puzzleWidth * (9 / 16);
  const pieceWidth = puzzleWidth / gridSize;
  const pieceHeight = puzzleHeight / gridSize;

  return (
    <div
      style={{
        width: `${puzzleWidth}px`,
        height: `${puzzleHeight}px`,
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, ${pieceWidth}px)`,
        gridTemplateRows: `repeat(${gridSize}, ${pieceHeight}px)`,
        backgroundColor: "#00C4CC", // Color de fondo del contenedor del puzzle
        position: "relative",
        margin: "0 auto",
      }}
    >
      {/* Aquí renderizas tus piezas de puzzle usando pieceWidth y pieceHeight */}
      {[...Array(gridSize * gridSize)].map((_, index) => (
        <div
          key={index}
          style={{
            width: `${pieceWidth}px`,
            height: `${pieceHeight}px`,
            border: "1px solid #FFFFFF",
            backgroundImage: "url(/puzzle1.webp)",
            backgroundSize: `${puzzleWidth}px ${puzzleHeight}px`,
            backgroundPosition: `${-(index % gridSize) * pieceWidth}px ${-Math.floor(index / gridSize) * pieceHeight}px`,
          }}
        />
      ))}
    </div>
  );
};

export default PuzzleComponent;
