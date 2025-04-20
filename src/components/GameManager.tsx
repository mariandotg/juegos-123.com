import React from 'react';
import type { Theme, Level } from '../config/gameConfig';
import ThemeSelector from './ThemeSelector';
import Puzzle from './Puzzle';
import CompletionModal from './CompletionModal';
import { levels } from '../config/gameConfig';

const GameManager: React.FC = () => {
    const [selectedTheme, setSelectedTheme] = React.useState<Theme | null>(null);
    const [selectedLevel, setSelectedLevel] = React.useState<Level | null>(null);
    const [showCompletionModal, setShowCompletionModal] = React.useState(false);
    const [showThemes, setShowThemes] = React.useState(false);

    const handleThemeAndLevelSelect = (theme: Theme, level: Level) => {
        setSelectedTheme(theme);
        setSelectedLevel(level);
        setShowCompletionModal(false);
        setShowThemes(false);
    };

    const handlePuzzleComplete = () => {
        setShowCompletionModal(true);
    };

    const handleNextLevel = () => {
        if (selectedTheme && selectedLevel && selectedLevel.id < 3) {
            const nextLevel = levels.find(l => l.id === selectedLevel.id + 1);
            if (nextLevel) {
                setSelectedLevel(nextLevel);
                setShowCompletionModal(false);
            }
        }
    };

    const handleMainMenu = () => {
        setSelectedTheme(null);
        setSelectedLevel(null);
        setShowCompletionModal(false);
        setShowThemes(true);
    };

    if (!selectedTheme || !selectedLevel) {
        return <ThemeSelector onThemeSelect={handleThemeAndLevelSelect} initialShowThemes={showThemes} />;
    }

    return (
        <>
            <Puzzle
                gridSize={selectedLevel.gridSize}
                imageSrc={selectedTheme.images[selectedLevel.id]}
                level={selectedLevel.id}
                onComplete={handlePuzzleComplete}
            />
            {showCompletionModal && (
                <CompletionModal
                    level={selectedLevel.id}
                    onNextLevel={handleNextLevel}
                    onMainMenu={handleMainMenu}
                />
            )}
        </>
    );
};

export default GameManager; 