'use client'
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const cardContainerRef = useRef<HTMLDivElement>(null);
  // State untuk melacak apakah ini render pertama kali
  const isInitialRender = useRef(true);


  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const demo: ChromaItem[] = [
    {
      image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=2070&auto=format&fit=crop',
      title: 'Project Alpha',
      subtitle: 'A web application for task management.',
      handle: 'Next.js, TailwindCSS',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg,#4F46E5,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
      title: 'Project Beta',
      subtitle: 'A mobile app for social networking.',
      handle: 'React Native, Firebase',
      borderColor: '#10B981',
      gradient: 'linear-gradient(210deg,#10B981,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
      title: 'Project Gamma',
      subtitle: 'E-commerce platform with payment integration.',
      handle: 'Shopify, Liquid',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg,#F59E0B,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
      title: 'Project Delta',
      subtitle: 'Data visualization dashboard.',
      handle: 'D3.js, React',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(195deg,#EF4444,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2106&auto=format&fit=crop',
      title: 'Project Epsilon',
      subtitle: 'A blog built with a headless CMS.',
      handle: 'Gatsby, Contentful',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(225deg,#8B5CF6,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop',
      title: 'Project Zeta',
      subtitle: 'CI/CD pipeline automation.',
      handle: 'Jenkins, Docker',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg,#06B6D4,#000)',
      url: 'https://github.com/'
    }
  ];

  const data = items?.length ? items : demo;

  // Dapatkan semua teknologi unik untuk tombol filter
  const allTechs = ['All', ...new Set(data.flatMap(item => item.handle?.split(', ').filter(Boolean) || []))];

  const filteredData = activeFilter === 'All'
    ? data
    : data.filter(item => item.handle?.includes(activeFilter));

  const displayedItems = showAll ? filteredData : filteredData.slice(0, 4);

  // Reset ke 'All' jika filter saat ini tidak memiliki hasil
  useEffect(() => {
    if (filteredData.length === 0 && activeFilter !== 'All') setActiveFilter('All');
  }, [filteredData.length, activeFilter]);

  // GSAP setup
  useEffect(() => {
    const el = rootRef.current;
    gsap.registerPlugin(Flip);
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Tilt 3D mouse move
  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -15;
    const rotateY = (x / rect.width - 0.5) * 15;

    c.style.setProperty('--rx', `${rotateX}deg`);
    c.style.setProperty('--ry', `${rotateY}deg`);
    c.style.setProperty('--mouse-x', `${x}px`);
    c.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCardLeave: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    c.style.setProperty('--rx', '0deg');
    c.style.setProperty('--ry', '0deg');
  };

  const handleViewAllClick = () => setShowAll(true);
  const handleShowLessClick = () => setShowAll(false);

  const handleFilterClick = (tech: string) => {
    if (tech === activeFilter) return;
    setActiveFilter(tech);
    setShowAll(false); // Reset tampilan 'showAll' saat filter berubah
  };

  return (
    <>
      <div
        ref={cardContainerRef}
        className={`relative w-full h-full grid grid-cols-1 md:grid-cols-2 justify-items-center gap-y-8 md:gap-x-4 ${className}`}
        style={
          {
            '--r': `${radius}px`,
            '--x': '50%',
            '--y': '50%',
          } as React.CSSProperties
        }
      >
        {displayedItems.map((c, i) => (
          <article
            key={i}
            tabIndex={0}
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
            onClick={() => handleCardClick(c.url)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(c.url);
              }
            }}
            className={`chroma-card group relative w-full md:h-[450px] md:aspect-auto rounded-[20px] overflow-hidden transition-all duration-300 ease-out cursor-pointer grayscale hover:grayscale-0 hover:shadow-2xl hover:shadow-black/50 hover:z-30 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black focus:ring-white`}
            style={
              {
                '--card-border': c.borderColor || 'transparent',
                background: c.gradient,
                transform: 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale3d(1,1,1)',
                '--spotlight-color': 'rgba(255, 255, 255, 0.4)',
                '--spotlight-color-end': 'rgba(255, 255, 255, 0.0)',
              } as React.CSSProperties
            }
          >
            {/* Animasi border saat hover */}
            <div className="absolute inset-0 rounded-[20px] border-2 border-[--card-border] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>

            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 40%)'
              }}
            />
            <div
              className="relative z-0 w-full h-full"
            >
              <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
            </div>
            <footer className="absolute bottom-0 left-0 right-0 z-20 p-4 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 bg-black/20 backdrop-blur-lg border-t border-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
              <div className="overflow-hidden">
                <h3 className="m-0 text-2xl font-heading font-semibold tracking-tight translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out delay-100">{c.title}</h3>
              </div>
              {c.handle && <span className="text-[0.95rem] opacity-80 text-right translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out delay-150">{c.handle}</span>}
              <div className="overflow-hidden col-span-full">
                <p className="m-0 text-[0.85rem] opacity-85 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out delay-200">{c.subtitle}</p>
              </div>
              {c.location && <span className="text-[0.85rem] opacity-85 text-right translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out delay-250 col-start-2">{c.location}</span>}
            </footer>
          </article>
        ))}
      </div>

      {/* Tombol Filter */}
      <div className="mt-12 flex justify-center flex-wrap gap-3 px-4">
        {allTechs.map(tech => (
          <button
            key={tech}
            onClick={() => handleFilterClick(tech)}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ease-in-out
              ${activeFilter === tech
                ? 'bg-black text-white border-black'
                : 'bg-transparent text-black border-gray-300 hover:bg-gray-100 hover:border-gray-400'
              }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Tombol View All / Show Less */}
      <div className="mt-12 flex justify-center gap-4">
        {!showAll && filteredData.length > 4 && (
          <button
            onClick={handleViewAllClick}
            className="group relative px-6 py-1 border border-black rounded-full text-black font-medium hover:text-white transition-colors duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-black top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0"></span>
            <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-full py-1">View all projects</span>
            <span className="absolute inset-0 z-10 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">Let's Go</span>
          </button>
        )}
        {showAll && filteredData.length > 4 && (
          <button
            onClick={handleShowLessClick}
            className="group relative px-6 py-1 border border-black rounded-full text-black font-medium hover:text-white transition-colors duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-black top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0"></span>
            <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-full py-1">Show Less</span>
            <span className="absolute inset-0 z-10 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">Go Back</span>
          </button>
        )}
      </div>
    </>
  );
};

export default ChromaGrid;
