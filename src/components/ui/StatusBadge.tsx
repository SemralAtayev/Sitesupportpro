interface StatusBadgeProps {
  status: 'open' | 'in-progress' | 'waiting' | 'resolved' | 'closed';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    open: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    'in-progress': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    waiting: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    resolved: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    closed: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  };

  const labels = {
    open: 'Open',
    'in-progress': 'In Progress',
    waiting: 'Waiting',
    resolved: 'Resolved',
    closed: 'Closed',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
