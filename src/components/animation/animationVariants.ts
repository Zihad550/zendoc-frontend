import { Variants } from 'motion/react';

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      staggerChildren: 0.08,
    },
  },
};

const slideFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
};

const slideFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
};

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
};

const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    rotate: -2,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
};

const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const slideFromBottom: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: 15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const bounceIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
};

const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      delay: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
    rotate: -2,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Pricing page specific animations
const elasticIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  },
};

const flipIn: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -90,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const morphIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    borderRadius: '50%',
    rotate: 180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    borderRadius: '8px',
    rotate: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const slideInFromTop: Variants = {
  hidden: {
    opacity: 0,
    y: -120,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const zigzagIn: Variants = {
  hidden: {
    opacity: 0,
    x: -200,
    rotate: -15,
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
      type: 'spring',
      damping: 20,
      stiffness: 80,
    },
  },
};

const pulseFadeIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      // repeat: 1,
      // repeatType: "reverse",
      // repeatDelay: 0.2,
    },
  },
};

// Contact page specific animations
const floatIn: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -15,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

const glideIn: Variants = {
  hidden: {
    opacity: 0,
    x: -80,
    rotate: -8,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
      type: 'spring',
      stiffness: 120,
      damping: 25,
    },
  },
};

const slideInDiagonal: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
    y: -60,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const rippleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.4,
    rotate: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      type: 'spring',
      stiffness: 150,
      damping: 15,
    },
  },
};

const formFieldStagger: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const cardHover: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateY: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const animationVariants = {
  sectionVariants,
  slideFromLeft,
  slideFromRight,
  fadeInUp,
  fadeInDown,
  slideFromBottom,
  scaleIn,
  rotateIn,
  bounceIn,
  staggerContainer,
  staggerItem,
  buttonVariants,
  cardVariants,
  titleVariants,
  elasticIn,
  flipIn,
  morphIn,
  slideInFromTop,
  zigzagIn,
  pulseFadeIn,
  floatIn,
  glideIn,
  slideInDiagonal,
  rippleIn,
  formFieldStagger,
  cardHover,
};
export default animationVariants;
