import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bond } from '../types/Bond';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  bonds: Bond[];
  showHistory?: boolean;
}

const BondPerformanceChart: React.FC<Props> = ({ bonds, showHistory = false }) => {
  const data = {
    labels: showHistory && bonds[0].historicalYields 
      ? bonds[0].historicalYields.map(h => h.date)
      : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: bonds.map((bond) => {
      if (showHistory && bond.historicalYields) {
        // Use historical data
        return {
          label: bond.name,
          data: bond.historicalYields.map(h => h.yield),
          borderColor: `hsl(${bond.yield * 30}, 70%, 50%)`,
          backgroundColor: `hsl(${bond.yield * 30}, 70%, 50%, 0.1)`,
          tension: 0.3,
          fill: true,
        };
      } else {
        // Use weekly trend data
        const dailyChange = bond.weeklyYieldChange / 4;
        const startYield = bond.yield - bond.weeklyYieldChange;
        return {
          label: bond.name,
          data: [0, 1, 2, 3, 4].map(index => startYield + (dailyChange * index)),
          borderColor: `hsl(${bond.yield * 30}, 70%, 50%)`,
          backgroundColor: `hsl(${bond.yield * 30}, 70%, 50%, 0.1)`,
          tension: 0.3,
          fill: true,
        };
      }
    }),
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (typeof context.parsed.y === 'number') {
              return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
            }
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: showHistory ? 'Date' : 'Day',
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Yield (%)',
        },
        ticks: {
          callback: function(value) {
            if (typeof value === 'number') {
              return `${value.toFixed(2)}%`;
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default BondPerformanceChart; 