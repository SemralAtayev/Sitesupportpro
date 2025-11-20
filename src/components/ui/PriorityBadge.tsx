interface PriorityBadgeProps {
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const styles = {
    low: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    medium: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    high: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    critical: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  };

  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${styles[priority]}`}>
      {labels[priority]}
    </span>
  );
}
