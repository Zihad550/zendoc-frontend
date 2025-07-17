"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";
import animationVariants from "./animationVariants";

interface AnimatedContactFormProps {
  children: ReactNode;
  delay?: number;
}

const AnimatedContactForm = ({
  children,
  delay = 0,
}: AnimatedContactFormProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
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

// Individual form field wrapper
interface AnimatedFormFieldProps {
  children: ReactNode;
  index?: number;
}

export const AnimatedFormField = ({ children }: AnimatedFormFieldProps) => {
  return (
    <motion.div
      variants={animationVariants.formFieldStagger}
      style={{
        position: "relative",
        zIndex: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContactForm;
