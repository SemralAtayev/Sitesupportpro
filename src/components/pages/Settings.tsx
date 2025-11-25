import { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { User, Shield, Bell, CreditCard, Settings as SettingsIcon, Upload, Check, AlertTriangle, Globe, Clock, Mail, Phone, Building, Trash2, Eye, EyeOff, Smartphone, Monitor, Download, Plus, X, Info, MoreVertical, Star, Edit3, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AddCardModal } from '../ui/AddCardModal';

type Tab = 'profile' | 'security' | 'notifications' | 'billing' | 'account';

export function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'profile' as Tab, label: 'Profile', icon: User },
    { id: 'security' as Tab, label: 'Security', icon: Shield },
    { id: 'notifications' as Tab, label: 'Notifications', icon: Bell },
    { id: 'billing' as Tab, label: 'Billing', icon: CreditCard },
    { id: 'account' as Tab, label: 'Account', icon: SettingsIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
      <GlassCard>
        <div className="p-2">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </GlassCard>

      {/* Tab Content */}
      {activeTab === 'profile' && <ProfileTab />}
      {activeTab === 'security' && <SecurityTab showPassword={showPassword} setShowPassword={setShowPassword} />}
      {activeTab === 'notifications' && <NotificationsTab />}
      {activeTab === 'billing' && <BillingTab />}
      {activeTab === 'account' && <AccountTab />}
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Photo */}
      <GlassCard>
        <div className="p-6">
          <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-6">Profile Photo</h2>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 flex items-center justify-center mb-4">
              <User className="w-16 h-16 text-white" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors mb-2"
            >
              <Upload className="w-4 h-4" />
              Upload Photo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              Remove Photo
            </motion.button>
          </div>
        </div>
      </GlassCard>

      {/* Profile Information */}
      <div className="lg:col-span-2">
        <GlassCard>
          <div className="p-6">
            <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">First Name</label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  <span className="px-4 py-3 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Verified
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Company Name
                </label>
                <input
                  type="text"
                  defaultValue="Acme Corporation"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Language
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Timezone
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                    <option>UTC-05:00 (EST)</option>
                    <option>UTC-08:00 (PST)</option>
                    <option>UTC+00:00 (GMT)</option>
                    <option>UTC+01:00 (CET)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
                >
                  Save Changes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Reset
                </motion.button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function SecurityTab({ showPassword, setShowPassword }: { showPassword: boolean; setShowPassword: (val: boolean) => void }) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const sessions = [
    { id: 1, device: 'MacBook Pro', location: 'New York, USA', ip: '192.168.1.1', lastActive: '5 min ago', current: true },
    { id: 2, device: 'iPhone 13', location: 'New York, USA', ip: '192.168.1.2', lastActive: '2 hours ago', current: false },
    { id: 3, device: 'Windows PC', location: 'Los Angeles, USA', ip: '10.0.0.1', lastActive: '1 day ago', current: false },
  ];

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <GlassCard>
        <div className="p-6">
          <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-6">Change Password</h2>
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <div className="mt-2 flex gap-1">
                <div className="h-1.5 flex-1 rounded-full bg-red-500"></div>
                <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-700"></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Password strength: Weak</p>
            </div>
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Confirm New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
            >
              Update Password
            </motion.button>
          </div>
        </div>
      </GlassCard>

      {/* Two-Factor Authentication */}
      <GlassCard>
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-2">Two-Factor Authentication</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
            </label>
          </div>
          {twoFactorEnabled && (
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700">
              <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">Scan this QR code with your authenticator app:</p>
              <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center mb-3">
                <div className="w-40 h-40 bg-slate-200"></div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Or enter this key manually: <code className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700">ABCD-EFGH-IJKL-MNOP</code></p>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Active Sessions */}
      <GlassCard>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-slate-900 dark:text-slate-100">Active Sessions</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors text-sm"
            >
              Logout All Devices
            </motion.button>
          </div>
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      {session.device.includes('MacBook') || session.device.includes('Windows') ? (
                        <Monitor className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Smartphone className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-slate-900 dark:text-slate-100">{session.device}</span>
                        {session.current && (
                          <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs">Current</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{session.location}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">IP: {session.ip} • Last active: {session.lastActive}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm text-red-600 dark:text-red-400 hover:underline"
                    >
                      Revoke
                    </motion.button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function NotificationsTab() {
  const [emailNotifications, setEmailNotifications] = useState({
    newTicket: true,
    newReply: true,
    statusChange: true,
    assignment: true,
    newsletter: false,
  });

  const [browserNotifications, setBrowserNotifications] = useState(false);

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="p-6">
          <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-6">Email Notifications</h2>
          <div className="space-y-4">
            <NotificationToggle
              label="New Ticket Created"
              description="Receive an email when a new ticket is created"
              checked={emailNotifications.newTicket}
              onChange={(val) => setEmailNotifications({ ...emailNotifications, newTicket: val })}
            />
            <NotificationToggle
              label="New Reply"
              description="Get notified when someone replies to your ticket"
              checked={emailNotifications.newReply}
              onChange={(val) => setEmailNotifications({ ...emailNotifications, newReply: val })}
            />
            <NotificationToggle
              label="Status Changes"
              description="Receive updates when ticket status changes"
              checked={emailNotifications.statusChange}
              onChange={(val) => setEmailNotifications({ ...emailNotifications, statusChange: val })}
            />
            <NotificationToggle
              label="Ticket Assignments"
              description="Get notified when a ticket is assigned"
              checked={emailNotifications.assignment}
              onChange={(val) => setEmailNotifications({ ...emailNotifications, assignment: val })}
            />
            <NotificationToggle
              label="Newsletter & Updates"
              description="Receive product updates and newsletters"
              checked={emailNotifications.newsletter}
              onChange={(val) => setEmailNotifications({ ...emailNotifications, newsletter: val })}
            />
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-6">
          <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-6">Browser Notifications</h2>
          <div className="flex items-start justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="flex-1">
              <p className="text-slate-900 dark:text-slate-100 mb-1">Push Notifications</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Get real-time browser notifications for important updates</p>
              {browserNotifications && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Browser notifications are enabled
                </p>
              )}
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input
                type="checkbox"
                checked={browserNotifications}
                onChange={(e) => setBrowserNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
            </label>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function NotificationToggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (val: boolean) => void }) {
  return (
    <div className="flex items-start justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
      <div className="flex-1">
        <p className="text-slate-900 dark:text-slate-100 mb-1">{label}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-14 h-8 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
      </label>
    </div>
  );
}

function BillingTab() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [openCardMenu, setOpenCardMenu] = useState<number | null>(null);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', primary: true },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '06/26', primary: false },
  ]);

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 29 : 290,
      features: ['Up to 50 tickets/month', 'Email support', '5 team members', 'Basic analytics'],
      current: false,
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 79 : 790,
      features: ['Up to 500 tickets/month', 'Priority support', '25 team members', 'Advanced analytics', 'Custom branding'],
      current: true,
      recommended: true,
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 199 : 1990,
      features: ['Unlimited tickets', '24/7 phone support', 'Unlimited team members', 'Custom integrations', 'Dedicated account manager'],
      current: false,
    },
  ];

  const billingHistory = [
    { id: 1, date: 'Jan 15, 2024', description: 'Pro Plan - Monthly', amount: '$79.00', status: 'paid' },
    { id: 2, date: 'Dec 15, 2023', description: 'Pro Plan - Monthly', amount: '$79.00', status: 'paid' },
    { id: 3, date: 'Nov 15, 2023', description: 'Pro Plan - Monthly', amount: '$79.00', status: 'paid' },
  ];

  const handleSetAsPrimary = (cardId: number) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      primary: method.id === cardId
    })));
    setOpenCardMenu(null);
  };

  const handleRemoveCard = (cardId: number) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== cardId));
    setOpenCardMenu(null);
  };

  const handleAddCard = (newCard: any) => {
    const id = Math.max(...paymentMethods.map(m => m.id), 0) + 1;
    setPaymentMethods([...paymentMethods, { ...newCard, id }]);
    setShowAddCardModal(false);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl shadow-green-500/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">Card Added Successfully</p>
                <p className="text-sm text-white/90">Your new payment method is ready to use</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Card Modal */}
      <AddCardModal 
        isOpen={showAddCardModal}
        onClose={() => setShowAddCardModal(false)}
        onAddCard={handleAddCard}
      />

      {/* Current Plan */}
      <GlassCard>
        <div className="p-6">
          <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-6">Current Plan</h2>
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl text-slate-900 dark:text-slate-100">Pro Plan</span>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 text-blue-600 dark:text-blue-400 text-sm">Active</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">$79.00 / month</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Next billing date: February 15, 2024</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
            >
              Change Plan
            </motion.button>
          </div>

          {/* Usage */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Tickets this month</span>
                <span className="text-sm text-slate-900 dark:text-slate-100">142 / 500</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '28.4%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Team members</span>
                <span className="text-sm text-slate-900 dark:text-slate-100">8 / 25</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '32%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Pricing Plans */}
      <GlassCard>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-slate-900 dark:text-slate-100">Available Plans</h2>
            <div className="flex gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-lg transition-all ${billingCycle === 'monthly' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${billingCycle === 'yearly' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Yearly
                <span className="ml-2 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs">Save 17%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-6 rounded-3xl border-2 transition-all ${plan.recommended ? 'border-blue-500 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-orange-900/20' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'}`}
              >
                {plan.recommended && (
                  <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white text-xs mb-4">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl text-slate-900 dark:text-slate-100 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl text-slate-900 dark:text-slate-100">${plan.price}</span>
                  <span className="text-slate-600 dark:text-slate-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={plan.current}
                  className={`w-full px-4 py-3 rounded-xl transition-all ${plan.current ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed' : plan.recommended ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20'}`}
                >
                  {plan.current ? 'Current Plan' : 'Choose Plan'}
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Payment Methods */}
      <GlassCard>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl text-slate-900 dark:text-slate-100">Payment Methods</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Manage your payment cards for auto-renewals and invoices</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddCardModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add New Card
            </motion.button>
          </div>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <motion.div 
                key={method.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between group hover:border-blue-300 dark:hover:border-blue-700 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <CreditCard className="w-7 h-7 text-white relative z-10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-slate-900 dark:text-slate-100">{method.type} •••• {method.last4}</p>
                      {method.primary && (
                        <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Expires {method.expiry}</p>
                  </div>
                </div>
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setOpenCardMenu(openCardMenu === method.id ? null : method.id)}
                    className="w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {openCardMenu === method.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 top-10 w-48 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl z-10"
                      >
                        {!method.primary && (
                          <button
                            onClick={() => handleSetAsPrimary(method.id)}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                          >
                            <Star className="w-4 h-4" />
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setOpenCardMenu(null);
                            setShowAddCardModal(true);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                        >
                          <Edit3 className="w-4 h-4" />
                          Replace Card
                        </button>
                        <button
                          onClick={() => handleRemoveCard(method.id)}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove Card
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
          
          {paymentMethods.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">No payment methods added yet</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddCardModal(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25"
              >
                Add Your First Card
              </motion.button>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Billing History */}
      <GlassCard>
        <div className="p-6">
          <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-6">Billing History</h2>
          <div className="space-y-3">
            {billingHistory.map((invoice) => (
              <div key={invoice.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-slate-900 dark:text-slate-100 mb-1">{invoice.description}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-900 dark:text-slate-100">{invoice.amount}</span>
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm">Paid</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Cancel Subscription */}
      <GlassCard>
        <div className="p-6 border-2 border-red-200 dark:border-red-900/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl text-slate-900 dark:text-slate-100 mb-2">Cancel Subscription</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Once you cancel, you'll lose access to all Pro features at the end of your billing period.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Cancel Subscription
              </motion.button>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function AccountTab() {
  return (
    <div className="space-y-6">
      {/* Account Info */}
      <GlassCard>
        <div className="p-6">
          <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-6">Account Information</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Account ID</p>
                <p className="text-slate-900 dark:text-slate-100">ACC-789456123</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Account Type</p>
                <p className="text-slate-900 dark:text-slate-100">Business</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Member Since</p>
                <p className="text-slate-900 dark:text-slate-100">January 15, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Delete Account */}
      <GlassCard>
        <div className="p-6 border-2 border-red-200 dark:border-red-900/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl text-slate-900 dark:text-slate-100 mb-2">Delete Account</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Delete Account
              </motion.button>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}