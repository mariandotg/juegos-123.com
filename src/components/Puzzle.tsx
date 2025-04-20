import React from 'react';
import Confetti from 'react-confetti';

interface PuzzleProps {
    gridSize: number;
    imageSrc: string;
    level: number;
    onComplete: () => void
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

const Puzzle: React.FunctionComponent<PuzzleProps> = ({ gridSize, imageSrc, level, onComplete }) => {
    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [tiles, setTiles] = React.useState<number[]>([]);
    const [tileToSwap, setTileToSwap] = React.useState<number | null>(null);
    const [isMuted, setIsMuted] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [animatingTiles, setAnimatingTiles] = React.useState<[number, number] | null>(null);
    const [isComplete, setIsComplete] = React.useState(false);
    const moveSound = React.useRef<HTMLAudioElement | null>(null);
    const backgroundMusic = React.useRef<HTMLAudioElement | null>(null);

    // Initialize tiles when gridSize or level changes
    React.useEffect(() => {
        const initialTiles = Array.from({ length: gridSize * gridSize }, (_, index) => index);
        setTiles(shuffle(initialTiles));
        setTileToSwap(null);
        setIsComplete(false);
    }, [gridSize, level]);

    // Check if puzzle is complete
    const checkCompletion = React.useCallback(() => {
        const isComplete = tiles.every((tile, index) => tile === index);
        if (isComplete && tiles.length > 0) {
            setIsComplete(true);
            onComplete()
            // Stop confetti after 5 seconds
            setTimeout(() => {
                setIsComplete(false);
            }, 5000);
        }
    }, [tiles]);

    // Check completion after each move
    React.useEffect(() => {
        checkCompletion();
    }, [tiles, checkCompletion]);

    // Initialize audio
    React.useEffect(() => {
        moveSound.current = new Audio('/move-sound.mp3');
        moveSound.current.volume = 0.5;

        backgroundMusic.current = new Audio('/background-music.mp3');
        backgroundMusic.current.volume = 0.3;
        backgroundMusic.current.loop = true;

        const playBackgroundMusic = async () => {
            try {
                await backgroundMusic.current?.play();
            } catch (error) {
                console.log("Background music play failed:", error);
            }
        };
        playBackgroundMusic();

        return () => {
            if (backgroundMusic.current) {
                backgroundMusic.current.pause();
                backgroundMusic.current.currentTime = 0;
            }
        };
    }, []);

    // Handle mute state changes
    React.useEffect(() => {
        if (backgroundMusic.current) {
            if (isMuted) {
                backgroundMusic.current.pause();
            } else {
                backgroundMusic.current.play().catch(error => {
                    console.log("Background music play failed:", error);
                });
            }
        }
    }, [isMuted]);

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

    // Check if device is mobile
    const isMobile = React.useMemo(() => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }, []);

    // Check if device is in portrait mode
    const isPortrait = React.useMemo(() => {
        return dimensions.height > dimensions.width;
    }, [dimensions]);

