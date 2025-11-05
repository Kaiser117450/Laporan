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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DailyRatingTrendChart = ({ data }) => {
  const dailyRatings = data.reduce((acc, curr) => {
    const date = curr['Tanggal Transaksi'].toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { total: 0, count: 0 };
    }
    acc[date].total += curr['Rating untuk Resto'];
    acc[date].count += 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(dailyRatings),
    datasets: [
      {
        label: 'Daily Average Rating',
        data: Object.values(dailyRatings).map((d) => d.total / d.count),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default DailyRatingTrendChart;
