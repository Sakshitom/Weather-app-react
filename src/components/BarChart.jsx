import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ forecastDays }) => {
  const labels = forecastDays.map(day => day.date);
  const data = {
    labels,
    datasets: [
      {
        label: 'Avg Temp (°C)',
        data: forecastDays.map(day => day.day.avgtemp_c),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Temperature for the Past Week',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
