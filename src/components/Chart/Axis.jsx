import React, { useMemo } from "react";
import { format } from "d3-format";

// An ok default value: numberOfTicks = dimensions.boundedWidth / 80
const AxisHorizontal = ({ dimensions, scale, gridLines, numberOfTicks, ...props }) => {
  const formatter = format(",")

  const ticks = useMemo(() => {
    return scale.ticks(numberOfTicks).map((value) => ({
      value,
      xOffset: scale(value),
    }));
  }, [scale, numberOfTicks]);

  return (
    <g transform={`translate(0, ${dimensions.boundedHeight})`} {...props}>
      {ticks.map(({ value, xOffset }) => {
        return (
          <g key={value} transform={`translate(${xOffset}, 0)`}>
            <line
              y2={4}
              style={{
                stroke: "#E3E3E3",
              }}
            />

            <text
              key={value}
              style={{
                textAnchor: "middle",
                transform: "translateY(24px)"
              }}
            >
              {formatter(value)}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// An ok default value: numberOfTicks = dimensions.boundedHeight / 80
const AxisVertical = ({ dimensions, scale, gridLines, numberOfTicks, ...props }) => {
  const formatter = format(",")
  const [x1, x2] = gridLines === true ? [-dimensions.boundedWidth, 4] : [0, 4]

  const ticks = useMemo(() => {
    return scale.ticks(numberOfTicks).map((value) => ({
      value,
      yOffset: scale(value),
    }));
  }, [scale, numberOfTicks]);

  return (
    <g transform={`translate(${dimensions.boundedWidth}, 0)`} {...props}>
      {ticks.map(({ value, yOffset }, i) => {
        return (
          <g key={value} transform={`translate(0, ${yOffset})`}>
            <line
              x1={x1}
              x2={x2}
              style={{
                stroke: "#E3E3E3",
              }}
            />

            <text
              key={value}
              style={{
                textAnchor: "start",
                transform: "translateX(8px)",
              }}
              dy="0.32em"
            >
              {`${formatter(value)}${(i === ticks.length - 1) ? " WPM" : ""}`}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
}

const Axis = ({ dimension, dimensions, ...props }) => {
  const AxisByDimension = axisComponentsByDimension[dimension]
  if (!AxisByDimension) return null

  return (
    <AxisByDimension
      dimensions={dimensions}
      {...props}
    />
  )
}

export default Axis;