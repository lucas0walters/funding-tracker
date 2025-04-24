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

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function FundingBarChart({ data }) {
  // Aggregate funding data by year
  const fundingByYear = data.reduce((acc, item) => {
    acc[item.year] = (acc[item.year] || 0) + item.amount;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(fundingByYear).sort((a, b) => a - b), // X-axis: sorted years
    datasets: [
      {
        label: 'Total Funding',
        data: Object.values(fundingByYear), // Y-axis: total funding amounts
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Light blue bar color
        borderColor: 'rgba(54, 162, 235, 1)', // Darker blue border color
        borderWidth: 1, // Border width
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }, // Legend position
      title: { display: true, text: 'Total Startup Funding by Year' }, // Chart title
    },
  };

  return (
    <div className="chart-container">
      {/* Render the bar chart */}
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default FundingBarChart;