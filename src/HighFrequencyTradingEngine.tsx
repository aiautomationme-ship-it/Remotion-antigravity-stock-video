import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

interface OrderBookRow {
  bidPrice: string;
  bidSize: string;
  askPrice: string;
  askSize: string;
  flashState: 'green' | 'red' | 'neutral';
}

/**
 * HIGH-FREQUENCY MARKET TRADING TERMINAL ENGINE
 * Renders fast-moving market candlestick streams, live scrolling ticker boards,
 * and rapid green/red flashing order-book data points.
 */
export const HighFrequencyTradingEngine: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // 1. Ticker Board Data Stream
  const tickers: TickerItem[] = useMemo(() => [
    { symbol: 'NVDA', price: '138.25', change: '+4.85%', isPositive: true },
    { symbol: 'AAPL', price: '224.50', change: '+1.20%', isPositive: true },
    { symbol: 'TSLA', price: '210.15', change: '-2.45%', isPositive: false },
    { symbol: 'MSFT', price: '448.90', change: '+2.15%', isPositive: true },
    { symbol: 'AMZN', price: '186.40', change: '+3.05%', isPositive: true },
    { symbol: 'GOOGL', price: '175.80', change: '-0.85%', isPositive: false },
    { symbol: 'BTC/USD', price: '94,850', change: '+6.12%', isPositive: true },
    { symbol: 'ETH/USD', price: '3,450', change: '+5.40%', isPositive: true },
    { symbol: 'EUR/USD', price: '1.0845', change: '-0.15%', isPositive: false },
    { symbol: 'SPX', price: '5,580.20', change: '+1.45%', isPositive: true },
  ], []);

  // 2. Dynamic Rapid Candlestick Data (Fast Moving)
  const candleCount = 42;
  const candles = useMemo(() => {
    const data = [];
    let price = 450;
    for (let i = 0; i < candleCount; i++) {
      const noise = Math.sin(i * 0.8) * 30 + Math.cos(i * 1.4) * 20;
      const open = price + noise;
      const close = open + (Math.sin(i * 2.1) > 0 ? 35 : -28);
      const high = Math.max(open, close) + 18;
      const low = Math.min(open, close) - 18;
      const isBull = close >= open;

      data.push({ x: 120 + i * ((width - 650) / candleCount), open, close, high, low, isBull });
      price += 6;
    }
    return data;
  }, [width]);

  // 3. Fast Flashing Order Book Matrix Data
  const orderBookRows: OrderBookRow[] = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const isBull = (i * 7 + 3) % 2 === 0;
      return {
        bidPrice: (450.20 - i * 0.55).toFixed(2),
        bidSize: (120 + (i * 87) % 400).toString(),
        askPrice: (450.25 + i * 0.55).toFixed(2),
        askSize: (95 + (i * 63) % 350).toString(),
        flashState: isBull ? 'green' : 'red',
      };
    });
  }, []);

  // Fast continuous horizontal scrolling ticker tape offset
  const tickerX = (frame * 6) % (tickers.length * 280);

  return (
    <AbsoluteFill style={{ backgroundColor: '#030712', overflow: 'hidden' }}>
      
      {/* GLOW & BLOOM SHADERS */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="hft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="22" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* BACKGROUND FINANCIAL MATRIX GRID */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.12, pointerEvents: 'none' }}>
        <pattern id="hftGrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00E5FF" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#hftGrid)" />
      </svg>

      {/* ----------------===================================================---------------- */}
      {/* TOP SCROLLING TICKER BOARD TAPE                                                     */}
      {/* ----------------===================================================---------------- */}
      <div style={{
        position: 'absolute',
        top: 40,
        left: 0,
        width: '120%',
        height: 70,
        backgroundColor: '#071124',
        borderTop: '2px solid #00E5FF44',
        borderBottom: '2px solid #00E5FF44',
        display: 'flex',
        alignItems: 'center',
        transform: `translateX(-${tickerX}px)`,
        whiteSpace: 'nowrap',
        zIndex: 10,
      }}>
        {[...tickers, ...tickers, ...tickers].map((t, idx) => (
          <div key={`ticker-${idx}`} style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginRight: 60,
            fontFamily: "'Roboto Mono', monospace",
            fontSize: 24,
            fontWeight: 700,
          }}>
            <span style={{ color: '#94A3B8', marginRight: 12 }}>{t.symbol}</span>
            <span style={{ color: '#FFFFFF', marginRight: 12 }}>${t.price}</span>
            <span style={{
              color: t.isPositive ? '#00FF66' : '#FF2E55',
              backgroundColor: t.isPositive ? '#00FF661A' : '#FF2E551A',
              padding: '4px 10px',
              borderRadius: 4,
              border: `1px solid ${t.isPositive ? '#00FF66' : '#FF2E55'}`,
            }}>
              {t.change}
            </span>
          </div>
        ))}
      </div>

      {/* 3D TILT TERMINAL CANVAS */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: 'rotateX(8deg) rotateY(-4deg) scale(1.04)',
          transformOrigin: 'center center',
        }}>

          {/* ----------------===================================================---------------- */}
          {/* FAST MOVING CANDLESTICK CHART ENGINE                                                */}
          {/* ----------------===================================================---------------- */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 60 }}>
            {/* Horizontal Reference Lines */}
            {[250, 450, 650, 850, 1050, 1250, 1450].map((y, idx) => (
              <line key={`ref-${idx}`} x1="80" y1={y} x2={width - 550} y2={y} stroke="#1E293B" strokeWidth="1.5" strokeDasharray="6,6" />
            ))}

            {/* Fast Animating Candlesticks */}
            {candles.map((c, i) => {
              // Rapid pulse animation shift per frame
              const pulse = Math.sin(frame * 0.2 + i) * 6;
              const openY = c.open + pulse;
              const closeY = c.close - pulse;
              const candleY = Math.min(openY, closeY);
              const candleH = Math.max(12, Math.abs(closeY - openY));

              return (
                <g key={`candle-${i}`}>
                  {/* Wick */}
                  <line x1={c.x} y1={c.high} x2={c.x} y2={c.low} stroke={c.isBull ? '#00FF66' : '#FF2E55'} strokeWidth="3" />
                  {/* Body */}
                  <rect
                    x={c.x - 12}
                    y={candleY}
                    width={24}
                    height={candleH}
                    fill={c.isBull ? '#00FF66' : '#FF2E55'}
                    fillOpacity="0.85"
                    stroke={c.isBull ? '#00FF66' : '#FF2E55'}
                    strokeWidth="2"
                    rx={2}
                    filter="url(#hft-glow)"
                  />
                </g>
              );
            })}
          </svg>

          {/* ----------------===================================================---------------- */}
          {/* RIGHT SIDE: FLASHING ORDER BOOK BID/ASK DEPTH MATRIX                                */}
          {/* ----------------===================================================---------------- */}
          <div style={{
            position: 'absolute',
            right: 80,
            top: 180,
            width: 420,
            backgroundColor: '#07101E',
            border: '2px solid #00E5FF44',
            borderRadius: 12,
            padding: 24,
            fontFamily: "'Roboto Mono', monospace",
            boxShadow: '0 0 40px rgba(0,229,255,0.15)',
          }}>
            <div style={{ color: '#00E5FF', fontSize: 18, fontWeight: 700, marginBottom: 16, borderBottom: '1px solid #1E293B', pb: 8 }}>
              LIVE ORDER BOOK // HFT_FEED
            </div>

            {orderBookRows.map((row, idx) => {
              // Rapid green/red flash state triggered by frame timing
              const flashActive = (frame + idx * 3) % 12 < 4;
              const flashColor = row.flashState === 'green' ? '#00FF66' : '#FF2E55';

              return (
                <div key={`ob-row-${idx}`} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  fontSize: 16,
                  backgroundColor: flashActive ? `${flashColor}22` : 'transparent',
                  padding: '4px 8px',
                  borderRadius: 4,
                  transition: 'background-color 0.1s ease',
                }}>
                  <span style={{ color: '#00FF66', fontWeight: 700 }}>{row.bidPrice}</span>
                  <span style={{ color: '#64748B' }}>{row.bidSize}</span>
                  <span style={{ color: '#FF2E55', fontWeight: 700 }}>{row.askPrice}</span>
                  <span style={{ color: '#64748B' }}>{row.askSize}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* CRT SCANLINE & FILM GRAIN */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
        backgroundSize: '100% 4px',
        pointerEvents: 'none',
        opacity: 0.4,
      }} />

      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="hft-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hft-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
