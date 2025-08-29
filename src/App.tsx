import { Outlet, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App(){
  return (
    <div>
      <Header />
      <nav style={{display:'flex', gap:12, padding:12}}>
        <Link to='/'>Home</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/purchase'>Purchase</Link>
        <Link to='/stake'>Stake</Link>
        <Link to='/withdraw'>Withdraw</Link>
        <Link to='/referral'>Referral</Link>
      </nav>
      <div style={{padding:16}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
