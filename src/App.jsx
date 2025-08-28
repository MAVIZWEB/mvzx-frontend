import React, { useState } from 'react';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Buy from './pages/Buy';
import Matrix from './pages/Matrix';
import Withdraw from './pages/Withdraw';

export default function App(){
  const [page, setPage] = useState(localStorage.getItem('page') || 'signup');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const onLogin = (t) => { setToken(t); localStorage.setItem('token', t); setPage('matrix'); };
  const onLogout = () => { setToken(''); localStorage.removeItem('token'); setPage('login'); };

  return (
    <div style={{ maxWidth:980, margin:'0 auto', padding:20 }}>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h2>MVZX Platform</h2>
        <div>
          <button onClick={()=>setPage('signup')}>Signup</button>
          <button onClick={()=>setPage('login')}>Login</button>
          <button onClick={()=>setPage('buy')}>Buy</button>
          <button onClick={()=>setPage('matrix')}>Matrix</button>
          <button onClick={()=>setPage('withdraw')}>Withdraw</button>
          {token ? <button onClick={onLogout}>Logout</button> : null}
        </div>
      </header>
      <main style={{ marginTop:16 }}>
        {page==='signup' && <Signup onSignedIn={onLogin}/>}
        {page==='login' && <Login onLogin={onLogin}/>}
        {page==='buy' && <Buy token={token}/>}
        {page==='matrix' && <Matrix token={token}/>}
        {page==='withdraw' && <Withdraw token={token}/>}
      </main>
    </div>
  );
}
