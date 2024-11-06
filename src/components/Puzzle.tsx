import React from 'react';

interface PuzzleProps {
    gridSize: number;
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

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Determine puzzle size based on orientation
    const isLandscape = dimensions.width > dimensions.height;
    const puzzleSize = isLandscape ? dimensions.height - 64 : dimensions.width - 64;
    const tileSize = puzzleSize / gridSize;

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
