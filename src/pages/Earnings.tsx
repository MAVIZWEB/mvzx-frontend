 import React, { useState, useEffect } from 'react';
import { earningsAPI, withdrawalsAPI } from '../services/api';

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
        earningsAPI.getEarnings(),
        withdrawalsAPI.getWithdrawals()
      ]);
      
      setEarnings(earningsResponse.data.earnings);
      setWithdrawals(withdrawalsResponse.data.withdrawals);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to load earnings data');
    } finally {
      setLoading(false);
    }
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

      await earningsAPI.withdraw(withdrawalData);
      setSuccess('Withdrawal request submitted successfully!');
      setWithdrawalData({ amount: '', method: 'bank', destination: '' });
      fetchEarningsData(); // Refresh data
    } catch (error: any) {
      setError(error.response?.data?.error || error.message || 'Withdrawal failed');
    } finally {
      setWithdrawLoading(false);
    }
  };

  // ... rest of the component remains the same ...
};

export default Earnings;
