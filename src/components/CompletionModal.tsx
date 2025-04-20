import React from 'react';

interface CompletionModalProps {
    level: number;
    onNextLevel: () => void;
    onMainMenu: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ level, onNextLevel, onMainMenu }) => {
    const isLastLevel = level === 3;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-4">¡Felicidades! 🎉</h2>
                <p className="text-xl text-center mb-6">
                    {isLastLevel 
                        ? "¡Has completado todos los niveles de este tema!" 
                        : `¡Has completado el nivel ${level}!`}
                </p>
                <div className="flex flex-col gap-4">
                    {!isLastLevel && (
                        <button
                            onClick={onNextLevel}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200"
                        >
                            Siguiente Nivel
                        </button>
                    )}
                    <button
                        onClick={onMainMenu}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200"
                    >
                        Menú Principal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompletionModal; 