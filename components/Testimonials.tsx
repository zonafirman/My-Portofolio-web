'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import ScrollFloat from './ScrollFloat'

const testimonialsData = [
  {
    name: 'Anya Sutedja',
    role: 'Project Manager @Digital Agency',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    text: "Bekerja dengan Zona adalah pengalaman yang fantastis. Perhatiannya terhadap detail dan komitmennya terhadap tenggat waktu sangat luar biasa. Dia memberikan produk berkualitas tinggi yang melebihi ekspektasi kami. Sangat direkomendasikan untuk proyek pengembangan web apa pun.",
    linkedinUrl: '#',
  },
  {
    name: 'Budi Santoso',
    role: 'Lead Engineer @Innovate Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    text: "Zona adalah talenta luar biasa dalam pengembangan front-end dan back-end. Dia memiliki pemahaman mendalam tentang teknologi web modern dan kemampuan untuk memecahkan masalah kompleks secara efisien. Aset yang sangat berharga bagi tim mana pun.",
    linkedinUrl: '#',
  },
  {
    name: 'Citra Lestari',
    role: 'Startup Founder',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    text: "Saya bekerja dengan Zona untuk membangun MVP startup saya. Kemampuannya untuk menerjemahkan ide-ide saya menjadi produk yang fungsional dan menarik secara visual sungguh mengesankan. Dia proaktif, komunikatif, dan benar-benar berinvestasi dalam kesuksesan proyek.",
    linkedinUrl: '#',
  },
];

const SLIDE_DURATION = 8000; // 8 detik

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const currentTestimonial = testimonialsData[activeIndex];

  return (
    <section className="font-sans py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          
          {/* Kolom Kiri: Judul */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Sparkles className="text-blue-500 h-5 w-5" />
              <p className="font-semibold tracking-wider bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">TESTIMONIALS</p>
            </div>
             <ScrollFloat
              containerClassName="mb-8"
              textClassName="text-4xl md:text-6xl font-bold mt-4 leading-tight tracking-tighter text-black"
            >
              What others say about me
            </ScrollFloat>
            <p className="mt-6 text-lg text-gray-600">
              I've worked with some amazing people over the years, here is what they have to say about me.
            </p>
          </div>

          {/* Kolom Kanan: Kartu Testimoni */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 relative overflow-hidden">
              {/* Header Testimoni */}
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <Image
                    key={activeIndex} // Ganti key untuk mereset animasi
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    width={64}
                    height={64}
                    className="rounded-full h-16 w-16 object-cover"
                  />
                  <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="4"
                      cx="50"
                      cy="50"
                      r="48"
                      fill="transparent"
                    />
                    <circle
                      key={activeIndex} // Ganti key untuk mereset animasi
                      className="text-gray-900 animate-progress"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="48"
                      fill="transparent"
                      strokeDasharray="301.59"
                      strokeDashoffset="301.59"
                      style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{currentTestimonial.name}</h3>
                  <p className="text-gray-500">{currentTestimonial.role}</p>
                </div>
              </div>
              
              {/* Isi Testimoni */}
              <div key={activeIndex} className="animate-fade-in">
                <p className="mt-6 text-gray-700 leading-relaxed">{currentTestimonial.text}</p>
              </div>
            </div>

            {/* Kontrol Navigasi */}
            <div className="flex justify-between items-center mt-8">
              <a href={currentTestimonial.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium group">
                Check it out on LinkedIn
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-medium">{activeIndex + 1} / {testimonialsData.length}</span>
                <div className="flex items-center gap-2">
                  <button onClick={handlePrev} className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Previous testimonial">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button onClick={handleNext} className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors" aria-label="Next testimonial">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const TestimonialsWithCSS = () => (
  <>
    <Testimonials />
    <style jsx global>{`
      @keyframes progress {
        from {
          stroke-dashoffset: 301.59;
        }
        to {
          stroke-dashoffset: 0;
        }
      }
      .animate-progress {
        animation: progress linear;
      }
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in {
        animation: fade-in 0.5s ease-out;
      }
    `}</style>
  </>
);

export default TestimonialsWithCSS;