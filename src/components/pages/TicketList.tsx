import { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { PriorityBadge } from '../ui/PriorityBadge';
import { Search, Filter, Plus, ArrowUpDown, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function TicketList() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tickets = [
    {
      id: 'TKT-1234',
      title: 'Login page not responding on mobile',
      status: 'open' as const,
      priority: 'high' as const,
      agent: 'Sarah Chen',
      category: 'Bug',
      updated: '5 min ago',
      created: '2024-01-15',
    },
    {
      id: 'TKT-1233',
      title: 'Dashboard loading slowly',
      status: 'in-progress' as const,
      priority: 'medium' as const,
      agent: 'Mike Johnson',
      category: 'Performance',
      updated: '1 hour ago',
      created: '2024-01-15',
    },
    {
      id: 'TKT-1232',
      title: 'Cannot export reports to PDF',
      status: 'waiting' as const,
      priority: 'low' as const,
      agent: 'Emily Davis',
      category: 'Feature',
      updated: '2 hours ago',
      created: '2024-01-14',
    },
    {
      id: 'TKT-1231',
      title: 'Payment gateway integration issue',
      status: 'resolved' as const,
      priority: 'critical' as const,
      agent: 'David Kim',
      category: 'Bug',
      updated: '3 hours ago',
      created: '2024-01-14',
    },
    {
      id: 'TKT-1230',
      title: 'User authentication not working',
      status: 'closed' as const,
      priority: 'high' as const,
      agent: 'Sarah Chen',
      category: 'Bug',
      updated: '1 day ago',
      created: '2024-01-13',
    },
    {
      id: 'TKT-1229',
      title: 'Need help with API documentation',
      status: 'open' as const,
      priority: 'low' as const,
      agent: 'Mike Johnson',
      category: 'Support',
      updated: '2 days ago',
      created: '2024-01-12',
    },
  ];

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Support Tickets
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Manage and track all support requests</p>
        </div>
        <Link to="/tickets/new">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
          >
            <Plus className="w-5 h-5" />
            New Ticket
          </motion.button>
        </Link>
      </div>

      {/* Filters */}
      <GlassCard>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by ticket ID or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="waiting">Waiting</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Priority Filter */}
            <div>
              <div className="relative">
                <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Tickets Table */}
      <GlassCard>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Ticket ID</th>
                  <th className="text-left py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Title</th>
                  <th className="text-left py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Status</th>
                  <th className="text-left py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Priority</th>
                  <th className="text-left py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Category</th>
                  <th className="text-left py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Agent</th>
                  <th className="text-left py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Last Updated</th>
                  <th className="text-left py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <motion.tr
                    key={ticket.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="text-sm text-blue-600 dark:text-blue-400">{ticket.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-900 dark:text-slate-100">{ticket.title}</span>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="py-4 px-4">
                      <PriorityBadge priority={ticket.priority} />
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{ticket.category}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{ticket.agent}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{ticket.updated}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Link to={`/tickets/${ticket.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors text-sm"
                        >
                          View
                        </motion.button>
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTickets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">No tickets found matching your filters.</p>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
