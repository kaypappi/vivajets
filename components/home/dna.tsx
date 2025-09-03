'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useTranslations } from "@/lib/useTranslations";

const getDnaPoints = (t: any) => [
  {
    title: t('dna.dividends.title'),
    subtitle: t('dna.dividends.subtitle'),
    description: t('dna.dividends.description'),
    bgColor: '#FFFFFF',
    secondaryBg: '#F8F9FA',
    textColor: '#1a1a1a',
    accentColor: '#4F46E5',
    gradient: 'from-white to-gray-50',
  },
  {
    title: t('dna.indulgence.title'),
    subtitle: t('dna.indulgence.subtitle'),
    description: t('dna.indulgence.description'),
    bgColor: '#DADADA',
    secondaryBg: '#E5E5E5',
    textColor: '#1a1a1a',
    accentColor: '#333',
    gradient: 'from-gray-300 to-gray-400',
  },
  {
    title: t('dna.efficiency.title'),
    subtitle: t('dna.efficiency.subtitle'),
    description: t('dna.efficiency.description'),
    bgColor: '#F3F0E9',
    secondaryBg: '#F7F4ED',
    textColor: '#1a1a1a',
    accentColor: '#059669',
    gradient: 'from-amber-50 to-orange-100',
  },
  {
    title: t('dna.sanctuary.title'),
    subtitle: t('dna.sanctuary.subtitle'),
    description: t('dna.sanctuary.description'),
    bgColor: '#0A2D6D',
    secondaryBg: '#1E3A8A',
    textColor: '#ffffff',
    accentColor: '#60A5FA',
    gradient: 'from-blue-900 to-indigo-800',
  },
  {
    title: t('dna.value.title'),
    subtitle: t('dna.value.subtitle'),
    description: t('dna.value.description'),
    bgColor: '#1a1a1a',
    secondaryBg: '#2D2D2D',
    textColor: '#ffffff',
    accentColor: '#F59E0B',
    gradient: 'from-gray-900 to-black',
  },
  {
    title: t('dna.artistry.title'),
    subtitle: t('dna.artistry.subtitle'),
    description: t('dna.artistry.description'),
    bgColor: '#D2E6FF',
    secondaryBg: '#BFDBFE',
    textColor: '#1a1a1a',
    accentColor: '#7C3AED',
    gradient: 'from-blue-200 to-indigo-300',
  },
];

const animationVariants = {
    initial: { 
        opacity: 0, 
        y: 50,
        scale: 0.95
    },
    animate: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
            duration: 0.8
        }
    },
    exit: { 
        opacity: 0, 
        y: -50,
        scale: 0.95,
        transition: {
            staggerChildren: 0.1,
            duration: 0.5
        }
    }
};

const childVariants = {
    initial: { 
        opacity: 0, 
        y: 30,
        x: -20,
        scale: 0.9
    },
    animate: { 
        opacity: 1, 
        y: 0, 
        x: 0,
        scale: 1,
        transition: {
            duration: 0.7
        }
    },
    exit: { 
        opacity: 0, 
        y: -30, 
        x: 20,
        scale: 0.9,
        transition: {
            duration: 0.4
        }
    }
};

const titleVariants = {
    initial: { 
        opacity: 0, 
        y: 60,
        scale: 0.8
    },
    animate: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: {
            duration: 1,
            delay: 0.2
        }
    },
    exit: { 
        opacity: 0, 
        y: -60,
        scale: 0.8,
        transition: {
            duration: 0.5
        }
    }
};

const iconVariants = {
    initial: { 
        opacity: 0, 
        scale: 0,
        rotate: -180
    },
    animate: { 
        opacity: 1, 
        scale: 1,
        rotate: 0,
        transition: {
            duration: 0.8,
            delay: 0.5
        }
    },
    exit: { 
        opacity: 0, 
        scale: 0,
        rotate: 180,
        transition: {
            duration: 0.3
        }
    }
};

