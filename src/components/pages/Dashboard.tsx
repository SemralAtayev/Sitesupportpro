import { GlassCard } from '../ui/GlassCard';
import { Ticket, Clock, CheckCircle, MessageCircle, Plus, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const stats = [
    {
      label: 'Open Tickets',
      value: '24',
      change: '+12%',
      icon: Ticket,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Waiting Response',
      value: '8',
      change: '-5%',
      icon: Clock,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      label: 'Resolved Today',
      value: '15',
      change: '+23%',
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      label: 'New Replies',
      value: '42',
      change: '+8%',
      icon: MessageCircle,
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const recentTickets = [
    {
      id: 'TKT-1234',
      title: 'Login page not responding on mobile',
      status: 'open' as const,
      priority: 'high' as const,
      agent: 'Sarah Chen',
      updated: '5 min ago',
    },
    {
      id: 'TKT-1233',
      title: 'Dashboard loading slowly',
      status: 'in-progress' as const,
      priority: 'medium' as const,
      agent: 'Mike Johnson',
      updated: '1 hour ago',
    },
    {
      id: 'TKT-1232',
      title: 'Cannot export reports to PDF',
      status: 'waiting' as const,
      priority: 'low' as const,
      agent: 'Emily Davis',
      updated: '2 hours ago',
    },
    {
      id: 'TKT-1231',
      title: 'Payment gateway integration issue',
      status: 'resolved' as const,
      priority: 'critical' as const,
      agent: 'David Kim',
      updated: '3 hours ago',
    },
  ];

  const activities = [
    {
      type: 'ticket',
      message: 'New ticket created',
      ticket: 'TKT-1234',
      time: '5 minutes ago',
    },
    {
      type: 'reply',
      message: 'Agent replied to your ticket',
      ticket: 'TKT-1230',
      time: '1 hour ago',
    },
    {
      type: 'status',
      message: 'Ticket status changed to Resolved',
      ticket: 'TKT-1231',
      time: '3 hours ago',
    },
    {
      type: 'assigned',
      message: 'Ticket assigned to Sarah Chen',
      ticket: 'TKT-1234',
      time: '5 hours ago',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">Welcome back, John</span>
            <span className="ml-2">👋</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Here's what's happening with your tickets today.</p>
        </div>
        <Link to="/tickets/new">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Ticket
          </motion.button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard hover>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl text-slate-900 dark:text-slate-100">{stat.value}</p>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tickets */}
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-slate-900 dark:text-slate-100">Recent Tickets</h2>
                <Link to="/tickets">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>

              <div className="space-y-4">
                {recentTickets.map((ticket) => (
                  <Link key={ticket.id} to={`/tickets/${ticket.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.01, x: 4 }}
                      className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-all cursor-pointer border border-slate-200/50 dark:border-slate-700/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-slate-500 dark:text-slate-400">{ticket.id}</span>
                            <span className={`w-2 h-2 rounded-full ${
                              ticket.priority === 'critical' ? 'bg-red-500' :
                              ticket.priority === 'high' ? 'bg-orange-500' :
                              ticket.priority === 'medium' ? 'bg-blue-500' :
                              'bg-slate-400'
                            }`}></span>
                          </div>
                          <p className="text-slate-900 dark:text-slate-100 mb-2">{ticket.title}</p>
                          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <span>Agent: {ticket.agent}</span>
                            <span>•</span>
                            <span>{ticket.updated}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            ticket.status === 'open' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                            ticket.status === 'in-progress' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                            ticket.status === 'waiting' ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400' :
                            'bg-green-500/10 text-green-600 dark:text-green-400'
                          }`}>
                            {ticket.status === 'in-progress' ? 'In Progress' : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Activity Timeline */}
        <div>
          <GlassCard>
            <div className="p-6">
              <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-6">Activity Timeline</h2>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        activity.type === 'ticket' ? 'bg-blue-500/10' :
                        activity.type === 'reply' ? 'bg-green-500/10' :
                        activity.type === 'status' ? 'bg-purple-500/10' :
                        'bg-orange-500/10'
                      }`}>
                        {activity.type === 'ticket' && <Ticket className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'reply' && <MessageCircle className="w-4 h-4 text-green-600" />}
                        {activity.type === 'status' && <CheckCircle className="w-4 h-4 text-purple-600" />}
                        {activity.type === 'assigned' && <AlertCircle className="w-4 h-4 text-orange-600" />}
                      </div>
                      {index < activities.length - 1 && (
                        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900 dark:text-slate-100 mb-1">{activity.message}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">{activity.ticket}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="mt-6">
            <div className="p-6">
              <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/tickets/new">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 hover:from-blue-500/20 hover:via-purple-500/20 hover:to-orange-500/20 text-left transition-all"
                  >
                    <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-slate-900 dark:text-slate-100">Create New Ticket</span>
                  </motion.button>
                </Link>
                <Link to="/tickets">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/80 text-left transition-all"
                  >
                    <Ticket className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-slate-900 dark:text-slate-100">View All Tickets</span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}