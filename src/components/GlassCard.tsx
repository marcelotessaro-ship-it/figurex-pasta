import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hover' | 'subtle' | 'gradient';
  glowColor?: 'magenta' | 'yellow' | 'green' | 'none';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  glowColor = 'none',
  ...props
}) => {
  let baseClass = 'rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 relative overflow-hidden ';

  if (variant === 'default') {
    baseClass += 'bg-slate-900/50 border border-white/15 shadow-xl shadow-black/40 ';
  } else if (variant === 'hover') {
    baseClass +=
      'bg-slate-900/40 hover:bg-slate-900/65 border border-white/15 hover:border-white/30 shadow-xl hover:-translate-y-1.5 shadow-black/40 hover:shadow-2xl ';
  } else if (variant === 'subtle') {
    baseClass += 'bg-white/5 border border-white/10 shadow-lg ';
  } else if (variant === 'gradient') {
    baseClass +=
      'bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-950/90 border border-white/20 shadow-2xl ';
  }

  // Glow accents
  let glowStyle = '';
  if (glowColor === 'magenta') {
    glowStyle = 'before:absolute before:-top-12 before:-right-12 before:w-32 before:h-32 before:bg-rose-500/20 before:blur-2xl before:pointer-events-none ';
  } else if (glowColor === 'yellow') {
    glowStyle = 'before:absolute before:-top-12 before:-right-12 before:w-32 before:h-32 before:bg-amber-400/20 before:blur-2xl before:pointer-events-none ';
  } else if (glowColor === 'green') {
    glowStyle = 'before:absolute before:-top-12 before:-right-12 before:w-32 before:h-32 before:bg-emerald-500/20 before:blur-2xl before:pointer-events-none ';
  }

  return (
    <motion.div className={`${baseClass} ${glowStyle} ${className}`} {...props}>
      {/* Top subtle inner border highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};
