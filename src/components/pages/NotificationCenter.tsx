import { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Bell, Ticket, MessageCircle, CheckCircle, UserPlus, Clock, Trash2, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

type NotificationType = 'new_ticket' | 'reply' | 'status_change' | 'assigned' | 'priority_change' | 'closed' | 'reopened' | 'system';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  ticketId?: string;
  read: boolean;
}

export function NotificationCenter() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'new_ticket',
      title: 'New ticket created',
      message: 'TKT-1234: Login page not responding on mobile',
      timestamp: '5 min ago',
      ticketId: 'TKT-1234',
      read: false,
    },
    {
      id: 2,
      type: 'reply',
      title: 'New reply from agent',
      message: 'Sarah Chen replied to your ticket TKT-1230',
      timestamp: '1 hour ago',
      ticketId: 'TKT-1230',
      read: false,
    },
    {
      id: 3,
      type: 'status_change',
      title: 'Ticket status changed',
      message: 'TKT-1231 status changed to Resolved',
      timestamp: '3 hours ago',
      ticketId: 'TKT-1231',
      read: false,
    },
    {
      id: 4,
      type: 'assigned',
      title: 'Ticket assigned',
      message: 'TKT-1234 has been assigned to Sarah Chen',
      timestamp: '5 hours ago',
      ticketId: 'TKT-1234',
      read: true,
    },
    {
      id: 5,
      type: 'priority_change',
      title: 'Priority updated',
      message: 'TKT-1230 priority changed to High',
      timestamp: '1 day ago',
      ticketId: 'TKT-1230',
      read: true,
    },
    {
      id: 6,
      type: 'closed',
      title: 'Ticket closed',
      message: 'TKT-1229 has been marked as closed',
      timestamp: '2 days ago',
      ticketId: 'TKT-1229',
      read: true,
    },
    {
      id: 7,
      type: 'system',
      title: 'System maintenance',
      message: 'Scheduled maintenance on Sunday, 2:00 AM - 4:00 AM EST',
      timestamp: '3 days ago',
      read: true,
    },
  ]);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'new_ticket':
        return { icon: Ticket, color: 'blue' };
      case 'reply':
        return { icon: MessageCircle, color: 'green' };
      case 'status_change':
        return { icon: CheckCircle, color: 'purple' };
      case 'assigned':
        return { icon: UserPlus, color: 'orange' };
      case 'priority_change':
        return { icon: Clock, color: 'red' };
      case 'closed':
        return { icon: CheckCircle, color: 'slate' };
      case 'reopened':
        return { icon: Ticket, color: 'blue' };
      case 'system':
        return { icon: Bell, color: 'slate' };
      default:
        return { icon: Bell, color: 'slate' };
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Notifications
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer"
          >
            <Check className="w-5 h-5" />
            Mark All as Read
          </motion.button>
        )}
      </div>

      {/* Filter Tabs */}
      <GlassCard>
        <div className="p-2">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter('all')}
              className={`flex-1 px-4 py-3 rounded-2xl transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              }`}
            >
              All Notifications ({notifications.length})
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter('unread')}
              className={`flex-1 px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                filter === 'unread'
                  ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              }`}
            >
              Unread ({unreadCount})
            </motion.button>
          </div>
        </div>
      </GlassCard>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <GlassCard>
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 dark:text-slate-400">No notifications to display</p>
            </div>
          </GlassCard>
        ) : (
          filteredNotifications.map((notification) => {
            const { icon: Icon, color } = getNotificationIcon(notification.type);
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <GlassCard hover>
                  <div className={`p-5 ${!notification.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        color === 'blue' ? 'bg-blue-500/10' :
                        color === 'green' ? 'bg-green-500/10' :
                        color === 'purple' ? 'bg-purple-500/10' :
                        color === 'orange' ? 'bg-orange-500/10' :
                        color === 'red' ? 'bg-red-500/10' :
                        'bg-slate-500/10'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          color === 'blue' ? 'text-blue-600' :
                          color === 'green' ? 'text-green-600' :
                          color === 'purple' ? 'text-purple-600' :
                          color === 'orange' ? 'text-orange-600' :
                          color === 'red' ? 'text-red-600' :
                          'text-slate-600'
                        }`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-slate-900 dark:text-slate-100">{notification.title}</h3>
                          {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2"></span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{notification.message}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-slate-500 dark:text-slate-400">{notification.timestamp}</span>
                          {notification.ticketId && (
                            <Link to={`/tickets/${notification.ticketId}`}>
                              <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                              >
                                View Ticket →
                              </motion.span>
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        {!notification.read && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => markAsRead(notification.id)}
                            className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors flex items-center justify-center cursor-pointer"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteNotification(notification.id)}
                          className="w-9 h-9 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors flex items-center justify-center cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}