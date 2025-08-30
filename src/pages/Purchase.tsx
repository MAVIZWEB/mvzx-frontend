import React, { useState } from 'react';
import api from '../services/api';

const Purchase: React.FC = () => {
  const [purchaseData, setPurchaseData] = useState({
    amount: '',
    currency: 'NGN',
    paymentMethod: 'flutterwave',
    paymentDetails: {}
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPurchaseData({
      ...purchaseData,
      [name]: value
    });
  };

  const handlePaymentDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPurchaseData({
      ...purchaseData,
      paymentDetails: {
        ...purchaseData.paymentDetails,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate amount
    const amount = parseFloat(purchaseData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Invalid amount');
      return;
    }

    if (purchaseData.currency === 'NGN' && amount < 200) {
      setError('Minimum purchase amount is N200');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/purchase/mvzx', purchaseData);
      setSuccess('Purchase completed successfully!');
      
      if (response.data.qualifiesForMatrix) {
        setSuccess(prev => prev + ' You have been placed in the matrix.');
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'Purchase failed');
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentDetails = () => {
    switch (purchaseData.paymentMethod) {
      case 'usdt':
        return (
          <div className="mb-3">
            <label htmlFor="txHash" className="form-label">Transaction Hash</label>
            <input
              type="text"
              className="form-control"
              id="txHash"
              name="txHash"
              onChange={handlePaymentDetailsChange}
              required
            />
          </div>
        );
      case 'flutterwave':
        return (
          <div className="mb-3">
            <label htmlFor="flwRef" className="form-label">Flutterwave Reference</label>
            <input
              type="text"
              className="form-control"
              id="flwRef"
              name="flwRef"
              onChange={handlePaymentDetailsChange}
              required
            />
          </div>
        );
      case 'bank_transfer':
        return (
          <>
            <div className="mb-3">
              <label htmlFor="bankName" className="form-label">Bank Name</label>
              <input
                type="text"
                className="form-control"
                id="bankName"
                name="bankName"
                onChange={handlePaymentDetailsChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="accountName" className="form-label">Account Name</label>
              <input
                type="text"
                className="form-control"
                id="accountName"
                name="accountName"
                onChange={handlePaymentDetailsChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="accountNumber" className="form-label">Account Number</label>
              <input
                type="text"
                className="form-control"
                id="accountNumber"
                name="accountNumber"
                onChange={handlePaymentDetailsChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="proofImage" className="form-label">Proof of Payment Image URL</label>
              <input
                type="text"
                className="form-control"
                id="proofImage"
                name="proofImage"
                onChange={handlePaymentDetailsChange}
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Purchase MVZx Tokens</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={purchaseData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="currency" className="form-label">Currency</label>
                  <select
                    className="form-select"
                    id="currency"
                    name="currency"
                    value={purchaseData.currency}
                    onChange={handleChange}
                  >
                    <option value="NGN">NGN</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    id="paymentMethod"
                    name="paymentMethod"
                    value={purchaseData.paymentMethod}
                    onChange={handleChange}
                  >
                    <option value="flutterwave">Flutterwave (NGN)</option>
                    <option value="usdt">USDT (BEP-20)</option>
                    <option value="bank_transfer">Bank Transfer (NGN)</option>
                  </select>
                </div>
                {renderPaymentDetails()}
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Processing...' : 'Purchase Tokens'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
