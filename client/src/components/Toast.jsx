// src/components/Toast.jsx
import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#2563eb';

  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      padding: '0.75rem 1.5rem',
      backgroundColor: bgColor,
      color: 'white',
      borderRadius: '6px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.3s ease',
      zIndex: 1000,
    }}>
      {message}
    </div>
  );
}