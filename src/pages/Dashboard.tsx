import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface DashboardData {
  totalEarnings: number;
  matrixStage: number;
  referralCount: number;
  recentEarnings: Array<{
    id: number;
    amount: number;
    type: string;
    description: string;
    createdAt: string;
  }>;
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/user/dashboard');
      setDashboardData(response.data);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container text-center py-5">Loading...</div>;
  if (error) return <div className="container alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h1 className="my-4">Dashboard</h1>
      
      {user && (
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Wallet Information</h5>
                <p><strong>Address:</strong> {user.wallet.address}</p>
                <p><strong>Balance:</strong> {user.wallet.balance.toFixed(2)} MVZx</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {dashboardData && (
        <>
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Total Earnings</h5>
                  <h3>{dashboardData.totalEarnings.toFixed(2)} MVZx</h3>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Matrix Stage</h5>
                  <h3>{dashboardData.matrixStage}</h3>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Referrals</h5>
                  <h3>{dashboardData.referralCount}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Quick Actions</h5>
                  <div className="d-grid gap-2">
                    <Link to="/purchase" className="btn btn-primary">
                      Purchase MVZx Tokens
                    </Link>
                    <Link to="/matrix" className="btn btn-outline-primary">
                      View Matrix
                    </Link>
                    <Link to="/staking" className="btn btn-outline-primary">
                      Stake Tokens
                    </Link>
                    <Link to="/earnings" className="btn btn-outline-primary">
                      Withdraw Earnings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Recent Earnings</h5>
                  {dashboardData.recentEarnings.length === 0 ? (
                    <p>No recent earnings</p>
                  ) : (
                    <div className="list-group">
                      {dashboardData.recentEarnings.map(earning => (
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
