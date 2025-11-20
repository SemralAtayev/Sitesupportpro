import { Bug } from 'lucide-react';

interface LogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'landing';
}

export function Logo({ showText = true, size = 'md', variant = 'default' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-10 h-10',
    lg: 'w-11 h-11',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 flex items-center justify-center ${
          variant === 'landing' ? 'shadow-lg shadow-purple-500/25' : ''
        }`}
      >
        <Bug className={`${iconSizes[size]} text-white`} strokeWidth={2.5} />
      </div>
      {showText && (
        <span
          className={`${textSizes[size]} bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent font-semibold`}
        >
          SiteSupportPro
        </span>
      )}
    </div>
  );
}
