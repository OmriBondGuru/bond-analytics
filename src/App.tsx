import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import BondPerformanceChart from './components/BondPerformanceChart';
import BondTable from './components/BondTable';
import { Bond } from './types/Bond';
import { BondDataService } from './services/BondDataService';

const App: React.FC = () => {
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [dataService] = useState(() => new BondDataService());

  useEffect(() => {
    // Connect to real-time data feed
    dataService.connect();

    // Subscribe to updates
    const unsubscribe = dataService.subscribe((newBonds) => {
      setBonds(newBonds);
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
      dataService.disconnect();
    };
  }, [dataService]);

  // Sort bonds by performance
  const bestPerformingBonds = [...bonds]
    .sort((a, b) => a.weeklyYieldChange - b.weeklyYieldChange)
    .slice(0, 5);

  const worstPerformingBonds = [...bonds]
    .sort((a, b) => b.weeklyYieldChange - a.weeklyYieldChange)
    .slice(0, 5);

  const topPerformer = bestPerformingBonds[0];
  const worstPerformer = worstPerformingBonds[0];

  if (!topPerformer || !worstPerformer) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h6" sx={{ mt: 3 }}>
          Loading bond data...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 3 }}>
        Bond Analytics Dashboard
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>Best Performing Bond - 3 Month Yield History</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {topPerformer.name} - {topPerformer.rating} rated
          </Typography>
          <BondPerformanceChart bonds={[topPerformer]} showHistory={true} />
        </Paper>
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>Worst Performing Bond - 3 Month Yield History</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {worstPerformer.name} - {worstPerformer.rating} rated
          </Typography>
          <BondPerformanceChart bonds={[worstPerformer]} showHistory={true} />
        </Paper>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Best Performing Bonds</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Bonds with decreasing yields (improved performance)
        </Typography>
        <BondTable bonds={bestPerformingBonds} />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Worst Performing Bonds</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Bonds with increasing yields (deteriorating performance)
        </Typography>
        <BondTable bonds={worstPerformingBonds} />
      </Paper>
    </Container>
  );
};

export default App; 