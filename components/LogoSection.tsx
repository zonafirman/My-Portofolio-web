import LogoLoop from './LogoLoop';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiVercel,
} from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiFramer />, title: 'Framer Motion', href: 'https://www.framer.com/motion/' },
  { node: <SiVercel />, title: 'Vercel', href: 'https://vercel.com' },
];

const LogoSection = () => {
  return (
    <section className="pt-0 pb-8 sm:pb-12 lg:pb-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="border-y border-gray-200 py-8 text-4xl text-black">
          <LogoLoop
            logos={techLogos}
            speed={50}
            direction="left"
            logoHeight={56}
            gap={60}
          />
        </div>
      </div>
    </section>
  );
};

export default LogoSection;