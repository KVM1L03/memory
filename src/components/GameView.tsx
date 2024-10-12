import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import Tile from './Tile';
import '../styles/gameView.scss';

const GameView: React.FC = () => {
    const { tiles, isPlaying, startGame, gameTimer, gameComplete, resetGame, attempts, difficulty, revealTile, revealedTiles } = useGameStore();
    const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'normal' | 'hard'>(difficulty);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <div className="game-board">
            <h1>Memory Game</h1>

            {!isPlaying && (
                <div className="difficulty-selection">
                    <label>
                        <input
                            type="radio"
                            value="easy"
                            checked={selectedDifficulty === 'easy'}
                            onChange={() => setSelectedDifficulty('easy')}
                        />
                        Easy
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="normal"
                            checked={selectedDifficulty === 'normal'}
                            onChange={() => setSelectedDifficulty('normal')}
                        />
                        Normal
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="hard"
                            checked={selectedDifficulty === 'hard'}
                            onChange={() => setSelectedDifficulty('hard')}
                        />
                        Hard
                    </label>
                    <button className="play-button" onClick={() => startGame(selectedDifficulty)}>
                        Play
                    </button>
                </div>
            )}

            {isPlaying && (
                <>
                    <div className="game-info">
                        <div>Attempts: {attempts}</div>
                        <div>Timer: {formatTime(gameTimer)}</div>
                    </div>
                    <div className="tiles-container">
                        {tiles.map((tile, index) => (
                            <Tile
                                key={tile.id}
                                image={tile.image}
                                value={tile.value}
                                matched={tile.matched}
                                revealed={revealedTiles.includes(index)}
                                onClick={() => revealTile(index)}
                            />
                        ))}
                    </div>
                </>
            )}

            {gameComplete && (
                <div className="popout">
                    <h2>Congratulations!</h2>
                    <p>You have guessed all tiles!</p>
                    <p>Time taken: {formatTime(gameTimer)}</p>
                    <p>Attempts: {attempts}</p>
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}
        </div>
    );
};

export default GameView;