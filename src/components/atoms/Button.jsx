import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, className, disabled, whileHover, whileTap, type = 'button', ...props }) => {
  // Filter out any non-HTML props that might be passed accidentally
  const filteredProps = { ...props };
  delete filteredProps.animate;
  delete filteredProps.initial;
  delete filteredProps.transition;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
      whileHover={whileHover}
      whileTap={whileTap}
      {...filteredProps}
    >
      {children}
    </motion.button>
  );
};

export default Button;