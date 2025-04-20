import React from 'react';
import type { Theme, Level } from '../config/gameConfig';

interface ThemeSelectorProps {
    onThemeSelect: (theme: Theme, level: Level) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeSelect }) => {
    const [showThemes, setShowThemes] = React.useState(false);
    const [selectedTheme, setSelectedTheme] = React.useState<Theme | null>(null);
    const [themes, setThemes] = React.useState<Theme[]>([]);
    const [levels, setLevels] = React.useState<Level[]>([]);

    React.useEffect(() => {
        // In a real app, you would fetch this from an API
        import('../config/gameConfig').then(({ themes, levels }) => {
            setThemes(themes);
            setLevels(levels);
        });
    }, []);

    const handlePlayClick = () => {
        setShowThemes(true);
    };

    const handleThemeSelect = (theme: Theme) => {
        setSelectedTheme(theme);
    };

    const handleLevelSelect = (level: Level) => {
        if (selectedTheme) {
            onThemeSelect(selectedTheme, level);
        }
    };

    if (!showThemes) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <button
                    onClick={handlePlayClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transition-colors duration-200 active:bg-blue-700"
                >
                    Jugar
                </button>
            </div>
        );
    }

    if (!selectedTheme) {
        return (
            <div className="min-h-screen p-4">
                <h2 className="text-2xl font-bold text-center mb-8">Elige un tema</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {themes.map((theme) => (
                        <div
                            key={theme.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-200"
                            onClick={() => handleThemeSelect(theme)}
                        >
                            <img
                                src={theme.image}
                                alt={theme.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">{theme.name}</h3>
                                <p className="text-gray-600">{theme.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4">
            <h2 className="text-2xl font-bold text-center mb-8">Elige un nivel</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {levels.map((level) => (
                    <div
                        key={level.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-200"
                        onClick={() => handleLevelSelect(level)}
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{level.name}</h3>
                            <p className="text-gray-600">Tamaño: {level.gridSize}x{level.gridSize}</p>
                            <p className="text-gray-600">Dificultad: {level.difficulty}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThemeSelector; 