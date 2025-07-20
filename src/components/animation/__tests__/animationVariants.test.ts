import { describe, expect, it } from 'vitest';
import animationVariants from '../animationVariants';

describe('animationVariants', () => {
  describe('Basic animation variants', () => {
    it('should have sectionVariants with correct properties', () => {
      const { sectionVariants } = animationVariants;

      expect(sectionVariants).toHaveProperty('hidden');
      expect(sectionVariants).toHaveProperty('visible');

      expect(sectionVariants.hidden).toEqual({
        opacity: 0,
        y: 30,
        scale: 0.98,
      });

      expect(sectionVariants.visible).toEqual({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.4,
          ease: 'easeOut',
          staggerChildren: 0.08,
        },
      });
    });

    it('should have fadeInUp variant with correct properties', () => {
      const { fadeInUp } = animationVariants;

      expect(fadeInUp.hidden).toEqual({
        opacity: 0,
        y: 30,
        scale: 0.97,
      });

      expect(fadeInUp.visible).toEqual({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.35,
          ease: 'easeOut',
        },
      });
    });

    it('should have fadeInDown variant with correct properties', () => {
      const { fadeInDown } = animationVariants;

      expect(fadeInDown.hidden).toEqual({
        opacity: 0,
        y: -60,
        scale: 0.95,
      });

      expect(fadeInDown.visible).toEqual({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: 'easeOut',
        },
      });
    });
  });

  describe('Slide animations', () => {
    it('should have slideFromLeft variant', () => {
      const { slideFromLeft } = animationVariants;

      expect(slideFromLeft.hidden).toEqual({
        opacity: 0,
        x: -40,
        scale: 0.96,
      });

      expect(slideFromLeft.visible).toEqual({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.35,
          ease: 'easeOut',
        },
      });
    });

    it('should have slideFromRight variant', () => {
      const { slideFromRight } = animationVariants;

      expect(slideFromRight.hidden).toEqual({
        opacity: 0,
        x: 40,
        scale: 0.96,
      });

      expect(slideFromRight.visible).toEqual({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.35,
          ease: 'easeOut',
        },
      });
    });

    it('should have slideFromBottom variant', () => {
      const { slideFromBottom } = animationVariants;

      expect(slideFromBottom.hidden).toEqual({
        opacity: 0,
        y: 100,
        scale: 0.9,
      });

      expect(slideFromBottom.visible).toEqual({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: 'easeOut',
        },
      });
    });

    it('should have slideInFromTop variant', () => {
      const { slideInFromTop } = animationVariants;

      expect(slideInFromTop.hidden).toEqual({
        opacity: 0,
        y: -120,
        scale: 0.8,
      });

      expect(slideInFromTop.visible).toEqual({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.9,
          ease: 'easeOut',
        },
      });
    });
  });

  describe('Scale and rotation animations', () => {
    it('should have scaleIn variant', () => {
      const { scaleIn } = animationVariants;

      expect(scaleIn.hidden).toEqual({
        opacity: 0,
        scale: 0.94,
        rotate: -2,
      });

      expect(scaleIn.visible).toEqual({
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.35,
          ease: 'easeOut',
        },
      });
    });

    it('should have rotateIn variant', () => {
      const { rotateIn } = animationVariants;

      expect(rotateIn.hidden).toEqual({
        opacity: 0,
        scale: 0.8,
        rotate: 15,
      });

      expect(rotateIn.visible).toEqual({
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.9,
          ease: 'easeOut',
        },
      });
    });

    it('should have flipIn variant', () => {
      const { flipIn } = animationVariants;

      expect(flipIn.hidden).toEqual({
        opacity: 0,
        rotateY: -90,
        scale: 0.8,
      });

      expect(flipIn.visible).toEqual({
        opacity: 1,
        rotateY: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: 'easeOut',
        },
      });
    });
  });

  describe('Spring animations', () => {
    it('should have bounceIn variant with spring transition', () => {
      const { bounceIn } = animationVariants;

      expect(bounceIn.hidden).toEqual({
        opacity: 0,
        scale: 0.3,
        y: 50,
      });

      expect(bounceIn.visible).toEqual({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.8,
          type: 'spring',
          damping: 20,
          stiffness: 100,
        },
      });
    });

    it('should have elasticIn variant with spring transition', () => {
      const { elasticIn } = animationVariants;

      expect(elasticIn.hidden).toEqual({
        opacity: 0,
        scale: 0.3,
        rotate: -10,
      });

      expect(elasticIn.visible).toEqual({
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.8,
          type: 'spring',
          damping: 15,
          stiffness: 100,
        },
      });
    });

    it('should have floatIn variant with spring transition', () => {
      const { floatIn } = animationVariants;

      expect(floatIn.hidden).toEqual({
        opacity: 0,
        y: 50,
        rotateX: -15,
        scale: 0.9,
      });

      expect(floatIn.visible).toEqual({
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          type: 'spring',
          stiffness: 100,
          damping: 20,
        },
      });
    });
  });

  describe('Stagger animations', () => {
    it('should have staggerContainer variant', () => {
      const { staggerContainer } = animationVariants;

      expect(staggerContainer.hidden).toEqual({
        opacity: 0,
      });

      expect(staggerContainer.visible).toEqual({
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.1,
        },
      });
    });

    it('should have staggerItem variant', () => {
      const { staggerItem } = animationVariants;

      expect(staggerItem.hidden).toEqual({
        opacity: 0,
        y: 30,
        scale: 0.9,
      });

      expect(staggerItem.visible).toEqual({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
        },
      });
    });
  });

  describe('Component-specific animations', () => {
    it('should have buttonVariants', () => {
      const { buttonVariants } = animationVariants;

      expect(buttonVariants.hidden).toEqual({ opacity: 0, scale: 0.9 });
      expect(buttonVariants.visible).toEqual({
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.4,
          ease: 'easeOut',
          delay: 0.3,
        },
      });
    });

    it('should have cardVariants', () => {
      const { cardVariants } = animationVariants;

      expect(cardVariants.hidden).toEqual({
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotate: -2,
      });

      expect(cardVariants.visible).toEqual({
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
        },
      });
    });

    it('should have titleVariants', () => {
      const { titleVariants } = animationVariants;

      expect(titleVariants.hidden).toEqual({ opacity: 0, y: 30 });
      expect(titleVariants.visible).toEqual({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
        },
      });
    });

    it('should have formFieldStagger variant', () => {
      const { formFieldStagger } = animationVariants;

      expect(formFieldStagger.hidden).toEqual({
        opacity: 0,
        y: 20,
        scale: 0.95,
      });

      expect(formFieldStagger.visible).toEqual({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
        },
      });
    });
  });

  describe('Complex animations', () => {
    it('should have morphIn variant', () => {
      const { morphIn } = animationVariants;

      expect(morphIn.hidden).toEqual({
        opacity: 0,
        scale: 0.5,
        borderRadius: '50%',
        rotate: 180,
      });

      expect(morphIn.visible).toEqual({
        opacity: 1,
        scale: 1,
        borderRadius: '8px',
        rotate: 0,
        transition: {
          duration: 1,
          ease: 'easeOut',
        },
      });
    });

    it('should have zigzagIn variant', () => {
      const { zigzagIn } = animationVariants;

      expect(zigzagIn.hidden).toEqual({
        opacity: 0,
        x: -200,
        rotate: -15,
        scale: 0.7,
      });

      expect(zigzagIn.visible).toEqual({
        opacity: 1,
        x: 0,
        rotate: 0,
        scale: 1,
        transition: {
          duration: 1.2,
          type: 'spring',
          damping: 20,
          stiffness: 80,
        },
      });
    });

    it('should have slideInDiagonal variant', () => {
      const { slideInDiagonal } = animationVariants;

      expect(slideInDiagonal.hidden).toEqual({
        opacity: 0,
        x: -60,
        y: -60,
        scale: 0.8,
      });

      expect(slideInDiagonal.visible).toEqual({
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.9,
          ease: 'easeOut',
        },
      });
    });
  });

  describe('Pulse and ripple animations', () => {
    it('should have pulseFadeIn variant', () => {
      const { pulseFadeIn } = animationVariants;

      expect(pulseFadeIn.hidden).toEqual({
        opacity: 0,
        scale: 0.6,
      });

      expect(pulseFadeIn.visible).toEqual({
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
        },
      });
    });

    it('should have rippleIn variant', () => {
      const { rippleIn } = animationVariants;

      expect(rippleIn.hidden).toEqual({
        opacity: 0,
        scale: 0.4,
        rotate: -20,
      });

      expect(rippleIn.visible).toEqual({
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.7,
          type: 'spring',
          stiffness: 150,
          damping: 15,
        },
      });
    });
  });

  describe('Glide animations', () => {
    it('should have glideIn variant', () => {
      const { glideIn } = animationVariants;

      expect(glideIn.hidden).toEqual({
        opacity: 0,
        x: -80,
        rotate: -8,
      });

      expect(glideIn.visible).toEqual({
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: {
          duration: 1,
          type: 'spring',
          stiffness: 120,
          damping: 25,
        },
      });
    });

    it('should have cardHover variant', () => {
      const { cardHover } = animationVariants;

      expect(cardHover.hidden).toEqual({
        opacity: 0,
        y: 30,
        rotateY: -10,
      });

      expect(cardHover.visible).toEqual({
        opacity: 1,
        y: 0,
        rotateY: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
        },
      });
    });
  });

  describe('Animation variant structure', () => {
    it('should have all expected animation variants', () => {
      const expectedVariants = [
        'sectionVariants',
        'slideFromLeft',
        'slideFromRight',
        'fadeInUp',
        'fadeInDown',
        'slideFromBottom',
        'scaleIn',
        'rotateIn',
        'bounceIn',
        'staggerContainer',
        'staggerItem',
        'buttonVariants',
        'cardVariants',
        'titleVariants',
        'elasticIn',
        'flipIn',
        'morphIn',
        'slideInFromTop',
        'zigzagIn',
        'pulseFadeIn',
        'floatIn',
        'glideIn',
        'slideInDiagonal',
        'rippleIn',
        'formFieldStagger',
        'cardHover',
      ];

      expectedVariants.forEach((variant) => {
        expect(animationVariants).toHaveProperty(variant);
        expect((animationVariants as any)[variant]).toHaveProperty('hidden');
        expect((animationVariants as any)[variant]).toHaveProperty('visible');
      });
    });

    it('should have consistent structure for all variants', () => {
      Object.entries(animationVariants).forEach(([_name, variant]) => {
        expect(variant).toHaveProperty('hidden');
        expect(variant).toHaveProperty('visible');
        expect(typeof variant.hidden).toBe('object');
        expect(typeof variant.visible).toBe('object');

        // All hidden states should have opacity: 0
        expect(variant.hidden).toHaveProperty('opacity', 0);

        // All visible states should have opacity: 1
        expect(variant.visible).toHaveProperty('opacity', 1);
      });
    });

    it('should have valid transition properties', () => {
      Object.entries(animationVariants).forEach(([_name, variant]) => {
        if ((variant.visible as any).transition) {
          const transition = (variant.visible as any).transition;

          // Check for valid duration
          if (transition.duration) {
            expect(typeof transition.duration).toBe('number');
            expect(transition.duration).toBeGreaterThan(0);
          }

          // Check for valid ease values
          if (transition.ease) {
            expect(typeof transition.ease).toBe('string');
          }

          // Check for valid spring properties
          if (transition.type === 'spring') {
            if (transition.damping) {
              expect(typeof transition.damping).toBe('number');
              expect(transition.damping).toBeGreaterThan(0);
            }
            if (transition.stiffness) {
              expect(typeof transition.stiffness).toBe('number');
              expect(transition.stiffness).toBeGreaterThan(0);
            }
          }
        }
      });
    });
  });
});
