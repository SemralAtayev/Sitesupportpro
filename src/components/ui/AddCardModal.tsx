import { useState, useEffect } from 'react';
import { X, CreditCard, Info, MapPin, AlertCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (card: {
    type: string;
    last4: string;
    expiry: string;
    primary: boolean;
  }) => void;
}

// Luhn algorithm for card validation
function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

// Detect card type
function detectCardType(cardNumber: string): 'Visa' | 'Mastercard' | 'Unknown' {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.startsWith('4')) return 'Visa';
  if (digits.startsWith('5') || digits.startsWith('2')) return 'Mastercard';
  return 'Unknown';
}

// Format card number
function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(' ') : digits;
}

// Format expiry date
function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  }
  return digits;
}

export function AddCardModal({ isOpen, onClose, onAddCard }: AddCardModalProps) {
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    country: 'US',
    address: '',
    city: '',
    zipCode: '',
    setAsDefault: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCvv, setShowCvv] = useState(false);
  const [cardType, setCardType] = useState<'Visa' | 'Mastercard' | 'Unknown'>('Unknown');
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (formData.cardNumber) {
      setCardType(detectCardType(formData.cardNumber));
    }
  }, [formData.cardNumber]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setFormData({ ...formData, cardNumber: formatted });
      setErrors({ ...errors, cardNumber: '' });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    if (formatted.replace(/\D/g, '').length <= 4) {
      setFormData({ ...formData, expiry: formatted });
      setErrors({ ...errors, expiry: '' });
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setFormData({ ...formData, cvv: value });
      setErrors({ ...errors, cvv: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Cardholder name
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }

    // Card number
    const cardDigits = formData.cardNumber.replace(/\D/g, '');
    if (!cardDigits) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardDigits.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    } else if (!luhnCheck(cardDigits)) {
      newErrors.cardNumber = 'Invalid card number';
    } else if (cardType === 'Unknown') {
      newErrors.cardNumber = 'Only Visa and Mastercard are supported';
    }

    // Expiry date
    if (!formData.expiry) {
      newErrors.expiry = 'Expiry date is required';
    } else {
      const [month, year] = formData.expiry.split('/');
      const monthNum = parseInt(month);
      const yearNum = parseInt(`20${year}`);
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;

      if (monthNum < 1 || monthNum > 12) {
        newErrors.expiry = 'Invalid month';
      } else if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
        newErrors.expiry = 'Card has expired';
      }
    }

    // CVV
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsValidating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const cardDigits = formData.cardNumber.replace(/\D/g, '');
    const last4 = cardDigits.slice(-4);
    
    onAddCard({
      type: cardType,
      last4,
      expiry: formData.expiry,
      primary: formData.setAsDefault,
    });

    // Reset form
    setFormData({
      cardholderName: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      country: 'US',
      address: '',
      city: '',
      zipCode: '',
      setAsDefault: false,
    });
    setErrors({});
    setIsValidating(false);
  };

  const handleClose = () => {
    setFormData({
      cardholderName: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      country: 'US',
      address: '',
      city: '',
      zipCode: '',
      setAsDefault: false,
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div>
              <h2 className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                Add New Card
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Securely add your payment method
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Card Preview */}
            <div className="relative h-48 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 p-6 text-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <CreditCard className="w-12 h-12 opacity-50" />
                  {cardType !== 'Unknown' && (
                    <div className="px-3 py-1 rounded-full bg-white/20 text-xs backdrop-blur-sm">
                      {cardType}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xl tracking-wider mb-2">
                    {formData.cardNumber || '•••• •••• •••• ••••'}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-70 mb-1">Cardholder</p>
                      <p className="text-sm">
                        {formData.cardholderName || 'YOUR NAME'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs opacity-70 mb-1">Expires</p>
                      <p className="text-sm">{formData.expiry || 'MM/YY'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 flex gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Your payment information is encrypted and secure. We never store your CVV.
                </p>
              </div>
            </div>

            {/* Card Information */}
            <div className="space-y-4">
              <h3 className="text-slate-900 dark:text-slate-100">Card Information</h3>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Cardholder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Name on card"
                  value={formData.cardholderName}
                  onChange={(e) => {
                    setFormData({ ...formData, cardholderName: e.target.value });
                    setErrors({ ...errors, cardholderName: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border ${
                    errors.cardholderName
                      ? 'border-red-500'
                      : 'border-slate-200 dark:border-slate-700'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                />
                {errors.cardholderName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.cardholderName}
                  </p>
                )}
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Card Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border ${
                      errors.cardNumber
                        ? 'border-red-500'
                        : 'border-slate-200 dark:border-slate-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-12`}
                  />
                  {cardType === 'Visa' && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-blue-600 text-white text-xs">
                      VISA
                    </div>
                  )}
                  {cardType === 'Mastercard' && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs">
                      MC
                    </div>
                  )}
                </div>
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleExpiryChange}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border ${
                      errors.expiry
                        ? 'border-red-500'
                        : 'border-slate-200 dark:border-slate-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                  />
                  {errors.expiry && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.expiry}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                    CVV <span className="text-red-500">*</span>
                    <div className="group relative">
                      <Info className="w-3 h-3 text-slate-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-slate-900 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                        3-digit code on the back of your card
                      </div>
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type={showCvv ? 'text' : 'password'}
                      placeholder="•••"
                      value={formData.cvv}
                      onChange={handleCvvChange}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border ${
                        errors.cvv
                          ? 'border-red-500'
                          : 'border-slate-200 dark:border-slate-700'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    />
                  </div>
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="space-y-4">
              <h3 className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Billing Address (Optional)
              </h3>

              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="10001"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Set as Default */}
            <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={formData.setAsDefault}
                onChange={(e) => setFormData({ ...formData, setAsDefault: e.target.checked })}
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
              />
              <div className="flex-1">
                <p className="text-slate-900 dark:text-slate-100">Set as default payment method</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Use this card for all future payments
                </p>
              </div>
            </label>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <motion.button
                type="submit"
                disabled={isValidating}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isValidating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Validating...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Save Card
                  </>
                )}
              </motion.button>
              <motion.button
                type="button"
                onClick={handleClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
