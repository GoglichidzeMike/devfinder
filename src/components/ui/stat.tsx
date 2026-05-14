interface StatProps {
  label: string;
  value: number | string;
}

export function Stat({ label, value }: StatProps) {
  const formatted = typeof value === "number" ? value.toLocaleString() : value;
  return (
    <div>
      <dt className="text-xs tracking-wide text-slate-500 uppercase dark:text-slate-400">
        {label}
      </dt>
      <dd className="text-lg font-bold">{formatted}</dd>
    </div>
  );
}
