import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, User, LayoutDashboard, Ticket, Settings, Moon, Sun, Menu, X, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Mock ticket data for search
  const mockTickets = [
    { id: 'TKT-1234', title: 'Login page not loading correctly', status: 'open', priority: 'high' },
    { id: 'TKT-1233', title: 'Dashboard shows incorrect data', status: 'in-progress', priority: 'medium' },
    { id: 'TKT-1232', title: 'Payment gateway integration issue', status: 'resolved', priority: 'high' },
    { id: 'TKT-1231', title: 'Mobile responsive design broken', status: 'open', priority: 'low' },
    { id: 'TKT-1230', title: 'Email notifications not sending', status: 'in-progress', priority: 'medium' },
    { id: 'TKT-1229', title: 'Database connection timeout', status: 'open', priority: 'high' },
    { id: 'TKT-1228', title: 'User profile update failing', status: 'resolved', priority: 'low' },
    { id: 'TKT-1227', title: 'API rate limit exceeded error', status: 'open', priority: 'medium' },
  ];

  // Filter tickets based on search query
  const searchResults = searchQuery.trim().length > 0
    ? mockTickets.filter(ticket =>
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.priority.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5) // Limit to 5 results
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
  };

  const handleResultClick = (ticketId: string) => {
    navigate(`/tickets/${ticketId}`);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return AlertCircle;
      case 'in-progress': return Clock;
      case 'resolved': return CheckCircle;
      default: return Ticket;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-600 bg-blue-500/10';
      case 'in-progress': return 'text-orange-600 bg-orange-500/10';
      case 'resolved': return 'text-green-600 bg-green-500/10';
      default: return 'text-slate-600 bg-slate-500/10';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-500/10';
      case 'medium': return 'text-orange-600 bg-orange-500/10';
      case 'low': return 'text-blue-600 bg-blue-500/10';
      default: return 'text-slate-600 bg-slate-500/10';
    }
  };

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/tickets', icon: Ticket, label: 'Tickets' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950' : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20'}`}>
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="fixed left-0 top-0 h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 z-50"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-20 flex items-center px-6 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">SiteSupportPro</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <Icon className="w-5 h-5" />
                      {item.label === 'Notifications' && notificationCount > 0 && !sidebarOpen && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs flex items-center justify-center">
                          {notificationCount}
                        </span>
                      )}
                    </div>
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {item.label === 'Notifications' && notificationCount > 0 && sidebarOpen && (
                      <span className="ml-auto w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Toggle */}
          <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div
        style={{
          marginLeft: sidebarOpen ? 280 : 80,
          transition: 'margin-left 0.3s',
        }}
      >
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="h-full px-8 flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tickets, users, or keywords..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {showSearchResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-slate-900 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2 max-h-96 overflow-y-auto">
                      {searchResults.map((ticket) => {
                        const StatusIcon = getStatusIcon(ticket.status);
                        return (
                          <motion.div
                            key={ticket.id}
                            whileHover={{ scale: 1.02, x: 4 }}
                            onClick={() => handleResultClick(ticket.id)}
                            className="p-3 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-lg ${getStatusColor(ticket.status)} flex items-center justify-center flex-shrink-0`}>
                                <StatusIcon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-slate-500 dark:text-slate-400">{ticket.id}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(ticket.priority)}`}>
                                    {ticket.priority}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-900 dark:text-slate-100 truncate">{ticket.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize mt-1">{ticket.status.replace('-', ' ')}</p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="border-t border-slate-200/50 dark:border-slate-700/50 p-3 bg-slate-50/50 dark:bg-slate-800/50">
                      <button
                        onClick={() => {
                          navigate('/tickets');
                          setSearchQuery('');
                          setShowSearchResults(false);
                        }}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        View all tickets →
                      </button>
                    </div>
                  </motion.div>
                )}
                {showSearchResults && searchQuery.trim().length > 0 && searchResults.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-slate-900 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl p-6 text-center"
                  >
                    <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600 dark:text-slate-400">No results found for "{searchQuery}"</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Try searching with different keywords</p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="w-11 h-11 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 flex items-center justify-center hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                {darkMode ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </motion.button>

              {/* Notifications */}
              <Link to="/notifications">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-11 h-11 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 flex items-center justify-center hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </motion.button>
              </Link>

              {/* User Profile */}
              <Link to="/settings">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 hover:from-blue-500/20 hover:via-purple-500/20 hover:to-orange-500/20 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-slate-900 dark:text-slate-100">John Doe</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Pro Plan</div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}