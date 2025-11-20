import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  AlertCircle,
  FileText,
  Upload,
  X,
  CheckCircle,
  Info,
  Tag,
  Clock,
  Paperclip,
  HelpCircle,
  Plus,
  Globe,
  Trash2,
} from 'lucide-react';
import { useForm } from 'react-hook-form@7.55.0';
import { Button } from '../components/ui/button';
import { toast } from 'sonner@2.0.3';

interface TicketFormData {
  title: string;
  category: string;
  priority: string;
  description: string;
  website: string;
  tags: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

interface Website {
  id: string;
  name: string;
  url: string;
}

// Load websites from localStorage
const loadWebsites = (): Website[] => {
  try {
    const stored = localStorage.getItem('sitesupportpro_websites');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading websites:', error);
  }
  // Default websites if none exist
  return [
    { id: '1', name: 'mywebsite.com', url: 'https://mywebsite.com' },
    { id: '2', name: 'shop.mywebsite.com', url: 'https://shop.mywebsite.com' },
    { id: '3', name: 'blog.mywebsite.com', url: 'https://blog.mywebsite.com' },
  ];
};

// Save websites to localStorage
const saveWebsites = (websites: Website[]) => {
  try {
    localStorage.setItem('sitesupportpro_websites', JSON.stringify(websites));
  } catch (error) {
    console.error('Error saving websites:', error);
    toast.error('Failed to save websites');
  }
};

export function CreateTicket() {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState('');
  
  // Website Management State
  const [websites, setWebsites] = useState<Website[]>(loadWebsites());
  const [showWebsiteModal, setShowWebsiteModal] = useState(false);
  const [newWebsiteName, setNewWebsiteName] = useState('');
  const [newWebsiteUrl, setNewWebsiteUrl] = useState('');
  const [websiteError, setWebsiteError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TicketFormData>();

  const categories = [
    { value: 'bug', label: 'Bug', icon: '🐛' },
    { value: 'design', label: 'Design Fix', icon: '🎨' },
    { value: 'performance', label: 'Performance Issue', icon: '⚡' },
    { value: 'content', label: 'Content Update', icon: '📝' },
    { value: 'integration', label: 'Integration / API', icon: '🔌' },
    { value: 'other', label: 'Other', icon: '📋' },
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-blue-600 bg-blue-500/10' },
    { value: 'medium', label: 'Medium', color: 'text-orange-600 bg-orange-500/10' },
    { value: 'high', label: 'High', color: 'text-red-600 bg-red-500/10' },
    { value: 'urgent', label: 'Urgent', color: 'text-purple-600 bg-purple-500/10' },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(Array.from(files));
    }
  };

  const handleFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    toast.success(`${files.length} file(s) uploaded successfully`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    toast.success('File removed');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const onSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate ticket ID
    const ticketId = 'TKT-' + Math.floor(1000 + Math.random() * 9000);
    setCreatedTicketId(ticketId);

    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully');
  };

  const handleCreateAnother = () => {
    setShowSuccessModal(false);
    reset();
    setUploadedFiles([]);
    setCreatedTicketId('');
  };

  const handleViewTicket = () => {
    navigate(`/tickets/${createdTicketId}`);
  };

  // Website Management Functions
  const handleAddWebsite = () => {
    if (!newWebsiteName || !newWebsiteUrl) {
      setWebsiteError('Both name and URL are required');
      return;
    }
    const newWebsite: Website = {
      id: Math.random().toString(36).substr(2, 9),
      name: newWebsiteName,
      url: newWebsiteUrl,
    };
    const updatedWebsites = [...websites, newWebsite];
    setWebsites(updatedWebsites);
    saveWebsites(updatedWebsites);
    setNewWebsiteName('');
    setNewWebsiteUrl('');
    setWebsiteError('');
    setShowWebsiteModal(false);
    toast.success('Website added successfully');
  };

  const handleDeleteWebsite = (id: string) => {
    const updatedWebsites = websites.filter((site) => site.id !== id);
    setWebsites(updatedWebsites);
    saveWebsites(updatedWebsites);
    toast.success('Website removed successfully');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/tickets')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 mb-4 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Tickets</span>
        </button>
        <h1 className="mb-2">Create New Ticket</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Describe your issue and our support team will help as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2>Basic Information</h2>
              </div>

              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                    Ticket Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    placeholder="Example: Header menu not working on mobile"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Category */}
                  <div>
                    <label className="block text-sm mb-2 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      Category <span className="text-red-500">*</span>
                      <div className="group relative">
                        <Info className="w-4 h-4 text-slate-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-slate-900 text-white text-xs rounded-lg">
                          Select the type of issue you're experiencing
                        </div>
                      </div>
                    </label>
                    <select
                      {...register('category', { required: 'Category is required' })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all cursor-pointer"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.icon} {cat.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm mb-2 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      Priority <span className="text-red-500">*</span>
                      <div className="group relative">
                        <Info className="w-4 h-4 text-slate-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-slate-900 text-white text-xs rounded-lg">
                          How urgent is this issue?
                        </div>
                      </div>
                    </label>
                    <select
                      {...register('priority', { required: 'Priority is required' })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all cursor-pointer"
                    >
                      <option value="">Select priority</option>
                      {priorities.map((priority) => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                    {errors.priority && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.priority.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2>Description</h2>
              </div>

              <div>
                <label className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('description', {
                    required: 'Description is required',
                    minLength: { value: 20, message: 'Description must be at least 20 characters' },
                  })}
                  rows={8}
                  placeholder="Describe the issue, steps to reproduce, expected result..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all resize-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description.message}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Attachments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Paperclip className="w-5 h-5 text-white" />
                </div>
                <h2>Attachments</h2>
              </div>

              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  isDragging
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600'
                }`}
              >
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="mb-2 text-slate-700 dark:text-slate-300">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Supports: Images, Videos, PDFs, Logs (Max 10MB per file)
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept="image/*,video/*,.pdf,.log,.txt"
                />
                <label htmlFor="file-upload">
                  <Button type="button" className="cursor-pointer" asChild>
                    <span>Browse Files</span>
                  </Button>
                </label>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {uploadedFiles.length} file(s) uploaded
                  </p>
                  {uploadedFiles.map((file) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/50"
                    >
                      {file.preview ? (
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <Paperclip className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate text-slate-900 dark:text-slate-100">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="w-8 h-8 rounded-lg hover:bg-red-500/10 text-red-500 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Additional Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <h2>Additional Options</h2>
              </div>

              <div className="space-y-5">
                {/* Website / Project */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm text-slate-700 dark:text-slate-300">
                      Assigned Website / Project
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowWebsiteModal(true)}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      Add New
                    </button>
                  </div>
                  <select
                    {...register('website')}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all cursor-pointer"
                  >
                    <option value="">Select a website</option>
                    {websites.map((site) => (
                      <option key={site.id} value={site.url}>
                        {site.name}
                      </option>
                    ))}
                  </select>
                  
                  {/* Manage Websites List */}
                  {websites.length > 0 && (
                    <div className="mt-4 p-4 rounded-2xl bg-slate-100/30 dark:bg-slate-800/30 border border-slate-200/30 dark:border-slate-700/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Globe className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Manage Websites ({websites.length})
                        </p>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {websites.map((site) => (
                          <div
                            key={site.id}
                            className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/50 dark:bg-slate-900/50 group hover:bg-white dark:hover:bg-slate-900 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-xs truncate text-slate-900 dark:text-slate-100">
                                {site.name}
                              </p>
                              <p className="text-xs truncate text-slate-500 dark:text-slate-400">
                                {site.url}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteWebsite(site.id)}
                              className="w-6 h-6 rounded-lg hover:bg-red-500/10 text-red-500 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                    Tags (Optional)
                  </label>
                  <input
                    type="text"
                    {...register('tags')}
                    placeholder="e.g., UI, Checkout, SEO (separate with commas)"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                  />
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 min-w-[200px] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Creating Ticket...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Submit Ticket
                  </>
                )}
              </Button>

              <Button
                type="button"
                onClick={handleSaveDraft}
                variant="outline"
                className="flex-1 min-w-[200px] cursor-pointer"
              >
                Save as Draft
              </Button>

              <Button
                type="button"
                onClick={() => navigate('/tickets')}
                variant="ghost"
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </motion.div>
          </form>
        </div>

        {/* Sidebar - Guidelines */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl sticky top-24"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <h3>Ticket Guidelines</h3>
            </div>

            <div className="space-y-6">
              {/* Response Time */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <p className="text-sm">Response Time</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 pl-6">
                  We typically respond within 2-4 hours during business hours.
                </p>
              </div>

              {/* Support Hours */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <p className="text-sm">Support Hours</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 pl-6">
                  Monday - Friday: 9 AM - 6 PM EST
                  <br />
                  Weekend: Emergency only
                </p>
              </div>

              {/* Checklist */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <p className="text-sm">What to Include</p>
                </div>
                <ul className="space-y-2 pl-6 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Clear description of the issue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Steps to reproduce the problem</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Screenshots or screen recordings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Browser and device information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Expected vs actual behavior</span>
                  </li>
                </ul>
              </div>

              {/* Priority Guide */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <p className="text-sm mb-3">Priority Guide:</p>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <p>
                    <strong className="text-blue-600">Low:</strong> Minor issues, cosmetic fixes
                  </p>
                  <p>
                    <strong className="text-orange-600">Medium:</strong> Affects some users
                  </p>
                  <p>
                    <strong className="text-red-600">High:</strong> Major functionality broken
                  </p>
                  <p>
                    <strong className="text-purple-600">Urgent:</strong> Site down or security issue
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="mb-3">Ticket Created Successfully!</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  Your ticket has been created with ID:
                </p>
                <p className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-6">
                  {createdTicketId}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
                  Our support team will review your ticket and respond as soon as possible.
                </p>

                <div className="flex gap-3">
                  <Button onClick={handleViewTicket} className="flex-1 cursor-pointer">
                    View Ticket
                  </Button>
                  <Button
                    onClick={handleCreateAnother}
                    variant="outline"
                    className="flex-1 cursor-pointer"
                  >
                    Create Another
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website Management Modal */}
      <AnimatePresence>
        {showWebsiteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowWebsiteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h2 className="mb-3">Add New Website</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Enter the details of the new website:
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                      Website Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newWebsiteName}
                      onChange={(e) => setNewWebsiteName(e.target.value)}
                      placeholder="e.g., mywebsite.com"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                      Website URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newWebsiteUrl}
                      onChange={(e) => setNewWebsiteUrl(e.target.value)}
                      placeholder="e.g., https://mywebsite.com"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                    />
                  </div>

                  {websiteError && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {websiteError}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={handleAddWebsite} className="flex-1 cursor-pointer">
                    Add Website
                  </Button>
                  <Button
                    onClick={() => setShowWebsiteModal(false)}
                    variant="outline"
                    className="flex-1 cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}