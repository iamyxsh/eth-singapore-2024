import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Faucet from './pages/Faucet';
import Earn from './pages/Earn';
import Portfolio from './pages/Portfolio';
import Header from './components/custom/Header';

const App = () => {
  return (
    <Router>
      <Header/>

      <Routes>
        <Route path="/faucet" element={<Faucet />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/" element={<Navigate to="/trade" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
