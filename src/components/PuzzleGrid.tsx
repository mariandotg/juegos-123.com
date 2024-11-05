// src/components/PuzzleGrid.tsx
import React, { useState, useEffect } from 'react';
import puzzleImage from '../puzzle1.jpg';

const gridSize = 3; // Tamaño del tablero (3x3)

const PuzzleGrid: React.FC = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedTile, setSelectedTile] = useState<number>();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    const initialTiles = Array.from({ length: gridSize * gridSize }, (_, index) => index);
    setTiles(shuffleArray(initialTiles));
  };

  const shuffleArray = (array: number[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const moveTile = (index: number) => {
    const emptyIndex = tiles.indexOf(tiles.length - 1);
    const isAdjacent = Math.abs(emptyIndex - index) === 1 || Math.abs(emptyIndex - index) === gridSize;
    setSelectedTile((prevValue) => prevValue === index ? -1 : index)
    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      checkCompletion(newTiles);
    }
  };

  const checkCompletion = (currentTiles: number[]) => {
    const isSolved = currentTiles.every((tile, idx) => tile === idx);
    setIsCompleted(isSolved);
  };
    console.log(tiles)
  return (
    <div className="mt-24 text-center flex justify-center items-center flex-col">
      <h2 className="text-2xl font-bold mb-4 text-white">{isCompleted ? '¡Completado!' : 'Resuelve el Rompecabezas'}</h2>
      <div className="grid grid-cols-3 size-[290px]">
        {tiles.map((tile, index) => (
            <div className='relative'>
                {selectedTile === index && <div className={`border-2 w-24 h-24 absolute z-10
                ${selectedTile === index ? 'border-red-600' : 'border-transparent'}`}>
                </div>}

                <div
                    key={index}
                    className={`w-24 h-24 flex items-center justify-center text-white font-bold text-xl cursor-pointer absolute z-0`}
                    style={{
                        backgroundImage: "url('/puzzle1.jpg')",
                        backgroundSize: '300px 300px',
                        backgroundPosition: `${-(tile % gridSize) * 100}px ${-Math.floor(tile / gridSize) * 100}px`
                    }}
                    onClick={() => moveTile(index)}
                    >
                    {/* {tile !== tiles.length - 1 ? tile + 1 : ''} */}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PuzzleGrid;
