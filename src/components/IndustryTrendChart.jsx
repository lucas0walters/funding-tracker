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
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function IndustryTrendChart({ data }) {
  // Aggregate funding data by industry and year
  const fundingByIndustryAndYear = data.reduce((acc, item) => {
    if (!acc[item.industry]) acc[item.industry] = {}; // Initialize industry if not present
    acc[item.industry][item.year] = (acc[item.industry][item.year] || 0) + item.amount; // Sum funding by year
    return acc;
  }, {});

  // Extract unique years for the X-axis
  const labels = [...new Set(data.map((item) => item.year))].sort();

  // Prepare datasets for each industry
  const datasets = Object.keys(fundingByIndustryAndYear).map((industry) => ({
    label: industry, // Industry name
    data: labels.map((year) => fundingByIndustryAndYear[industry][year] || 0), // Funding amounts by year
    borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random line color
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Transparent background
    fill: false, // No fill under the line
  }));

  // Chart data
  const chartData = {
    labels, // X-axis labels (years)
    datasets, // Data for each industry
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom', // Legend position
        labels: {
          boxWidth: 8, // Legend box size
          font: {
            size: 10, // Font size
            color: '#333333', // Dark text for legend
          },
        },
      },
      title: { display: true, text: 'Funding Trends by Industry' }, // Chart title
    },
  };

  return (
    <div className="chart-container">
      {/* Render the line chart */}
      <Line data={chartData} options={options} />
    </div>
  );
}

export default IndustryTrendChart;