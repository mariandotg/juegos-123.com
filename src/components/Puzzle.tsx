import React from 'react';

interface PuzzleProps {
    gridSize: number;
}

function shuffle(arra1: number[]) {
    var ctr = arra1.length,
      temp,
      index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
}

const Puzzle: React.FunctionComponent<PuzzleProps> = ({ gridSize }) => {
    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [tiles, setTiles] = React.useState<number[]>(Array.from({ length: gridSize * gridSize }, (_, index) => index));
    const [tileToSwap, setTileToSwap] = React.useState<number | null>(null);

    // Detect orientation and update dimensions
    React.useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        const mountArray = shuffle([...tiles]);
        setTiles(mountArray);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Calculate puzzle size based on screen dimensions
    const isLandscape = dimensions.width > dimensions.height;
    const isMobile = dimensions.width < 768; // Standard mobile breakpoint
    
    // Calculate puzzle dimensions with proper padding
    const maxWidth = isMobile ? dimensions.width - 32 : dimensions.width - 64;
    const maxHeight = isMobile ? dimensions.height - 32 : dimensions.height - 64;
    
    // Maintain aspect ratio while fitting within screen
    const aspectRatio = 16 / 9;
    let puzzleWidth = maxWidth;
    let puzzleHeight = maxWidth / aspectRatio;
    
    if (puzzleHeight > maxHeight) {
        puzzleHeight = maxHeight;
        puzzleWidth = maxHeight * aspectRatio;
    }

    // Calculate tile dimensions
    const tileWidth = puzzleWidth / gridSize;
    const tileHeight = puzzleHeight / gridSize;

    const changeOrder = (tileToSwapIndex: number, targetIndex: number) => {
        setTiles((prevTiles) => {
            const array = [...prevTiles];
            const temp = array[tileToSwapIndex];
            array[tileToSwapIndex] = array[targetIndex];
            array[targetIndex] = temp;
            return array;
        });
    };

    const moveTile = (index: number) => {
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
            }

            setTileToSwap(null);
        }
    };
    
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div
                className="grid gap-1"
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    width: `${puzzleWidth}px`,
                    height: `${puzzleHeight}px`,
                }}
            >
                {tiles.map((tile, index) => (
                    <div 
                        key={index} 
                        className="relative touch-manipulation" 
                        style={{ width: `${tileWidth}px`, height: `${tileHeight}px` }}
                    >
                        {tileToSwap === index && (
                            <div
                                className={`border-2 absolute inset-0 z-10 ${tileToSwap === index ? 'border-yellow-600' : 'border-transparent'}`}
                                onClick={() => moveTile(index)}
                                onTouchStart={() => moveTile(index)}
                            ></div>
                        )}
                        <div
                            className={`flex items-center justify-center bg-green-700 text-white font-bold text-xl cursor-pointer z-0 touch-manipulation`}
                            style={{
                                width: `${tileWidth}px`,
                                height: `${tileHeight}px`,
                                backgroundImage: "url('/puzzle1.webp')",
                                backgroundSize: `${puzzleWidth}px ${puzzleHeight}px`,
                                backgroundPosition: `${-(tile % gridSize) * tileWidth}px ${-Math.floor(tile / gridSize) * tileHeight}px`
                            }}
                            onClick={() => moveTile(index)}
                            onTouchStart={() => moveTile(index)}
                        >
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Puzzle;
