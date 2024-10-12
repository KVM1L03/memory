import { create } from 'zustand';
import { imageData } from '../assets/data';

interface Tile { // Types for the tiles
    id: number;
    value: number;
    matched: boolean;
    image: string; 
}

type Difficulty = 'easy' | 'normal' | 'hard'; // Types for the difficulty

interface Game { // Types for the game history
    attempts: number;
    time: number;
    difficulty: Difficulty;
    date: Date;
}





interface GameState { // Types for the game state
    tiles: Tile[];
    revealedTiles: number[];
    attempts: number;
    matchedPairs: number;
    isPlaying: boolean;
    gameTimer: number;
    gameComplete: boolean;
    difficulty: Difficulty;
    history: Game[];
    startGame: (difficulty: Difficulty) => void;
    revealTile: (index: number) => void;
    resetGame: () => void;
}

const loadHistory = (): Game[] => {
    const history = localStorage.getItem('gameHistory');
    return history ? JSON.parse(history) : [];
};

const saveHistory = (history: Game[]) => {
    localStorage.setItem('gameHistory', JSON.stringify(history));
};

const loadGameState = (): Partial<GameState> => {
    const state = localStorage.getItem('gameState');
    return state ? JSON.parse(state) : {};
};

const saveGameState = (state: Partial<GameState>) => {
    localStorage.setItem('gameState', JSON.stringify(state));
};

const shuffleArray = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const useGameStore = create<GameState>((set) => {
    let timerInterval: NodeJS.Timeout | null = null;

    const initialState = {
        tiles: [],
        revealedTiles: [],
        attempts: 0,
        matchedPairs: 0,
        isPlaying: false,
        gameTimer: 0,
        gameComplete: false,
        difficulty: 'easy' as Difficulty,
        history: loadHistory(),
        ...loadGameState(),
    };

    return {
        ...initialState,
        // Function to start the game with initial number of tiles for each difficulty level
        startGame: (difficulty: Difficulty) => { 
            let tileCount;
            switch (difficulty) {
                case 'normal':
                    tileCount = 12;
                    break;
                case 'hard':
                    tileCount = 16;
                    break;
                case 'easy':
                default:
                    tileCount = 8;
                    break;
            }

            const selectedImages = shuffleArray(imageData).slice(0, tileCount / 2); // Selecting random images for the tiles
            const tiles = shuffleArray(
                selectedImages.concat(selectedImages).map((image, idx) => ({
                    id: idx,
                    value: idx,
                    matched: false,
                    image: image.image,
                }))
            ); // Shuffling the images for the tiles

            set({
                tiles,
                revealedTiles: [],
                attempts: 0,
                matchedPairs: 0,
                isPlaying: true,
                gameTimer: 0,
                gameComplete: false,
                difficulty,
            });

            timerInterval = setInterval(() => {
                set((state) => {
                    const newState = { gameTimer: state.gameTimer + 1 };
                    saveGameState(newState);
                    return newState;
                });
            }, 1000);
        },

        revealTile: (index: number) =>
            set((state) => {
                if (state.revealedTiles.length === 2) {
                    return state;
                }

                const revealed = [...state.revealedTiles, index];

                if (revealed.length === 2) {
                    const [firstTile, secondTile] = revealed;
                    const matched =
                        state.tiles[firstTile].image === state.tiles[secondTile].image;

                    if (matched) {
                        const newMatchedPairs = state.matchedPairs + 1;
                        const isComplete = newMatchedPairs === state.tiles.length / 2;

                        if (isComplete && timerInterval) {
                            clearInterval(timerInterval);
                        }

                        const newHistory = isComplete
                            ? [
                                ...state.history,
                                {
                                    attempts: state.attempts + 1,
                                    time: state.gameTimer,
                                    difficulty: state.difficulty,
                                    date: new Date(),
                                },
                            ]
                            : state.history;
                        saveHistory(newHistory);

                        const newState = {
                            revealedTiles: [],
                            matchedPairs: newMatchedPairs,
                            attempts: state.attempts + 1,
                            tiles: state.tiles.map((tile, idx) =>
                                idx === firstTile || idx === secondTile
                                    ? { ...tile, matched: true }
                                    : tile
                            ),
                            gameComplete: isComplete,
                            history: newHistory,
                        };
                        saveGameState(newState);
                        return newState;
                    } else {
                        setTimeout(() => {
                            set({
                                revealedTiles: [],
                            });
                        }, 2000);

                        const newState = {
                            revealedTiles: revealed,
                            attempts: state.attempts + 1,
                        };
                        saveGameState(newState);
                        return newState;
                    }
                }

                const newState = { revealedTiles: revealed };
                saveGameState(newState);
                return newState;
            }),

        resetGame: () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
            const newState = {
                tiles: [],
                revealedTiles: [],
                attempts: 0,
                matchedPairs: 0,
                isPlaying: false,
                gameTimer: 0,
                gameComplete: false,
                difficulty: 'easy' as Difficulty,
            };
            saveGameState(newState);
            set(newState);
        },
    };
});