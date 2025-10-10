'use client'
import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrambleTextPlugin, ScrollTrigger);

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const splitRef = useRef<SplitText | null>(null);

  // Memoize handleMove with useCallback for performance
  const handleMove = useCallback((e: PointerEvent) => {
    if (!splitRef.current) return;

    splitRef.current.chars.forEach(el => {
      const c = el as HTMLElement;
      const { left, top, width, height } = c.getBoundingClientRect();
      const dx = e.clientX - (left + width / 2);
      const dy = e.clientY - (top + height / 2);
      const dist = Math.hypot(dx, dy);

      // Animate if pointer is within radius and the element is not already animating
      if (dist < radius && !gsap.isTweening(c)) {
        const originalContent = c.dataset.content || '';
        
        // Scramble animation
        gsap.to(c, {
          duration: duration,
          scrambleText: {
            text: originalContent,
            chars: scrambleChars,
            speed: speed,
            revealDelay: duration / 2, // Start revealing original char halfway through
            newClass: "text-purple-600" // Optional: highlight scrambling text
          },
          onComplete: () => {
            // Ensure it reverts to the final state and class
            gsap.set(c, { scrambleText: { text: originalContent, chars: " " }, className: "-=text-purple-600" });
          },
          ease: 'power3.out'
        });
      }
    });
  }, [radius, duration, speed, scrambleChars]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!rootRef.current) return;

      const p = rootRef.current.querySelector('p');
      if (!p) return;

      // --- Initial Split and Setup ---
      const split = SplitText.create(p, {
      type: 'chars',
        charsClass: 'inline-block'
      });
      splitRef.current = split;

      // Set fixed width for each character to prevent layout shift
      split.chars.forEach((char) => {
        const charEl = char as HTMLElement;
        gsap.set(char, {
          attr: { 'data-content': char.innerHTML },
          color: '#9ca3af', // Initial gray color (Tailwind's gray-400)
          width: charEl.getBoundingClientRect().width, // Set fixed width
        });
      });

      // --- Scroll-triggered Animation ---
      gsap.to(split.chars, {
        color: 'black',
        duration: 0.5,
        stagger: 0.02,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%', // Animation starts when 80% of the element is in view
          end: 'bottom 60%',
          scrub: true, // Smoothly animates with scroll
          once: true, // Animation runs only once
        },
      });

      // --- Pointer Move Event Listener ---
      const el = rootRef.current;
      el.addEventListener('pointermove', handleMove);

      return () => {
        el.removeEventListener('pointermove', handleMove);
        if (splitRef.current) {
          splitRef.current.revert();
          splitRef.current = null;
        }
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }, rootRef);

    return () => ctx.revert();
  }, [handleMove]);

  return (
    <div
      ref={rootRef}
      className={`m-[7vw] max-w-[800px] font-mono text-[clamp(14px,4vw,32px)] ${className}`}
      style={style}
    >
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;
