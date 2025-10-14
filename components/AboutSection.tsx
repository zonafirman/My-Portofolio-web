import { Sparkles } from 'lucide-react';
import ScrambledText from './ScrambledText';
import { satoshi } from '../app/fonts'; // Menggunakan path yang benar ke file fonts.ts

const AboutSection = () => {
  const aboutText =
    'With over five years of dedicated experience, I specialize in crafting high-performance, visually stunning web applications. My expertise lies in transforming complex challenges into elegant, user-centric digital solutions, driving innovation and delivering exceptional results.';

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto flex flex-col items-center justify-center px-6 lg:px-8">
        <div className="mb-2 flex items-center gap-x-3 rounded-lg bg-transparent px-4 py-2 font-medium">
          <Sparkles className="h-6 w-6 text-blue-500" />
          <h2 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-lg uppercase tracking-wider text-transparent">
            About Me
          </h2>
        </div>
        <ScrambledText
          className={`!m-0 mt-4 max-w-2xl text-center text-black ${satoshi.className}`}
        >
          {aboutText}
        </ScrambledText>
      </div>
    </section>
  );
};

export default AboutSection;