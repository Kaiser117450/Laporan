import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopularMenu = ({ data }) => {
  const menuCounts = data.reduce((acc, curr) => {
    if (curr['Nama Menu']) {
      const menus = curr['Nama Menu'].split(', ');
      menus.forEach(menu => {
        acc[menu] = (acc[menu] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const sortedMenus = Object.entries(menuCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const chartData = {
    labels: sortedMenus.map(menu => menu[0]),
    datasets: [
      {
        label: 'Top 10 Popular Menus',
        data: sortedMenus.map(menu => menu[1]),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default PopularMenu;
