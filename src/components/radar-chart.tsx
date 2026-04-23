/**
 * File: src/components/radar-chart.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: SVG radar chart for nine-scale assessment profiles.
 */
import type {
  ScaleKey,
  ScaleScore,
} from "@/features/assessment/schemas/assessment";

interface RadarChartProps {
  scores: Record<ScaleKey, ScaleScore>;
  order: readonly ScaleKey[];
}

function pointFor(input: {
  index: number;
  total: number;
  radius: number;
  center: number;
}): { x: number; y: number } {
  const angle = -Math.PI / 2 + (input.index / input.total) * Math.PI * 2;

  return {
    x: input.center + Math.cos(angle) * input.radius,
    y: input.center + Math.sin(angle) * input.radius,
  };
}

function polygonPoints(input: {
  values: number[];
  center: number;
  maxRadius: number;
}): string {
  return input.values
    .map((value, index) =>
      pointFor({
        index,
        total: input.values.length,
        center: input.center,
        radius: (value / 100) * input.maxRadius,
      }),
    )
    .map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(" ");
}

export function RadarChart({ scores, order }: RadarChartProps) {
  const center = 160;
  const maxRadius = 104;
  const values = order.map((scaleKey) => scores[scaleKey].score);
  const profilePoints = polygonPoints({ values, center, maxRadius });

  return (
    <figure className="radar-chart">
      <svg role="img" viewBox="0 0 320 320" aria-label="Nine-scale radar chart">
        {[25, 50, 75, 100].map((ring) => (
          <polygon
            key={ring}
            className="radar-chart__ring"
            points={polygonPoints({
              values: order.map(() => ring),
              center,
              maxRadius,
            })}
          />
        ))}
        {order.map((scaleKey, index) => {
          const outer = pointFor({
            index,
            total: order.length,
            radius: maxRadius,
            center,
          });
          const label = pointFor({
            index,
            total: order.length,
            radius: maxRadius + 28,
            center,
          });

          return (
            <g key={scaleKey}>
              <line
                className="radar-chart__axis"
                x1={center}
                y1={center}
                x2={outer.x}
                y2={outer.y}
              />
              <text
                className="radar-chart__label"
                x={label.x}
                y={label.y}
                textAnchor={
                  label.x < center - 8
                    ? "end"
                    : label.x > center + 8
                      ? "start"
                      : "middle"
                }
                dominantBaseline="middle"
              >
                {scores[scaleKey].shortName}
              </text>
            </g>
          );
        })}
        <polygon className="radar-chart__profile" points={profilePoints} />
      </svg>
    </figure>
  );
}
