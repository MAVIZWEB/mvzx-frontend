import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface StakingPlan {
  id: number;
  amount: number;
  duration: number;
  apy: number;
  maturityDate: string;
  status: string;
}

const Staking: React.FC = () => {
  const [stakingData, setStakingData] = useState({
    amount: '',
    duration: 150 // Default 150 days
  });
  const [stakingPlans, setStakingPlans] = useState<StakingPlan[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    fetchStakingPlans();
  }, []);

  const fetchStakingPlans = async () => {
    try {
      // This would be replaced with actual API call to get user's staking plans
      const response = await api.get('/staking/plans');
      setStakingPlans(response.data.plans);
    } catch (error: any) {
      setError('Failed to fetch staking plans');
    } finally {
      setLoadingPlans(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStakingData({
      ...stakingData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const amount = parseFloat(stakingData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Invalid staking amount');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/staking/create', {
        amount,
        duration: stakingData.duration
      });
      setSuccess('Staking plan created successfully!');
      setStakingData({ amount: '', duration: 150 });
      fetchStakingPlans(); // Refresh the list
    } catch (error: any) {
      setError(error.response?.data?.error || 'Staking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Stake MVZx Tokens</h2>
              <p className="text-center">Earn 100% APY in 150 days</p>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount to Stake</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={stakingData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">Duration (Days)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="duration"
                    name="duration"
                    value={stakingData.duration}
                    onChange={handleChange}
                    required
                    disabled
                  />
                  <div className="form-text">Currently only 150 days staking is available</div>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Staking...' : 'Stake Tokens'}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Your Staking Plans</h3>
              {loadingPlans ? (
                <p>Loading...</p>
              ) : stakingPlans.length === 0 ? (
                <p>No active staking plans</p>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Amount</th>
                        <th>Duration</th>
                        <th>APY</th>
                        <th>Maturity Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stakingPlans.map(plan => (
                        <tr key={plan.id}>
                          <td>{plan.amount} MVZx</td>
                          <td>{plan.duration} days</td>
                          <td>{plan.apy}%</td>
                          <td>{new Date(plan.maturityDate).toLocaleDateString()}</td>
                          <td>
                            <span className={`badge ${plan.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                              {plan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
