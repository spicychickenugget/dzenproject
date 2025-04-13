import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const TokenomicsChart = ({ tokenData }) => {
  const data = {
    labels: ['Total Supply', 'Circulating Supply'],
    datasets: [
      {
        data: [parseFloat(tokenData.supply), 5000000000], // Replace with actual data
        backgroundColor: ['#FF5733', '#C70039'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height
    plugins: {
      legend: {
        position: 'bottom', // Better for mobile
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '400px',
        height: '300px',
        margin: '0 auto',
      }}
    >
      <Pie data={data} options={options} />
    </div>
  );
};

export default TokenomicsChart;
