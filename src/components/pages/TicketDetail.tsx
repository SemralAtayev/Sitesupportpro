import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { PriorityBadge } from '../ui/PriorityBadge';
import { ArrowLeft, Paperclip, Send, User, Bot, FileText, Image, Video, File, Trash2, AlertCircle, Clock, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function TicketDetail() {
  const { id } = useParams();
  const [replyText, setReplyText] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [internalNote, setInternalNote] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);

  const ticket = {
    id: id || 'TKT-1234',
    title: 'Login page not responding on mobile',
    status: 'open' as const,
    priority: 'high' as const,
    agent: 'Sarah Chen',
    category: 'Bug',
    tags: ['mobile', 'login', 'urgent'],
    created: 'Jan 15, 2024 at 10:30 AM',
    updated: '5 min ago',
    description: 'The login page becomes unresponsive when accessed from mobile devices. Users are unable to tap the login button after entering credentials.',
  };

  const messages = [
    {
      id: 1,
      sender: 'user',
      name: 'John Doe',
      message: 'The login page becomes unresponsive when accessed from mobile devices. Users are unable to tap the login button after entering credentials. This is affecting multiple users.',
      timestamp: 'Jan 15, 2024 at 10:30 AM',
      attachments: [
        { name: 'screenshot-mobile.png', type: 'image', size: '2.3 MB' },
      ],
    },
    {
      id: 2,
      sender: 'agent',
      name: 'Sarah Chen',
      message: 'Thank you for reporting this issue. I\'ve escalated this to our development team. Can you please provide the following information:\n\n1. Which mobile device and browser are you using?\n2. Does this happen on both iOS and Android?\n3. Are you able to access the page in desktop mode on mobile?',
      timestamp: 'Jan 15, 2024 at 11:15 AM',
      attachments: [],
    },
    {
      id: 3,
      sender: 'user',
      name: 'John Doe',
      message: 'Sure! Here are the details:\n\n1. iPhone 13 Pro with Safari, and also tested on Samsung Galaxy S21 with Chrome\n2. Yes, it happens on both iOS and Android\n3. Desktop mode works fine, the issue only occurs in mobile view',
      timestamp: 'Jan 15, 2024 at 2:45 PM',
      attachments: [
        { name: 'ios-test.mp4', type: 'video', size: '8.1 MB' },
        { name: 'android-test.mp4', type: 'video', size: '7.8 MB' },
      ],
    },
  ];

  const internalNotes = [
    {
      id: 1,
      author: 'Sarah Chen',
      note: 'Reproduced the issue on our test devices. Seems to be a z-index problem with the overlay. Assigned to dev team.',
      timestamp: 'Jan 15, 2024 at 3:00 PM',
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      // Handle sending reply
      setReplyText('');
      setAttachments([]);
    }
  };

  const handleAddNote = () => {
    if (internalNote.trim()) {
      // Handle adding internal note
      setInternalNote('');
      setShowNoteForm(false);
    }
  };

  const getFileIcon = (type: string) => {
    if (type === 'image') return Image;
    if (type === 'video') return Video;
    return File;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/tickets">
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </motion.button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-2">
            {ticket.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Ticket {ticket.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Conversation Thread */}
          <GlassCard>
            <div className="p-6">
              <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-6">Conversation</h2>
              
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500'
                        : 'bg-gradient-to-br from-green-500 to-emerald-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Content */}
                    <div className={`flex-1 ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className={`max-w-2xl ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-slate-900 dark:text-slate-100">{message.name}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{message.timestamp}</span>
                        </div>
                        
                        <div className={`p-4 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 rounded-tr-none'
                            : 'bg-slate-50 dark:bg-slate-800 rounded-tl-none'
                        }`}>
                          <p className="text-slate-900 dark:text-slate-100 whitespace-pre-wrap">{message.message}</p>
                          
                          {/* Attachments */}
                          {message.attachments.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {message.attachments.map((attachment, index) => {
                                const Icon = getFileIcon(attachment.type);
                                return (
                                  <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50"
                                  >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                      attachment.type === 'image' ? 'bg-blue-500/10' :
                                      attachment.type === 'video' ? 'bg-purple-500/10' :
                                      'bg-slate-500/10'
                                    }`}>
                                      <Icon className={`w-5 h-5 ${
                                        attachment.type === 'image' ? 'text-blue-600' :
                                        attachment.type === 'video' ? 'text-purple-600' :
                                        'text-slate-600'
                                      }`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm text-slate-900 dark:text-slate-100 truncate">{attachment.name}</p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">{attachment.size}</p>
                                    </div>
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors text-xs"
                                    >
                                      Download
                                    </motion.button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Internal Notes */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <h2 className="text-xl text-slate-900 dark:text-slate-100">Internal Notes</h2>
                  <span className="px-2 py-1 rounded-lg bg-amber-500/10 text-amber-600 text-xs">Staff Only</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNoteForm(!showNoteForm)}
                  className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 transition-colors text-sm"
                >
                  Add Note
                </motion.button>
              </div>

              <AnimatePresence>
                {showNoteForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-700/50">
                      <textarea
                        value={internalNote}
                        onChange={(e) => setInternalNote(e.target.value)}
                        placeholder="Add an internal note (visible to staff only)..."
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
                        rows={3}
                      />
                      <div className="flex gap-2 mt-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleAddNote}
                          className="px-4 py-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors text-sm"
                        >
                          Save Note
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowNoteForm(false)}
                          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3">
                {internalNotes.map((note) => (
                  <div key={note.id} className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-slate-900 dark:text-slate-100">{note.author}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{note.timestamp}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{note.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Reply Box */}
          <GlassCard>
            <div className="p-6">
              <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-4">Send Reply</h2>
              
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                rows={5}
              />

              {/* Attachment Previews */}
              {attachments.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 dark:text-slate-100 truncate">{file.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeAttachment(index)}
                        className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between mt-4">
                <div>
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file-upload">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      <Paperclip className="w-4 h-4" />
                      Attach Files
                    </motion.div>
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  Send Reply
                </motion.button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Info */}
          <GlassCard>
            <div className="p-6">
              <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-6">Ticket Details</h2>
              
              <div className="space-y-4">
                {/* Status */}
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Status</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="waiting">Waiting</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Priority</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                {/* Agent */}
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Assigned Agent</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                    <option value="sarah">Sarah Chen</option>
                    <option value="mike">Mike Johnson</option>
                    <option value="emily">Emily Davis</option>
                    <option value="david">David Kim</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Category</label>
                  <input
                    type="text"
                    value={ticket.category}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ticket.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dates */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Created: {ticket.created}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>Updated: {ticket.updated}</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Actions */}
          <GlassCard>
            <div className="p-6">
              <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-4">Actions</h2>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-colors"
                >
                  Close Ticket
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
                >
                  Reopen Ticket
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full px-4 py-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Delete Ticket
                </motion.button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              
              <h3 className="text-2xl text-slate-900 dark:text-slate-100 mb-2">Delete Ticket?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                This action cannot be undone. All messages and attachments will be permanently deleted.
              </p>

              <textarea
                placeholder="Reason for deletion (optional)..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none mb-4"
                rows={3}
              />

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
