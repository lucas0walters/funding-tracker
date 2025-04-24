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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function IndustryTrendChart({ data }) {
  const fundingByIndustryAndYear = data.reduce((acc, item) => {
    if (!acc[item.industry]) acc[item.industry] = {};
    acc[item.industry][item.year] = (acc[item.industry][item.year] || 0) + item.amount;
    return acc;
  }, {});

  const labels = [...new Set(data.map((item) => item.year))].sort();
  const datasets = Object.keys(fundingByIndustryAndYear).map((industry) => ({
    label: industry,
    data: labels.map((year) => fundingByIndustryAndYear[industry][year] || 0),
    borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    fill: false,
  }));

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          font: {
            size: 10,
          },
        },
      },
      title: { display: true, text: 'Funding Trends by Industry' },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default IndustryTrendChart;