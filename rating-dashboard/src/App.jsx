import { useState, useEffect } from 'react';
import { processRatingData } from './utils/data-parser';
import RatingDistributionChart from './components/RatingDistributionChart';
import DailyRatingTrendChart from './components/DailyRatingTrendChart';
import RestaurantLeaderboard from './components/RestaurantLeaderboard';
import CriticalReviews from './components/CriticalReviews';
import TagAnalysis from './components/TagAnalysis';
import PopularMenu from './components/PopularMenu';

function App() {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'avgRating', direction: 'desc' });

  useEffect(() => {
    processRatingData().then(setData);
  }, []);

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Restaurant Rating Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Rating Distribution</h2>
            <RatingDistributionChart data={data} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Daily Rating Trend</h2>
            <DailyRatingTrendChart data={data} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Tag Analysis</h2>
            <TagAnalysis data={data} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Popular Menu</h2>
            <PopularMenu data={data} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Restaurant Leaderboard</h2>
          <RestaurantLeaderboard data={data} sortConfig={sortConfig} setSortConfig={setSortConfig} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Critical Reviews</h2>
          <CriticalReviews data={data} />
        </div>
      </main>
    </div>
  );
}

export default App;
