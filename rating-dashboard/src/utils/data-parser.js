import Papa from 'papaparse';

export const processRatingData = async () => {
  const response = await fetch('/Rating Report - 30-09-2025 to 31-10-2025.csv');
  const csvText = await response.text();

  return new Promise((resolve) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const processedData = results.data.map((row) => ({
          ...row,
          'Rating untuk Resto': parseInt(row['Rating untuk Resto'], 10),
          'Tanggal Transaksi': new Date(row['Tanggal Transaksi']),
        }));
        resolve(processedData);
      },
    });
  });
};
