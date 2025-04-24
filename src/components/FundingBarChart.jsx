import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function FundingBarChart({ data }) {
  const fundingByYear = data.reduce((acc, item) => {
    acc[item.year] = (acc[item.year] || 0) + item.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(fundingByYear).sort((a, b) => a - b),
    datasets: [
      {
        label: 'Total Funding',
        data: Object.values(fundingByYear),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Total Startup Funding by Year' },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default FundingBarChart;