import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  LinearProgress,
  Alert
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Stake {
  id: number;
  amount: number;
  startDate: string;
  endDate: string;
  status: string;
  rewards: number;
}

const Staking: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [stakes, setStakes] = useState<Stake[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { wallet } = useAuth();

  useEffect(() => {
    fetchStakes();
  }, []);

  const fetchStakes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stakes/history`);
      setStakes(response.data.data.stakes);
    } catch (error) {
      console.error('Failed to fetch stakes:', error);
    }
  };

  const handleStake = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (wallet && parseFloat(amount) > wallet.mvzx) {
      setError('Insufficient MVZx balance');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/stakes/stake`, {
        amount: parseFloat(amount)
      });

      setMessage('Tokens staked successfully');
      setAmount('');
      fetchStakes(); // Refresh stakes list
    } catch (err: any) {
      setError(err.response?.data?.message || 'Staking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Staking
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Stake MVZx Tokens
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Stake your MVZx tokens for 150 days and earn 100% APY.
              </Typography>

              {message && <Alert severity="success">{message}</Alert>}
              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                fullWidth
                label="Amount to Stake"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                margin="normal"
                helperText={`Available: ${wallet?.mvzx || 0} MVZx`}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleStake}
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Staking...' : 'Stake Tokens'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Stakes
              </Typography>

              {stakes.length === 0 ? (
                <Typography variant="body2">
                  You don't have any active stakes.
                </Typography>
              ) : (
                stakes.map((stake) => (
                  <Box key={stake.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                    <Typography variant="body2">
                      Amount: {stake.amount} MVZx
                    </Typography>
                    <Typography variant="body2">
                      Start Date: {new Date(stake.startDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      End Date: {new Date(stake.endDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      Status: {stake.status}
                    </Typography>
                    <Typography variant="body2">
                      Rewards: {stake.rewards} MVZx
                    </Typography>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Staking;
