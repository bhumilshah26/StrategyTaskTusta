// indicators.js
const { EMA, MACD, RSI } = require('technicalindicators');
// ema = exponential moving average =>  Smooths out price data to show the current trend clearly by giving more weight to recent price
// macd = moving average convergence and divergence => if the price momentum is speeding up or slowing down, helping spot trend changes early
// rsi relative strength index => if something is overbought or oversold 

const calculateIndicators = (closes) => {
  // using inbuilt indicators for better values
  // MACD = short term(EMA12) - long term(EMA26)
  // EMA  = EMA(today) = (Price(today) * K) + (EMA(yesterday) * (1 − K)) , k = 2 / n + 1, n => period (12, 26, 9, etc.)
  // Signal = EMA9(MACD)
  // histogram = MACD - Signal
  // RSI default: 14 days

  const macd = MACD.calculate({ values: closes, fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, SimpleMAOscillator: false, SimpleMASignal: false });
  const rsi = RSI.calculate({ values: closes, period: 14 });
  const ema21 = EMA.calculate({ values: closes, period: 21 });

  return { macd, rsi, ema21 };
}

module.exports = calculateIndicators;
