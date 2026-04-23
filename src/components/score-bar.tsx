/**
 * File: src/components/score-bar.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Stable score bar used across individual and aggregate reports.
 */
interface ScoreBarProps {
  label: string;
  value: number;
  tone?: "brand" | "science" | "motive" | "pressure" | "accent";
}

export function ScoreBar({ label, value, tone = "brand" }: ScoreBarProps) {
  return (
    <div className="score-bar" data-tone={tone}>
      <div className="score-bar__head">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="score-bar__track" aria-hidden="true">
        <span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}
