import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Zap, MessageCircle, Bell, CreditCard, Shield, Sparkles, TrendingUp, Users, BarChart, Clock, Star, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

interface LandingPageProps {
  onNavigate: (page: 'login' | 'register') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const features = [
    {
      icon: Zap,
      title: 'Submit Tickets Easily',
      description: 'Create support tickets in seconds with our intuitive interface. Attach files, screenshots, and detailed descriptions.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MessageCircle,
      title: 'Real-Time Bug Fixing',
      description: 'Get instant updates as our expert team works on your issues. Track progress in real-time with live notifications.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Live Correspondence',
      description: 'Chat directly with support agents inside your dashboard. No more endless email threads or phone tag.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: BarChart,
      title: 'Client Dashboard',
      description: 'Beautiful personalized dashboard for every user. Monitor all your tickets, conversations, and updates in one place.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Never miss an update with intelligent notifications via email, browser, and in-app alerts.',
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      icon: CreditCard,
      title: 'Billing Integration',
      description: 'Transparent pricing with integrated invoicing. Manage payments, track usage, and upgrade plans seamlessly.',
      gradient: 'from-pink-500 to-rose-500',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      description: 'Sign up in 30 seconds. No credit card required to start.',
      icon: Sparkles,
    },
    {
      number: '02',
      title: 'Submit First Ticket',
      description: 'Describe your website issue with screenshots and details.',
      icon: Zap,
    },
    {
      number: '03',
      title: 'Chat With Support',
      description: 'Connect with expert agents in real-time inside your dashboard.',
      icon: MessageCircle,
    },
    {
      number: '04',
      title: 'Track & Manage',
      description: 'Monitor progress, billing, and resolution in one centralized hub.',
      icon: TrendingUp,
    },
  ];

  const plans = [
    {
      name: 'Starter',
      price: 29,
      description: 'Perfect for small websites',
      features: [
        'Up to 50 tickets/month',
        'Email support',
        '5 team members',
        'Basic analytics',
        '48-hour response time',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: 79,
      description: 'For growing businesses',
      features: [
        'Up to 500 tickets/month',
        'Priority support',
        '25 team members',
        'Advanced analytics',
        '12-hour response time',
        'Custom branding',
        'API access',
      ],
      popular: true,
    },
    {
      name: 'Advanced',
      price: 199,
      description: 'Enterprise-grade solution',
      features: [
        'Unlimited tickets',
        '24/7 phone support',
        'Unlimited team members',
        'Custom integrations',
        '1-hour response time',
        'Dedicated account manager',
        'White-label solution',
        'SLA guarantee',
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'How does FixHub work?',
      answer: 'FixHub is a comprehensive ticket support platform that connects you with expert developers and support agents. Simply create an account, submit a ticket describing your website issue, and our team will work with you through our built-in chat system to diagnose and fix the problem. You can track all progress in your personalized dashboard.',
    },
    {
      question: 'What types of issues can you help with?',
      answer: 'We handle a wide range of website issues including bug fixes, performance optimization, security vulnerabilities, design problems, functionality errors, integration issues, and general technical support. Whether it\'s a small CSS fix or a complex backend issue, our expert team has you covered.',
    },
    {
      question: 'How quickly will I get a response?',
      answer: 'Response times depend on your plan and the priority level of your ticket. Starter plan users receive responses within 48 hours, Professional plan users within 12 hours, and Advanced plan users get priority support with responses within 1 hour. Critical issues are always escalated for faster resolution.',
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time from your account settings. When you upgrade, you\'ll immediately get access to the new features. When you downgrade, the changes will take effect at the start of your next billing cycle, and you\'ll retain your current features until then.',
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Absolutely! We offer a 14-day free trial with full access to Professional plan features. No credit card required to start. You can explore all features, submit test tickets, and experience our support quality before committing to a paid plan.',
    },
    {
      question: 'How is billing handled?',
      answer: 'Billing is handled automatically on a monthly or yearly basis, depending on your chosen plan. We accept all major credit cards and provide detailed invoices for every transaction. You can view your billing history, update payment methods, and manage your subscription directly from your dashboard.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with our service within the first 30 days, contact our support team and we\'ll process a full refund, no questions asked.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Security is our top priority. We use industry-standard encryption (SSL/TLS) for all data transmission, store data in secure, encrypted databases, and implement strict access controls. We\'re also GDPR compliant and conduct regular security audits to ensure your information is protected.',
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">FixHub</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">Features</a>
              <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }} className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">Pricing</a>
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">How It Works</a>
              <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }} className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">FAQ</a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('login')}
                className="px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('register')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 border border-blue-500/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-slate-700">Trusted by 10,000+ businesses</span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl mb-6 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">Fix Website Issues</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">Fast & Smart</span>
              </h1>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                The modern ticket support platform built for agencies, developers, and businesses. Get expert help fixing bugs, managing support, and tracking progress—all in one beautiful dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('register')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 group"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200 text-slate-700 text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  See Dashboard Preview
                </motion.button>
              </div>

