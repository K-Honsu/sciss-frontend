import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const StaggeredText = ({ text, once=false, delay=0, callback=()=> {} }) => {
  const [t, _] = useState(text)
  const animate = {
    initial: {
      y: '-100%',
      opacity: 0
    },
    open: (i) => ({
      y: '0%',
      opacity: 1,
      transition: { duration: 0.5, delay: delay + 0.1 * i, ease: [0.33, 1, 0.68, 1] },
    }),
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: once });
  return (
    <motion.span style={{
      display: 'flex',
      gap: '0.5rem',
      overflowY: 'hidden',
      letterSpacing: '-0.25rem',
      paddingRight: '0.5rem',
    }} className='flex gap-2 overflow-y-hidden -tracking-[0.5rem] pr-2' ref={ref} layout>
      {t.map((char, i) => (
        <motion.span
          style={{height: '100%'}}
          className='h-full'
          key={i}
          variants={animate}
          initial="initial"
          animate={isInView ? 'open' : ''}
          custom={i}
          onAnimationComplete={i == t.length - 1  ? () => {callback(ref)} : () => {}}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default StaggeredText;