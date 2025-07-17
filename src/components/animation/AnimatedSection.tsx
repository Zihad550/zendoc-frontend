'use client';
import { motion, useInView, Variants } from 'motion/react';
import { ReactNode, useRef } from 'react';
import animationVariants from './animationVariants';

// Animated Section Wrapper Component
interface IAnimatedSectionProps {
  children: ReactNode;
  variants: Variants;
  className?: string;
  delay: number;
}

const AnimatedSection = ({
  children,
  variants = animationVariants.sectionVariants,
  className = '',
  delay = 0,
}: IAnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.05, // Trigger earlier with less element visible
    margin: '0px 0px -10% 0px', // Reduced margin for earlier trigger
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...(variants.visible as any).transition,
            delay: delay,
          },
        },
      }}
      className={className}
      style={{
        position: 'relative',
        zIndex: 1,
      }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
