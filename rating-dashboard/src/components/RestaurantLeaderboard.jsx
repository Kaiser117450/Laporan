import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RestaurantLeaderboard = ({ data, sortConfig, setSortConfig }) => {
  const restaurantPerformance = data.reduce((acc, curr) => {
    const restaurantName = curr['Nama Resto'];
    if (!acc[restaurantName]) {
      acc[restaurantName] = { totalRating: 0, reviewCount: 0 };
    }
    acc[restaurantName].totalRating += curr['Rating untuk Resto'];
    acc[restaurantName].reviewCount += 1;
    return acc;
  }, {});

  const sortedRestaurants = Object.entries(restaurantPerformance).sort((a, b) => {
    const valA = sortConfig.key === 'avgRating' ? a[1].totalRating / a[1].reviewCount : a[1].reviewCount;
    const valB = sortConfig.key === 'avgRating' ? b[1].totalRating / b[1].reviewCount : b[1].reviewCount;

    if (sortConfig.direction === 'asc') {
      return valA - valB;
    }
    return valB - valA;
  });

  const chartData = {
    labels: sortedRestaurants.map((r) => r[0]),
    datasets: [
      {
        label: sortConfig.key === 'avgRating' ? 'Average Rating' : 'Review Count',
        data: sortedRestaurants.map((r) => sortConfig.key === 'avgRating' ? r[1].totalRating / r[1].reviewCount : r[1].reviewCount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => setSortConfig({ key: 'avgRating', direction: 'desc' })} className="mr-2 p-2 bg-gray-200 rounded">Sort by Rating</button>
        <button onClick={() => setSortConfig({ key: 'reviewCount', direction: 'desc' })} className="p-2 bg-gray-200 rounded">Sort by Reviews</button>
      </div>
      <Bar data={chartData} />
    </div>
  );
};

export default RestaurantLeaderboard;
