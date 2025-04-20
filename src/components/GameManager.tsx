import React from 'react';
import type { Theme, Level } from '../config/gameConfig';
import ThemeSelector from './ThemeSelector';
import Puzzle from './Puzzle';

const GameManager: React.FC = () => {
    const [selectedTheme, setSelectedTheme] = React.useState<Theme | null>(null);
    const [selectedLevel, setSelectedLevel] = React.useState<Level | null>(null);

    const handleThemeAndLevelSelect = (theme: Theme, level: Level) => {
        setSelectedTheme(theme);
        setSelectedLevel(level);
    };

    if (!selectedTheme || !selectedLevel) {
        return <ThemeSelector onThemeSelect={handleThemeAndLevelSelect} />;
    }

    return (
        <Puzzle
            gridSize={selectedLevel.gridSize}
            imageSrc={selectedLevel.imageSrc}
            level={selectedLevel.id}
        />
    );
};

export default GameManager; 