import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TagAnalysis = ({ data }) => {
  const tagCounts = data.reduce((acc, curr) => {
    if (curr['Tag yang Dipilih']) {
      const tags = curr['Tag yang Dipilih'].split(', ');
      tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const chartData = {
    labels: sortedTags.map(tag => tag[0]),
    datasets: [
      {
        label: 'Top 10 Review Tags',
        data: sortedTags.map(tag => tag[1]),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default TagAnalysis;
