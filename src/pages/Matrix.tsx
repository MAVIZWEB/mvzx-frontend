import React, { useState, useEffect } from 'react';
import api from '../services/api';

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
      const response = await api.get('/matrix');
      setMatrixData(response.data.matrix);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to load matrix data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container text-center py-5">Loading...</div>;
  if (error) return <div className="container alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h1 className="my-4">Matrix Overview</h1>
      
      <div className="row">
        {matrixData.map(matrix => (
          <div key={matrix.stage} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Stage {matrix.stage}</h5>
                <div className="row">
                  <div className="col-6">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <h6>Left Leg</h6>
                        <h4>{matrix.leftLeg}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <h6>Right Leg</h6>
                        <h4>{matrix.rightLeg}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="progress mb-2">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${(matrix.totalLegs / 4) * 100}%` }}
                    >
                      {matrix.totalLegs}/4 Legs Filled
                    </div>
                  </div>
                  <p><strong>Position:</strong> {matrix.position}</p>
                  <p><strong>Earnings:</strong> {matrix.earnings.toFixed(2)} MVZx</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {matrixData.length === 0 && (
        <div className="alert alert-info">
          You are not yet positioned in any matrix. Purchase at least N2000 worth of MVZx tokens to get started.
        </div>
      )}
    </div>
  );
};

export default Matrix;