export default function Dna() {
  const { t } = useTranslations();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const dnaPoints = getDnaPoints(t);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Enhanced scroll progress with spring animation
  const springScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = springScrollProgress.on("change", (latest) => {
      const newIndex = Math.min(dnaPoints.length - 1, Math.floor(latest * dnaPoints.length));
      if (newIndex !== activeIndex) {
        setIsTransitioning(true);
        setActiveIndex(newIndex);
        
        // Reset transition state after animation
        setTimeout(() => setIsTransitioning(false), 800);
      }
    });
    return () => unsubscribe();
  }, [springScrollProgress, activeIndex]);

  // Enhanced background transitions
  const backgroundColor = useTransform(
    springScrollProgress,
    dnaPoints.map((_, i) => i / (dnaPoints.length - 1)),
    dnaPoints.map((p) => p.bgColor)
  );

  const secondaryBgColor = useTransform(
    springScrollProgress,
    dnaPoints.map((_, i) => i / (dnaPoints.length - 1)),
    dnaPoints.map((p) => p.secondaryBg)
  );

  const accentColor = useTransform(
    springScrollProgress,
    dnaPoints.map((_, i) => i / (dnaPoints.length - 1)),
    dnaPoints.map((p) => p.accentColor)
  );

  // Parallax effects for desktop
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  const activePoint = dnaPoints[activeIndex];

  // Mobile fallback without complex animations
  if (isMobile) {
    return (
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold special-header mb-4 text-gray-900">
              {t('dna.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('dna.subtitle')}
            </p>
          </div>
          
          <div className="grid gap-8 sm:gap-12">
            {dnaPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
                style={{ color: point.textColor }}
              >
                <div 
                  className={`rounded-3xl p-8 sm:p-12 bg-gradient-to-br ${point.gradient} shadow-sm`}
                  style={{ backgroundColor: point.bgColor }}
                >
                  <h3 className="text-2xl sm:text-3xl font-bold special-header mb-3">
                    {point.title}
                  </h3>
                  <div className="text-sm sm:text-base font-medium mb-2 opacity-80">
                    {point.subtitle}
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop version with advanced scroll animations
  return (
    <div ref={containerRef} className="relative" style={{ height: `${dnaPoints.length * 120}vh` }}>
      {/* Background layers for depth */}
      <motion.div 
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${activePoint.accentColor} 2px, transparent 2px), radial-gradient(circle at 80% 50%, ${activePoint.accentColor} 1px, transparent 1px)`,
            backgroundSize: '100px 100px, 150px 150px',
            y: yParallax,
            scale: scaleParallax
          }}
        />
        
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${activePoint.bgColor}E6 0%, ${activePoint.secondaryBg}CC 100%)`,
            opacity: 0.8
          }}
        />

        {/* Main content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={animationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                {/* Accent line */}
                <motion.div
                  variants={iconVariants}
                  className="flex items-center gap-6 mb-8"
                >
                  <motion.div
                    className="w-24 h-1 rounded-full"
                    style={{ backgroundColor: activePoint.accentColor }}
                    initial={{ width: 0 }}
                    animate={{ width: 96 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                </motion.div>

                {/* Title with enhanced animation */}
                <motion.h2 
                  variants={titleVariants}
                  style={{ 
                    color: activePoint.textColor,
                    textShadow: `0 2px 8px ${activePoint.accentColor}20`
                  }}
                  className="text-7xl lg:text-[170px] xl:text-[200px] font-bold special-header mb-8 leading-none"
                >
                  {activePoint.title}
                </motion.h2>

                {/* Animated divider */}
                <motion.div 
                  variants={childVariants}
                  className="flex items-center gap-4 mb-12"
                >
                  <motion.hr 
                    style={{ borderColor: activePoint.textColor }} 
                    className="flex-1 opacity-30 border-t-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: activePoint.accentColor }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  />
                  <motion.hr 
                    style={{ borderColor: activePoint.textColor }} 
                    className="flex-1 opacity-30 border-t-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </motion.div>

                {/* Content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                  <motion.div 
                    variants={childVariants} 
                    style={{ color: activePoint.textColor }}
                    className="space-y-4"
                  >
                    <div className="special-header text-2xl lg:text-3xl font-medium">
                      {activePoint.subtitle}
                    </div>
                    <div className="text-xl lg:text-2xl font-medium opacity-80">
                      {t('dna.title')}
                    </div>
                    <motion.div
                      className="w-16 h-1 rounded-full"
                      style={{ backgroundColor: activePoint.accentColor }}
                      initial={{ width: 0 }}
                      animate={{ width: 64 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    />
                  </motion.div>

                  <motion.div 
                    variants={childVariants}
                    style={{ color: activePoint.textColor }} 
                    className="lg:pl-8"
                  >
                    <motion.p 
                      className="text-lg lg:text-xl leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      {activePoint.description}
                    </motion.p>
                  </motion.div>
                </div>

                {/* Progress indicator */}
                <motion.div
                  variants={childVariants}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                  <div className="flex space-x-3">
                    {dnaPoints.map((_, index) => (
                      <motion.div
                        key={index}
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: index === activeIndex ? activePoint.accentColor : activePoint.textColor,
                          opacity: index === activeIndex ? 1 : 0.3
                        }}
                        initial={{ scale: 0.8 }}
                        animate={{ 
                          scale: index === activeIndex ? 1.2 : 0.8,
                          opacity: index === activeIndex ? 1 : 0.3
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
