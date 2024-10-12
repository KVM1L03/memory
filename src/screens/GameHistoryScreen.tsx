import React from 'react';
import { useGameStore } from '../store/gameStore';
import '../styles/gameHistoryView.scss';

const GameHistoryView: React.FC = () => {
    const history = useGameStore((state) => state.history);

    const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="game-history">
            <h2>Game History</h2>
            {sortedHistory.length === 0 ? (
                <p>No games played yet.</p>
            ) : (
                <div className="game-history-table-container">
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
                            {sortedHistory.map((game, index) => (
                                <tr key={index}>
                                    <td>{new Date(game.date).toLocaleString()}</td>
                                    <td>{game.attempts}</td>
                                    <td>{game.time}</td>
                                    <td>{game.difficulty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GameHistoryView;