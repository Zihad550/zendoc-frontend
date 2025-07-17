"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedPricingToggleProps {
  children: ReactNode;
  isActive: boolean;
}

const AnimatedPricingToggle = ({ children, isActive }: AnimatedPricingToggleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isActive ? 1.02 : 1,
      }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{
        scale: 1.05,
      }}
      style={{
        position: "relative",
        zIndex: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPricingToggle;
