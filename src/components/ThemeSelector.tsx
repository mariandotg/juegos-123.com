import React from 'react';
import type { Theme, Level } from '../config/gameConfig';
import { themes, levels } from '../config/gameConfig';

interface ThemeSelectorProps {
    initialShowThemes?: boolean;
    onThemeSelect: (theme: Theme, level: Level) => void
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ initialShowThemes = true, onThemeSelect }) => {
    const [selectedTheme, setSelectedTheme] = React.useState<Theme | null>(null);
    const [showThemes, setShowThemes] = React.useState(true);

    // React.useEffect(() => {
    //     setShowThemes(initialShowThemes);
    // }, [initialShowThemes]);

    const handleThemeSelect = (theme: Theme) => {
        setSelectedTheme(theme);
        setShowThemes(false);
    };

    const handleLevelSelect = (level: Level) => {
        if (selectedTheme) {
            // Use the slug for the URL (or id if you prefer)
            const themeIdentifier = selectedTheme.slug || selectedTheme.id;
            
            console.log('Navigating to:', {
                theme: themeIdentifier,
                level: level.id
            });
            
            // Navigate to static route
            //window.location.href = `/jugar/${themeIdentifier}/${level.id}`;
            onThemeSelect(selectedTheme, level)
        }
    };

    const handleBackToThemes = () => {
        setSelectedTheme(null);
        setShowThemes(true);
    };

    if (showThemes) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-4xl font-bold mb-8 text-center">Selecciona un Tema</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => handleThemeSelect(theme)}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center"
                        >
                            <h2 className="text-2xl font-semibold mb-4">{theme.name}</h2>
                            <p className="text-gray-600 text-center">{theme.description}</p>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Selecciona un Nivel</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {levels.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => handleLevelSelect(level)}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center"
                    >
                        <h2 className="text-2xl font-semibold mb-4">Nivel {level.id}</h2>
                        <p className="text-gray-600 text-center">
                            Tamaño: {level.gridSize}x{level.gridSize}<br />
                            Dificultad: {level.difficulty}
                        </p>
                    </button>
                ))}
            </div>
            <button
                onClick={handleBackToThemes}
                className="mt-8 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200"
            >
                Volver a Temas
            </button>
        </div>
    );
};

export default ThemeSelector;