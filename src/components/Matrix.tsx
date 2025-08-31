import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, LinearProgress } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface MatrixStage {
  id: number;
  stage: number;
  position: number;
  earnings: number;
  leftLeg: number | null;
  rightLeg: number | null;
  isCompleted: boolean;
  completedAt: string | null;
}

const Matrix: React.FC = () => {
  const [stages, setStages] = useState<MatrixStage[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchMatrixData();
  }, []);

  const fetchMatrixData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/matrix`);
      setStages(response.data.data.stages);
    } catch (error) {
      console.error('Failed to fetch matrix data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Matrix Overview
      </Typography>

      <Grid container spacing={3}>
        {stages.map((stage) => (
          <Grid item xs={12} sm={6} md={4} key={stage.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Stage {stage.stage}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Position: {stage.position}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Earnings: {stage.earnings} USDT
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {stage.isCompleted ? 'Completed' : 'Active'}
                </Typography>
                {stage.completedAt && (
                  <Typography variant="body2" color="textSecondary">
                    Completed: {new Date(stage.completedAt).toLocaleDateString()}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {stages.length === 0 && (
        <Typography variant="body1" sx={{ mt: 3 }}>
          You don't have any matrix positions yet. Purchase MVZx tokens to get started.
        </Typography>
      )}
    </Box>
  );
};

export default Matrix;
