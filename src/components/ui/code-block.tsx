/**
 * File: src/components/ui/code-block.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Accessible scrollable code block primitive for citations and API examples.
 */
export function CodeBlock({
  children,
  label,
}: {
  children: string;
  label: string;
}) {
  return (
    <pre aria-label={label} className="code-block" tabIndex={0}>
      <code>{children}</code>
    </pre>
  );
}
