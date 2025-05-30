// index.js
const fetchOHLC = require('./fetchOHLC');
const calculateIndicators = require('./indicator');
const macdCrossoverStrategy  = require('./strategies/macdStrategy');
const rsiStrategy = require('./strategies/rsiStrategy');
const saveToCSV = require('./saveResults');

(async () => {
  const data = await fetchOHLC();
  // const data 2 = await fetchOHLC('ETHUSDT')
  const closes = data.map(d => d.close);
  const indicators = calculateIndicators(closes);

  const macdTrades = macdCrossoverStrategy(data, indicators);
  const rsiTrades = rsiStrategy(data, indicators);
  const sortedTrades = [...macdTrades, ...rsiTrades].sort((a, b) => new Date(a.Entry_Time) - new Date(b.Entry_Time));
  saveToCSV(sortedTrades);
})();
