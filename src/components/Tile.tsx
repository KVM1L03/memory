import React from 'react';
import { motion } from 'framer-motion';
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
        <motion.div
            className={`tile ${revealed ? 'revealed' : ''} ${matched ? 'matched' : ''}`}
            onClick={() => !matched && !revealed && onClick()}
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            whileTap={{ scale: 1.2 }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
            }}
        >
            {revealed || matched ? (
                <img src={image} alt={`Tile ${value}`} />
            ) : (
                '?'
            )}
        </motion.div>
    );
};

export default Tile;