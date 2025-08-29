 import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Purchase from './pages/Purchase';
import Matrix from './pages/Matrix';
import Staking from './pages/Staking';
import Withdraw from './pages/Withdraw';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/matrix" element={<Matrix />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/withdraw" element={<Withdraw />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
