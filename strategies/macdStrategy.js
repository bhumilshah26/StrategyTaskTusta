function macdCrossoverStrategy(data, indicators) {
  let trades = [];
  let inTrade = false, entry = {};

  for (let i = 1; i < indicators.macd.length; i++) {
    const prev = indicators.macd[i - 1], curr = indicators.macd[i];

    if (!inTrade && prev.MACD < prev.signal && curr.MACD > curr.signal) {
      inTrade = true;
      entry = { Entry_Time: data[i + 26].time, Entry_Price: data[i + 26].close }; // MACD starts after 26 periods
    }

    if (inTrade && prev.MACD > prev.signal && curr.MACD < curr.signal) {
      inTrade = false;
      const exit = { Exit_Time: data[i + 26].time, Exit_Price: data[i + 26].close };
      const PnL = Math.round(exit.Exit_Price - entry.Entry_Price, 2);
      trades.push({ ...entry, ...exit, Strategy: 'MACD Crossover', PnL, Status: PnL >= 0 ? 'Win' : 'Loss' });
    }
  }

  return trades;
}

module.exports = macdCrossoverStrategy;