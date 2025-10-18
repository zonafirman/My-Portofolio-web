'use client';

import React from 'react';
import styles from './WavingHand.module.css';
import { Hand } from 'lucide-react';

const WavingHand = () => {
  return (
    <Hand className={`${styles.wave} h-6 w-6 text-blue-500`} />
  );
};

export default WavingHand;