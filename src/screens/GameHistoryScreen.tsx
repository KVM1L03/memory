import React from 'react';
import { useGameStore } from '../store/gameStore';
import '../styles/gameHistoryView.scss';

const GameHistoryView: React.FC = () => {
    const history = useGameStore((state) => state.history);

    return (
        <div className="game-history">
            <h2>Game History</h2>
            {history.length === 0 ? (
                <p>No games played yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Attempts</th>
                            <th>Time (seconds)</th>
                            <th>Difficulty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((game, index) => (
                            <tr key={index}>
                                <td>{new Date(game.date).toLocaleString()}</td>
                                <td>{game.attempts}</td>
                                <td>{game.time}</td>
                                <td>{game.difficulty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GameHistoryView;