import React from 'react';
import {
  Chart,
  ChartCanvas,
  CandlestickSeries,
  XAxis,
  YAxis,
  OHLCTooltip,
  CrossHairCursor,
  LineSeries,
} from 'react-financial-charts';
import { scaleTime, scaleLinear } from 'd3-scale';

const CandlestickChart = ({ data, width, height, indicators }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const xAccessor = (d) => d.date || new Date();
  const xExtents = data.length > 0 ? [xAccessor(data[0]), xAccessor(data[data.length - 1])] : [new Date(), new Date()];

  return (
    <ChartCanvas
      height={height}
      width={width}
      ratio={1}
      margin={{ left: 50, right: 50, top: 20, bottom: 30 }}
      data={data}
      seriesName="Candlestick"
      xAccessor={xAccessor}
      xScale={scaleTime()}
      yScale={scaleLinear()}
      xExtents={xExtents}
    >
      <Chart id={1} yExtents={(d) => [d.high, d.low]}>
        <XAxis />
        <YAxis />
        <CandlestickSeries />

        {/* Render SMA only if it is greater than 0 */}
        {Array.isArray(indicators) && indicators.includes('SMA') && (
          <LineSeries
            yAccessor={(d) => (d.SMA > 0 ? d.SMA : null)} // Only render if SMA is greater than 0
            strokeStyle="blue"
          />
        )}

        {/* Render EMA normally */}
        {Array.isArray(indicators) && indicators.includes('EMA') && (
          <LineSeries
            yAccessor={(d) => d.EMA}
            strokeStyle="orange"
          />
        )}

        {/* Render Bollinger Bands */}
        {Array.isArray(indicators) && indicators.includes('BOLL') && (
          <>
            <LineSeries
              yAccessor={(d) => (d['Upper Band'] > 0 ? d['Upper Band'] : null)} // Render Upper Band only if greater than 0
              strokeStyle="green"
            />
            <LineSeries
              yAccessor={(d) => (d['Lower Band'] > 0 ? d['Lower Band'] : null)} // Render Lower Band only if greater than 0
              strokeStyle="red"
            />
            <LineSeries
              yAccessor={(d) => (d['Middle Band'] > 0 ? d['Middle Band'] : null)} // Render Middle Band only if greater than 0
              strokeStyle="purple" // You can choose any color for the Middle Band
            />
          </>
        )}

        <OHLCTooltip
          origin={[-40, 0]}
          tooltipContent={(tooltip) => {
            const { active, payload } = tooltip;
            if (active && payload && payload.length) {
              const { date, open, high, low, close, SMA, EMA } = payload[0].payload;

              const timestamp = new Date(date).toLocaleString();

              const changeValue = (close - open).toFixed(2);
              const changePercent = ((close - open) / open * 100).toFixed(2);

              return (
                <div>
                  <p>{`Date: ${timestamp}`}</p>
                  <p>{`O: ${open.toFixed(2)} H: ${high.toFixed(2)} L: ${low.toFixed(2)} C: ${close.toFixed(2)} ${changeValue} (${changePercent}%)`}</p>
                  {SMA !== null && SMA > 0 && <p>{`SMA: ${SMA.toFixed(2)}`}</p>}
                  {EMA !== null && <p>{`EMA: ${EMA.toFixed(2)}`}</p>}
                </div>
              );
            }
            return null;
          }}
        />
        <CrossHairCursor />
      </Chart>
    </ChartCanvas>
  );
};

export default CandlestickChart;