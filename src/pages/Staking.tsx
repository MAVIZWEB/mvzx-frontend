 import React, { useState, useEffect } from 'react';
import { stakingAPI } from '../services/api';

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
    duration: 150
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
      const response = await stakingAPI.getPlans();
      setStakingPlans(response.data.plans);
    } catch (error: any) {
      setError('Failed to fetch staking plans');
    } finally {
      setLoadingPlans(false);
    }
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
      const response = await stakingAPI.createPlan({
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

  // ... rest of the component remains the same ...
};

export default Staking;
