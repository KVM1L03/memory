import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameView from './screens/GameScreen';
import GameHistoryView from './screens/GameHistoryScreen';
import Header from './components/Header';

const App: React.FC = () => {
    const navLinks = [
        { path: '/', label: 'Game' },
        { path: '/history', label: 'History' }
    ];

    return (
        <BrowserRouter>
            <Header links={navLinks} />
            <Routes>
                <Route path="/" element={<GameView />} />
                <Route path="/history" element={<GameHistoryView />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;