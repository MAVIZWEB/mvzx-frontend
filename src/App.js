import React, { useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Deposit from './pages/Deposit';
import Admin from './pages/Admin';

export default function App() {
  const [page, setPage] = useState('login');
  const token = localStorage.getItem('mvzx_token');

  if (!token && page !== 'login' && page !== 'register') setPage('login');

  return (
    <div className="app">
      <nav>
        <button onClick={() => setPage('register')}>Register</button>
        <button onClick={() => setPage('login')}>Login</button>
        <button onClick={() => setPage('wallet')}>Wallet</button>
        <button onClick={() => setPage('deposit')}>Deposit</button>
        <button onClick={() => setPage('admin')}>Admin</button>
      </nav>
      <main>
        {page === 'register' && <Register onDone={() => setPage('login')} />}
        {page === 'login' && <Login onDone={() => setPage('wallet')} />}
        {page === 'wallet' && <Wallet />}
        {page === 'deposit' && <Deposit />}
        {page === 'admin' && <Admin />}
      </main>
    </div>
  );
}
