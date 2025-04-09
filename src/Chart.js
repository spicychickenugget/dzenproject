import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

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