              <div className="flex items-center gap-8 mt-12">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white"></div>
                    ))}
                  </div>
                  <div className="ml-2">
                    <div className="flex gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600">4.9/5 from 2,300+ reviews</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Visual - Abstract Dashboard Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Floating Cards */}
              <div className="relative w-full h-[600px]">
                {/* Main Dashboard Card */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 right-0 w-80 h-64 bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Active Tickets</p>
                      <p className="text-2xl text-slate-900">24</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-700">Login Issue</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-600">High</span>
                      </div>
                      <p className="text-xs text-slate-500">TKT-1234 • 5 min ago</p>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-50 border border-purple-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-700">Dashboard Bug</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-600">Medium</span>
                      </div>
                      <p className="text-xs text-slate-500">TKT-1233 • 1 hour ago</p>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Card */}
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-40 left-0 w-64 h-48 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-3xl shadow-2xl p-6 text-white"
                >
                  <h3 className="text-lg mb-6">Resolution Rate</h3>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-5xl">98</span>
                    <span className="text-2xl mb-1">%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12% this month</span>
                  </div>
                </motion.div>

                {/* Notification Card */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-20 right-12 w-72 h-auto bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900 mb-1">Ticket Resolved</p>
                      <p className="text-xs text-slate-500">Your payment gateway issue has been fixed and deployed.</p>
                      <p className="text-xs text-slate-400 mt-2">2 minutes ago</p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-2xl"
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-wider text-blue-600 mb-4 block">Features</span>
            <h2 className="text-4xl lg:text-5xl mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Everything you need to</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">manage support seamlessly</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your support workflow and delight your customers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl" 
                    style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))`, 
                    backgroundImage: `linear-gradient(135deg, rgb(59 130 246 / 0.3), rgb(168 85 247 / 0.3))` }}
                  ></div>
                  <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all h-full">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-wider text-blue-400 mb-4 block">How It Works</span>
            <h2 className="text-4xl lg:text-5xl text-white mb-6">
              Get started in <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">4 simple steps</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              From signup to resolution, we've streamlined the entire support experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent -translate-x-1/2"></div>
                  )}

                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all">
                    <div className="text-6xl bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 opacity-50">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/50">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl text-white mb-3">{step.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-wider text-blue-600 mb-4 block">Pricing</span>
            <h2 className="text-4xl lg:text-5xl mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Choose the perfect plan</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">for your business</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Simple, transparent pricing that scales with you. No hidden fees.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`relative ${plan.popular ? 'md:-mt-8' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white text-sm shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className={`h-full bg-white/80 backdrop-blur-xl border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all ${
                  plan.popular ? 'border-blue-500/50 shadow-blue-500/20' : 'border-slate-200/50'
                }`}>
                  <h3 className="text-2xl text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-5xl text-slate-900">${plan.price}</span>
                    <span className="text-slate-600">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('register')}
                    className={`w-full px-6 py-3 rounded-xl transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Choose Plan
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-[48px] p-12 lg:p-20 overflow-hidden shadow-2xl"
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative text-center">
              <h2 className="text-4xl lg:text-6xl text-white mb-6">
                Ready to fix your
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">website issues?</span>
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Join thousands of businesses that trust FixHub for their website support and bug-fixing needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('register')}
                  className="px-10 py-4 rounded-2xl bg-white text-slate-900 text-lg shadow-2xl hover:shadow-white/20 transition-all flex items-center justify-center gap-2 group"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('login')}
                  className="px-10 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white text-lg hover:bg-white/20 transition-all"
                >
                  Log In
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-wider text-blue-600 mb-4 block">FAQ</span>
            <h2 className="text-4xl lg:text-5xl mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Frequently Asked</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about FixHub. Can't find the answer you're looking for? Contact our support team.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left group"
                  >
                    <span className="text-lg text-slate-900 pr-8 group-hover:text-blue-600 transition-colors">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center"
                    >
                      {openFaqIndex === index ? (
                        <Minus className="w-5 h-5 text-white" />
                      ) : (
                        <Plus className="w-5 h-5 text-white" />
                      )}
                    </motion.div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaqIndex === index ? 'auto' : 0,
                      opacity: openFaqIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 border border-blue-500/20">
              <div className="text-left">
                <h3 className="text-xl text-slate-900 mb-1">Still have questions?</h3>
                <p className="text-slate-600">Our support team is here to help you 24/7.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all whitespace-nowrap"
              >
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
                </div>
                <span className="text-xl text-white">FixHub</span>
              </div>
              <p className="text-slate-400 max-w-md mb-6">
                The modern ticket support platform for agencies, developers, and businesses. Fix website issues fast with expert help.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>&copy; 2024 FixHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}