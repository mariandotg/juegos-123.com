export interface Theme {
    id: number;
    slug: string;
    name: string;
    imageBanner: string;
    images: {
        [key: number]: string; // level number to image URL
    };
    description: string;
}

export interface Level {
    id: number;
    name: string;
    gridSize: number;
    difficulty: 'easy' | 'medium' | 'hard';
}

export const themes: Theme[] = [
    {
        id: 1,
        slug: 'selva',
        name: 'Animales de la Selva',
        imageBanner: "",
        images: {
            1: '/themes/selva/level1.webp',
            2: '/themes/selva/level2.webp',
            3: '/themes/selva/level3.webp'
        },
        description: '¡Descubre increíbles animales salvajes!'
    },
    {
        id: 2,
        slug: 'dinosaurs',
        name: 'Dinosaurios',
        imageBanner: "",
        images: {
            1: '/themes/dinosaurs/level1.webp',
            2: '/themes/dinosaurs/level2.webp',
            3: '/themes/dinosaurs/level3.webp'
        },
        description: '¡Viaja al pasado con los dinosaurios!'
    },
    {
        id: 3,
        slug: 'acuaticos2',
        name: 'Océano',
        imageBanner: "",
        images: {
            1: '/themes/acuaticos2/level1.jpg',
            2: '/themes/acuaticos2/level2.webp',
            3: '/themes/acuaticos2/level3.webp'
        },
        description: '¡Explora las profundidades del océano!'
    },
    {
        id: 4,
        slug: 'space',
        name: 'Espacio',
        imageBanner: "",
        images: {
            1: '/themes/space/level1.webp',
            2: '/themes/space/level2.webp',
            3: '/themes/space/level3.webp'
        },
        description: '¡Viaja por el espacio!'
    }
];

export const levels: Level[] = [
    {
        id: 1,
        name: 'Principiante',
        gridSize: 3,
        difficulty: 'easy'
    },
    {
        id: 2,
        name: 'Intermedio',
        gridSize: 4,
        difficulty: 'medium'
    },
    {
        id: 3,
        name: 'Avanzado',
        gridSize: 5,
        difficulty: 'hard'
    }
];