"use client";
import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onDismiss: () => void;
}

const CustomToast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onDismiss]);

  if (!isVisible) {
    return null;
  }

  let backgroundColorClass = 'bg-blue-500';
  const textColorClass = 'text-white';

  switch (type) {
    case 'success':
      backgroundColorClass = 'bg-green-500';
      break;
    case 'error':
      backgroundColorClass = 'bg-red-500';
      break;
    case 'info':
    default:
      backgroundColorClass = 'bg-blue-500';
      break;
  }

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 rounded-md shadow-lg overflow-hidden ${backgroundColorClass} ${textColorClass} p-4`}
    >
      <p className="text-sm">{message}</p>
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 focus:outline-none"
      >
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default CustomToast;