    // Calculate responsive dimensions
    const containerStyle = React.useMemo(() => {
        const isLandscape = dimensions.width > dimensions.height;
        const isMobileView = dimensions.width < 768;

        const aspectRatio = 16 / 9;
        let width, height;

        if (isMobileView) {
            if (isPortrait) {
                width = Math.min(dimensions.width * 0.9, dimensions.width - 32);
                height = width / aspectRatio;
            } else {
                height = dimensions.height * 0.9;
                width = height * aspectRatio;

                if (width > dimensions.width * 0.7) {
                    width = dimensions.width * 0.7;
                    height = width / aspectRatio;
                }
            }
        } else {
            height = dimensions.height * 0.8;
            width = height * aspectRatio;

            if (width > dimensions.width * 0.8) {
                width = dimensions.width * 0.8;
                height = width / aspectRatio;
            }
        }

        const tileWidth = width / gridSize;
        const tileHeight = height / gridSize;

        return {
            width,
            height,
            tileWidth,
            tileHeight,
        };
    }, [dimensions, gridSize, isPortrait]);

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
        if (isAnimating) return;
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
                    if (moveSound.current && !isMuted) {
                        moveSound.current.currentTime = 0;
                        moveSound.current.play().catch(error => {
                            console.log("Audio play failed:", error);
                        });
                    }
                    setIsAnimating(true);
                    setAnimatingTiles([tileToSwap, index]);
                    changeOrder(tileToSwap, index);
                    setTimeout(() => {
                        setIsAnimating(false);
                        setAnimatingTiles(null);
                    }, 50);
                }
            } else if (Math.abs(tileToSwap - index) === gridSize) {
                if (moveSound.current && !isMuted) {
                    moveSound.current.currentTime = 0;
                    moveSound.current.play().catch(error => {
                        console.log("Audio play failed:", error);
                    });
                }
                setIsAnimating(true);
                setAnimatingTiles([tileToSwap, index]);
                changeOrder(tileToSwap, index);
                setTimeout(() => {
                    setIsAnimating(false);
                    setAnimatingTiles(null);
                }, 50);
            }

            setTileToSwap(null);
        }
    };

    const reshufflePuzzle = () => {
        const newTiles = shuffle([...tiles]);
        setTiles(newTiles);
        setTileToSwap(null);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const getTileStyle = (index: number) => {
        if (!animatingTiles || !animatingTiles.includes(index)) {
            return {};
        }

        const [fromIndex, toIndex] = animatingTiles;
        const isFromTile = index === fromIndex;
        const isToTile = index === toIndex;

        if (isFromTile || isToTile) {
            const fromRow = Math.floor(fromIndex / gridSize);
            const fromCol = fromIndex % gridSize;
            const toRow = Math.floor(toIndex / gridSize);
            const toCol = toIndex % gridSize;

            const translateX = (toCol - fromCol) * containerStyle.tileWidth;
            const translateY = (toRow - fromRow) * containerStyle.tileHeight;

            return {
                transform: `translate(${isFromTile ? translateX : -translateX}px, ${isFromTile ? translateY : -translateY}px)`,
            };
        }

        return {};
    };
    
    return (
        <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
            {isComplete && (
                <Confetti
                    width={dimensions.width}
                    height={dimensions.height}
                    recycle={false}
                    numberOfPieces={700}
                    gravity={0.9}
                />
            )}
            {isMobile && isPortrait && (
                <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-black text-center p-4 z-50">
                    <p className="text-lg font-bold">Please rotate your device to landscape mode for a better gaming experience!</p>
                </div>
            )}
            <div className={`flex ${isPortrait ? 'flex-col' : 'flex-row'} items-center gap-4`}>
                {isPortrait && (
                    <div className="flex gap-4">
                        <button
                            onClick={reshufflePuzzle}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 active:bg-blue-700 touch-manipulation"
                        >
                            R
                        </button>
                        <button
                            onClick={toggleMute}
                            className={`${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 active:bg-blue-700 touch-manipulation`}
                        >
                            {isMuted ? '🔇' : '🔊'}
                        </button>
                    </div>
                )}
                <div
                    className="grid gap-1 mx-auto"
                    style={{
                        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                        width: `${containerStyle.width}px`,
                        height: `${containerStyle.height}px`,
                        maxWidth: '100%',
                    }}
                >
                    {tiles.map((tile, index) => (
                        <div 
                            key={index} 
                            className="relative touch-manipulation transition-transform duration-200 ease-in-out" 
                            style={{ 
                                width: `${containerStyle.tileWidth}px`, 
                                height: `${containerStyle.tileHeight}px`,
                                ...getTileStyle(index),
                            }}
                        >
                            {tileToSwap === index && (
                                <div
                                    className={`border-2 absolute inset-0 z-10 ${tileToSwap === index ? 'border-yellow-600' : 'border-transparent'}`}
                                    onClick={() => moveTile(index)}
                                    onTouchStart={() => moveTile(index)}
                                ></div>
                            )}
                            <div
                                className={`flex items-center justify-center bg-green-700 text-white font-bold text-xl cursor-pointer z-0 touch-manipulation transition-transform duration-200 ease-in-out`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url('${imageSrc}')`,
                                    backgroundSize: `${containerStyle.width}px ${containerStyle.height}px`,
                                    backgroundPosition: `${-(tile % gridSize) * containerStyle.tileWidth}px ${-Math.floor(tile / gridSize) * containerStyle.tileHeight}px`,
                                }}
                                onClick={() => moveTile(index)}
                                onTouchStart={() => moveTile(index)}
                            >
                            </div>
                        </div>
                    ))}
                </div>
                {!isPortrait && (
                    <div className="flex flex-col gap-4 ml-8">
                        <button
                            onClick={toggleMute}
                            className={`${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 active:bg-blue-700 touch-manipulation`}
                        >
                            {isMuted ? '🔇' : '🔊'}
                        </button>
                        <button
                            onClick={reshufflePuzzle}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 active:bg-blue-700 touch-manipulation"
                        >
                            R
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Puzzle;
