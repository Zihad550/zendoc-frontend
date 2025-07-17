"use client";
import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";
import animationVariants from "./animationVariants";

// Staggered Animation Wrapper Component for multiple items
interface IStaggeredAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const StaggeredAnimationWrapper = ({
  children,
  className = "",
  delay = 0,
  duration = 0.3,
}: IStaggeredAnimationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...animationVariants.staggerContainer,
        visible: {
          ...animationVariants.staggerContainer.visible,
          transition: {
            ...(animationVariants.staggerContainer.visible as any).transition,
            delay: delay,
            duration,
          },
        },
      }}
      className={className}
      style={{
        position: "relative",
        zIndex: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default StaggeredAnimationWrapper;
