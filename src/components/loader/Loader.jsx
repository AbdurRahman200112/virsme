import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import icon from '../../../favicon2.png';

const Loader = ({ delay = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, delay);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [delay]);

  if (!isVisible) return null; // Hide loader after delay

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#f8f9fa', // Optional background
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      zIndex: 9999 
    }}>
      {/* Static Logo */}
      <img
        src={icon}
        alt="Logo"
        style={{ width: '100px', height: '100px', position: 'relative', zIndex: 10 }}
      />

      {/* Spinning Circle Around Logo */}
      <motion.div
        style={{
          width: '150px',
          height: '150px',
          border: '5px solid #007bff',
          borderTop: '5px solid transparent',
          borderRadius: '50%',
          position: 'absolute',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default Loader;
