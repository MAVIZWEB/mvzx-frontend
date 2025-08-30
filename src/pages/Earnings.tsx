import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Earning {
  id: number;
  amount: number;
  type: string;
  description: string;
  createdAt: string;
}

interface Withdrawal {
  id: number;
  amount: number;
  method: string;
  destination: string;
  status: string;
  createdAt: string;
}

const Earnings: React.FC = () => {
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [withdrawalData, setWithdrawalData] = useState({
    amount: '',
    method: 'bank',
    destination: ''
  });
  const [loading, setLoading] = useState(true);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchEarningsData();
  }, []);

  const fetchEarningsData = async () => {
    try {
      const [earningsResponse, withdrawalsResponse] = await Promise.all([
        api.get('/earnings'),
        api.get('/withdrawals')
      ]);
      
      setEarnings(earningsResponse.data.earnings);
      setWithdrawals(withdrawalsResponse.data.withdrawals);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to load earnings data');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWithdrawalData({
      ...withdrawalData,
      [name]: value
    });
  };

  const handleWithdrawalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setWithdrawLoading(true);

    try {
      const amount = parseFloat(withdrawalData.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Invalid withdrawal amount');
      }

      await api.post('/earnings/withdraw', withdrawalData);
      setSuccess('Withdrawal request submitted successfully!');
      setWithdrawalData({ amount: '', method: 'bank', destination: '' });
      fetchEarningsData(); // Refresh data
    } catch (error: any) {
      setError(error.response?.data?.error || error.message || 'Withdrawal failed');
    } finally {
      setWithdrawLoading(false);
    }
  };

  if (loading) return <div className="container text-center py-5">Loading...</div>;

  return (
    <div className="container">
      <h1 className="my-4">Earnings & Withdrawals</h1>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Request Withdrawal</h5>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              
              <form onSubmit={handleWithdrawalSubmit}>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount (MVZx)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={withdrawalData.amount}
                    onChange={handleWithdrawalChange}
                    required
                    step="0.01"
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="method" className="form-label">Withdrawal Method</label>
                  <select
                    className="form-select"
                    id="method"
                    name="method"
                    value={withdrawalData.method}
                    onChange={handleWithdrawalChange}
                    required
                  >
                    <option value="bank">Nigerian Bank Account</option>
                    <option value="usdt">USDT Wallet</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="destination" className="form-label">
                    {withdrawalData.method === 'bank' ? 'Bank Account Number' : 'USDT Wallet Address'}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="destination"
                    name="destination"
                    value={withdrawalData.destination}
                    onChange={handleWithdrawalChange}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={withdrawLoading}
                >
                  {withdrawLoading ? 'Processing...' : 'Request Withdrawal'}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Earnings History</h5>
              {earnings.length === 0 ? (
                <p>No earnings history</p>
              ) : (
                <div className="list-group">
                  {earnings.map(earning => (
                    <div key={earning.id} className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{earning.type}</h6>
                        <small>{new Date(earning.createdAt).toLocaleDateString()}</small>
                      </div>
                      <p className="mb-1">{earning.description}</p>
                      <small className="text-success">+{earning.amount.toFixed(2)} MVZx</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Withdrawal History</h5>
              {withdrawals.length === 0 ? (
                <p>No withdrawal history</p>
              ) : (
                <div className="list-group">
                  {withdrawals.map(withdrawal => (
                    <div key={withdrawal.id} className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{withdrawal.method.toUpperCase()}</h6>
                        <span className={`badge ${withdrawal.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                          {withdrawal.status}
                        </span>
                      </div>
                      <p className="mb-1">{withdrawal.destination}</p>
                      <small className="text-danger">-{withdrawal.amount.toFixed(2)} MVZx</small>
                      <br />
                      <small>{new Date(withdrawal.createdAt).toLocaleDateString()}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
