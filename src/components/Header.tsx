import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.scss';

interface NavLink {
    path: string;
    label: string;
}

interface HeaderProps {
    links: NavLink[];
}

const Header: React.FC<HeaderProps> = ({ links }) => {
    return (
        <header>
            <nav>
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link to={link.path}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;