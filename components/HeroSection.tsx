'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import BlurText from './BlurText';
import SocialLinks from './SosialLink';
import WavingHand from '@/components/WavingHand';

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const containerVariants = {
    animate: { transition: { staggerChildren: 0.3 } },
  };

  return (
    <section className=" min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 lg:px-8 py-24">
        
        {/* Baris Atas: Sapaan */}
        <div className="flex items-center gap-2 text-lg text-black mb-4">
          <WavingHand />
          <span>Hey! It's me Zona,</span>
        </div>

        {/* Judul Utama */}
        <h1 className="font-clash-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-black tracking-tighter leading-none">
          <BlurText
            className="inline"
            text="Creating"
            animateBy="words"
          />{' '}
          <span className="text-blue-500 ">
            <BlurText className="inline" text="memorable" animateBy="words" />{' '}
            <BlurText className="inline" text="digital" animateBy="words" />
          </span>
          <br />
          <span className="text-purple-500 bg-clip-text ">
            <BlurText className="inline" text="experiences" animateBy="words" />
          </span>{' '}
          <BlurText className="inline" text="that delight" animateBy="words" />{' '}
          <br />
          <BlurText className="inline" text="and deliver." animateBy="words" />
        </h1>

        {/* Baris Bawah: Deskripsi */}
        <div className="mt-20">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            className="flex items-center justify-between gap-8"
          >
            <motion.hr
              variants={{
                initial: { scaleX: 0, originX: 0 },
                animate: { scaleX: 1, transition: { duration: 0.8, ease: 'easeOut' } },
              }}
              className="w-full max-w-xl border-gray-400"
            />
            <motion.p
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="max-w-xl text-sm text-black leading-relaxed text-left"
            >
              I work with brands globally to build pixel-perfect, engaging, and accessible digital experiences that drive results and achieve business goals.
            </motion.p>
          </motion.div>
          {/* Tombol Aksi & Social Links */}
          <div className="mt-8 flex flex-col-reverse items-start gap-8 md:flex-row md:items-center md:justify-between">
            <SocialLinks/>
            <button className="group relative px-6 py-2 border border-black rounded-full text-black font-medium hover:text-white transition-colors duration-500 overflow-hidden">
              {/* Latar belakang yang mengisi */}
              <span className="absolute inset-0 bg-black top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0"></span>
              <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-full py-1">Know me better</span>
              <span className="absolute inset-0 z-10 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">About me</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;