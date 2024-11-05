import React from 'react';

interface PuzzleProps {
    gridSize: number;
}

const Puzzle: React.FunctionComponent<PuzzleProps> = ({ gridSize }) => {
    const [tiles, setTiles] = React.useState<number[]>(Array.from({ length: gridSize * gridSize }, (_, index) => index));
    const [tileToSwap, setTileToSwap] = React.useState<number | null>(null);
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const puzzleSize = width - 64; // Width of the puzzle container (screen width minus 64px)
    const tileSize = puzzleSize / gridSize; // Size of each tile

    const changeOrder = (tileToSwapIndex: number, targetIndex: number) => {
        setTiles((prevTiles) => {
            const array = [...prevTiles];
            const temp = array[tileToSwapIndex];
            array[tileToSwapIndex] = array[targetIndex];
            array[targetIndex] = temp;
            console.log("Antes:", prevTiles);
            console.log("Después:", array);
            return array;
        });
    };
    
    const moveTile = (index: number) => {
        console.log("Index seleccionado:", index);
        if (tileToSwap === index) {
            setTileToSwap(null);
            return;
        }
        if (tileToSwap === null) {
            setTileToSwap(index);
            return;
        } else {
            const tileToSwapRow = Math.floor(tileToSwap / gridSize);
            const indexRow = Math.floor(index / gridSize);
    
            if (tileToSwapRow === indexRow) {
                if (tileToSwap - 1 === index || tileToSwap + 1 === index) {
                    changeOrder(tileToSwap, index);
                }
            } else if (Math.abs(tileToSwap - index) === gridSize) {
                changeOrder(tileToSwap, index);
            } else {
                console.log("Movimiento no permitido");
            }
    
            setTileToSwap(null); 
        }
    };

    return (
        <div
            className="grid gap-1"
            style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                width: `${puzzleSize}px`,
                height: `${puzzleSize}px`,
            }}
        >
            {tiles.map((tile, index) => (
                <div key={index} className="relative" style={{ width: `${tileSize}px`, height: `${tileSize}px` }}>
                    {tileToSwap === index && (
                        <div
                            className={`border-2 absolute inset-0 z-10 ${tileToSwap === index ? 'border-yellow-600' : 'border-transparent'}`}
                            onClick={() => moveTile(index)}
                        ></div>
                    )}
                    <div
                        className={`flex items-center justify-center bg-green-700 text-white font-bold text-xl cursor-pointer z-0`}
                        style={{
                            width: `${tileSize}px`,
                            height: `${tileSize}px`,
                            backgroundImage: "url('/puzzle1.webp')",
                            backgroundSize: `${puzzleSize}px ${puzzleSize}px`,
                            backgroundPosition: `${-(tile % gridSize) * tileSize}px ${-Math.floor(tile / gridSize) * tileSize}px`
                        }}
                        onClick={() => moveTile(index)}
                    >
                        {/* {tile} */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Puzzle;
