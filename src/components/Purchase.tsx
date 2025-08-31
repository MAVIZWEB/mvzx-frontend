import React, { useState } from 'react';
import { Tab, Tabs, Box, Card, CardContent, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Purchase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [bankRef, setBankRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setMessage('');
    setError('');
  };

  const handleUSDTOurchase = async () => {
    if (!amount || !txHash) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/purchase/usdt`, {
        amount: parseFloat(amount),
        txHash
      });

      setMessage(response.data.message);
      setAmount('');
      setTxHash('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Purchase failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFlutterwavePurchase = async () => {
    if (!amount) {
      setError('Please enter amount');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/purchase/flutterwave`, {
        amount: parseFloat(amount)
      });

      // Redirect to Flutterwave payment page
      window.location.href = response.data.data.paymentLink;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Payment initialization failed');
      setLoading(false);
    }
  };

  const handleBankPurchase = async () => {
    if (!amount || !bankRef) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/purchase/bank`, {
        amount: parseFloat(amount),
        bankRef
      });

      setMessage(response.data.message);
      setAmount('');
      setBankRef('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Purchase request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Purchase MVZx Tokens
      </Typography>

      <Card>
        <CardContent>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="USDT (BEP-20)" />
            <Tab label="Flutterwave (NGN)" />
            <Tab label="Bank Transfer" />
          </Tabs>

          <Box sx={{ mt: 3 }}>
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            {activeTab === 0 && (
              <Box>
                <Typography variant="body1" gutterBottom>
                  Send USDT (BEP-20) to our company wallet and provide the transaction hash.
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Company Wallet: {process.env.REACT_APP_COMPANY_WALLET}
                </Typography>
                <TextField
                  fullWidth
                  label="Amount (USDT)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Transaction Hash"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUSDTOurchase}
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Processing...' : 'Confirm Purchase'}
                </Button>
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Typography variant="body1" gutterBottom>
                  Purchase MVZx tokens using Naira via Flutterwave.
                </Typography>
                <TextField
                  fullWidth
                  label="Amount (NGN)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  margin="normal"
                  helperText="Minimum: ₦200"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFlutterwavePurchase}
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Redirecting...' : 'Proceed to Payment'}
                </Button>
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography variant="body1" gutterBottom>
                  Make a bank transfer and provide the transaction reference.
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Bank: {process.env.REACT_APP_COMPANY_BANK_NAME}<br />
                  Account Number: {process.env.REACT_APP_COMPANY_BANK_ACCOUNT_NUMBER}<br />
                  Account Name: {process.env.REACT_APP_COMPANY_BANK_ACCOUNT_NAME}
                </Typography>
                <TextField
                  fullWidth
                  label="Amount (NGN)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  margin="normal"
                  helperText="Minimum: ₦200"
                />
                <TextField
                  fullWidth
                  label="Bank Reference"
                  value={bankRef}
                  onChange={(e) => setBankRef(e.target.value)}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBankPurchase}
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Processing...' : 'Submit Request'}
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Purchase;
