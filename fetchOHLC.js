// fetchData.js
const axios = require('axios');

async function fetchOHLC(symbol = 'BTCUSDT') {
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=5000`;
  const { data } = await axios.get(url);
  return data.map(d => ({
    time: new Date(d[0]),
    open: parseFloat(d[1]),
    high: parseFloat(d[2]),
    low: parseFloat(d[3]),
    close: parseFloat(d[4]),
    volume: parseFloat(d[5])
  }));
}

module.exports = fetchOHLC;
