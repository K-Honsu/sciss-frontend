import { useState } from 'react';
import styles from './styles.module.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const titleAnimation = {
  rest: {
    transition: {
      staggerChildren: 0.01,
    },
  },
  hover: {
    transition: {
      staggerChildren: 0.01,
    },
  },
};

const letterAnimation = {
  rest: {
    y: 0,
    opacity: 1
  },
  hover: {
    y: '-100%',
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: 'tween',
    },
  },
};

const letterAnimationTwo = {
  rest: {
    y: '100%',
    opacity: 0,
  },
  hover: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: 'tween',
    },
  },
};

const AnimatedLink = ({
  title,
  secondTitle,
  isLink,
  href,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return isLink ? (
    <Link
      href={href}
      className={styles.link__container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedWord
        title={title}
        animations={letterAnimation}
        isHovered={isHovered}
      />
      <span className={styles.absolute__container}>
        <AnimatedWord
          title={secondTitle ?? title}
          animations={letterAnimationTwo}
          isHovered={isHovered}
        />
      </span>
    </Link>
  ) : (
    <p
      className={styles.link__container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedWord
        title={title}
        animations={letterAnimation}
        isHovered={isHovered}
      />
      <span onClick={onClick} className={styles.absolute__container}>
        <AnimatedWord
          title={secondTitle ?? title}
          animations={letterAnimationTwo}
          isHovered={isHovered}
        />
      </span>
    </p>
  );
};

export default AnimatedLink;

const AnimatedWord = ({
  title,
  animations,
  isHovered,
}) => (
  <motion.span
    className={styles.word}
    variants={titleAnimation}
    initial="rest"
    animate={isHovered ? 'hover' : 'rest'}
  >
    {title.split('').map((char, i) =>
      char === ' ' ? (
        <span className={styles.span} key={i}>
          &nbsp;
        </span>
      ) : (
        <motion.span className={styles.span} variants={animations} key={i}>
          {char}
        </motion.span>
      )
    )}
  </motion.span>
);
