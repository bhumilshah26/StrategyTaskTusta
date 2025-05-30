// strategies/rsiEmaStrategy.js
function rsiEmaStrategy(data, {rsi, ema21}) {
  let trades = [];
  let inTrade = false;
  let entry = {};

  const offset = data.length - rsi.length;

  for (let i = 1; i < rsi.length; i++) {
    const idx = i + offset; // align with full OHLC data
    const candle = data[idx];

    const curr_rsi = rsi[i];
    const curr_ema21 = ema21[i];

    const prevRsi = rsi[i - 1];

    if (!inTrade && curr_rsi >= 30 && candle.close > curr_ema21) {
      inTrade = true;
      entry = { Entry_Time: candle.time, Entry_Price: candle.close }}

    if (inTrade && (prevRsi > 70 && curr_rsi <= 70 || candle.close < curr_ema21)) {
      inTrade = false;
      const exit = { Exit_Time: candle.time, Exit_Price: candle.close };
      const PnL = Math.round(exit.Exit_Price - entry.Entry_Price, 2);
      trades.push({ ...entry, ...exit, Strategy: 'RSI-EMA', PnL, Status: PnL >= 0 ? "Win" : "Loss" });
    }
  }

  return trades;
}

module.exports = rsiEmaStrategy;
