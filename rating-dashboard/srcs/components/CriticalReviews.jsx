const CriticalReviews = ({ data }) => {
  const criticalReviews = data.filter(
    (row) => row['Rating untuk Resto'] <= 3 && row['Review']
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Restaurant</th>
            <th className="py-2 px-4 border-b">Rating</th>
            <th className="py-2 px-4 border-b">Review</th>
          </tr>
        </thead>
        <tbody>
          {criticalReviews.map((review, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{review['Tanggal Transaksi'].toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{review['Nama Resto']}</td>
              <td className="py-2 px-4 border-b">{review['Rating untuk Resto']}</td>
              <td className="py-2 px-4 border-b">{review['Review']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CriticalReviews;
