import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className, animate, initial, transition, whileHover, whileTap, onClick, ...props }) => {
  const motionProps = { animate, initial, transition, whileHover, whileTap, onClick };
  const isInteractive = Object.values(motionProps).some(Boolean);

  const Component = isInteractive ? motion.div : 'div';

  return (
    <Component
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className || ''}`}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;