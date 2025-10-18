import HeroSection from "@/components/HeroSection";
import LogoSection from "@/components/LogoSection";
import AboutSection from "@/components/AboutSection";
import ChromaGrid from "@/components/ChromaGrid";
import Accordions from "@/components/Accordions";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <LogoSection />
      <AboutSection />
      <section id="projects" className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-left text-4xl md:text-5xl font-light text-black mb-4">
            Selected Projects
          </h2>
          <p className="mt-4 mb-12 mx-auto text-left text-lg text-gray-600">
            Here's a curated selection showcasing my expertise and the achieved results.
          </p>
          <ChromaGrid />
        </div>
      </section>
      <Accordions />
      <Testimonials />
      <Footer />
    </main>
  );
}
