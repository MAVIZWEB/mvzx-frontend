import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Purchase from './pages/Purchase';
import Matrix from './pages/Matrix';
import Earnings from './pages/Earnings';
import Staking from './pages/Staking';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/matrix" element={<Matrix />} />
            <Route path="/earnings" element={<Earnings />} />
            <Route path="/staking" element={<Staking />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
