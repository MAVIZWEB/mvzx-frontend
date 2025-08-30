 import React, { useState, useEffect } from 'react';
import { matrixAPI } from '../services/api';

interface MatrixData {
  stage: number;
  position: number;
  earnings: number;
  leftLeg: number;
  rightLeg: number;
  totalLegs: number;
}

const Matrix: React.FC = () => {
  const [matrixData, setMatrixData] = useState<MatrixData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMatrixData();
  }, []);

  const fetchMatrixData = async () => {
    try {
      const response = await matrixAPI.getMatrix();
      setMatrixData(response.data.matrix);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to load matrix data');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of the component remains the same ...
};

export default Matrix;
