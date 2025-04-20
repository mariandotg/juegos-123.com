export interface Theme {
    id: string;
    name: string;
    image: string;
    description: string;
}

export interface Level {
    id: number;
    name: string;
    gridSize: number;
    difficulty: 'easy' | 'medium' | 'hard';
    imageSrc: string;
}

export const themes: Theme[] = [
    {
        id: 'animals',
        name: 'Animales',
        image: '/themes/animals.webp',
        description: '¡Descubre increíbles animales!'
    },
    {
        id: 'dinosaurs',
        name: 'Dinosaurios',
        image: '/themes/dinosaurs.webp',
        description: '¡Viaja al pasado con los dinosaurios!'
    },
    {
        id: 'ocean',
        name: 'Océano',
        image: '/themes/ocean.webp',
        description: '¡Explora las profundidades del océano!'
    },
    {
        id: 'space',
        name: 'Espacio',
        image: '/themes/space.webp',
        description: '¡Viaja por el espacio!'
    }
];

export const levels: Level[] = [
    {
        id: 1,
        name: 'Principiante',
        gridSize: 3,
        difficulty: 'easy',
        imageSrc: "/puzzle1.webp"
    },
    {
        id: 2,
        name: 'Intermedio',
        gridSize: 4,
        difficulty: 'medium',
        imageSrc: "/puzzle1.webp"
    },
    {
        id: 3,
        name: 'Avanzado',
        gridSize: 5,
        difficulty: 'hard',
        imageSrc: "/puzzle1.webp"
    }
]; 