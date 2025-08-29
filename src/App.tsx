 import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Purchase from './pages/Purchase';
import MatrixView from './pages/MatrixView';
import Staking from './pages/Staking';
import Withdraw from './pages/Withdraw';

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/purchase" element={<Purchase/>} />
        <Route path="/matrix" element={<MatrixView/>} />
        <Route path="/staking" element={<Staking/>} />
        <Route path="/withdraw" element={<Withdraw/>} />
      </Routes>
    </div>
  )
}
