// components/Footer.tsx
import { Linkedin, Github, Instagram, Dribbble } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 relative pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Container Utama untuk CTA */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-10 sm:p-20 text-center shadow-[0px_8px_40px_rgba(0,0,0,0.05)]">
        
        {/* "Pill" Status */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Available for work</span>
        </div>
        
        {/* Judul Utama */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 tracking-tighter leading-tight max-w-2xl mx-auto">
          Let's create your next big idea.
        </h2>
        
        {/* Tombol Kontak */}
        <a
          href="mailto:example@email.com"
          className="group relative mt-10 inline-block px-8 py-2 border border-black rounded-full text-black font-medium hover:text-white transition-colors duration-500 overflow-hidden"
        >
          {/* Latar belakang yang mengisi */}
          <span className="absolute inset-0 bg-black top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0"></span>
          <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-full py-1">Contact Me</span>
          <span className="absolute inset-0 z-10 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">Let's Talk</span>
        </a>
      </div>

      {/* Baris Footer Bawah */}
      <div className="max-w-6xl mx-auto mt-16 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-sm">
          &copy; 2025 Zona Firman. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-gray-600 transition-colors"><Linkedin size={22} /></a>
          <a href="#" aria-label="Dribbble" className="text-gray-400 hover:text-gray-600 transition-colors"><Dribbble size={22} /></a>
          <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-gray-600 transition-colors"><Github size={22} /></a>
          <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-gray-600 transition-colors"><Instagram size={22} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;