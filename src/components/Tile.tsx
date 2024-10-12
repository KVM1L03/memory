import React from 'react';
import '../styles/tile.scss';

interface TileProps {
    image: string;
    value: number;
    matched: boolean;
    revealed: boolean;
    onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ image, value, matched, revealed, onClick }) => {
    return (
        <div
            className={`tile ${revealed ? 'revealed' : ''} ${matched ? 'matched' : ''}`}
            onClick={() => !matched && !revealed && onClick()}
        >
            {revealed || matched ? (
                <img src={image} alt={`Tile ${value}`} />
            ) : (
                '?'
            )}
        </div>
    );
};

export default Tile;