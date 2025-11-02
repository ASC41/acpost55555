import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ReactPlayer from "react-player/lazy";
import ClientLogos from "./ClientLogos";
import ScrollingText from "./ScrollingText";

interface HeroSectionProps {
  onFilterClick?: (filter: string) => void;
  activeFilter?: string | null;
}

export default function HeroSection({ onFilterClick, activeFilter }: HeroSectionProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax effect using framer-motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Transform values for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Start video loading immediately for fastest possible load time
    setShowVideo(true);
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative h-[calc(100vh-80px)] sm:h-[60vh] md:h-[70vh] lg:h-[calc(100vh-80px)] w-full overflow-hidden" 
        id="hero-section"
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          {/* Hero Poster Image - Shows immediately */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url("https://i.vimeocdn.com/video/1912113135-d1f28f27b93e1c2d89d6ad09b32c9f2e8f9e1be1f1c4f7b2b1c4f7b2b1c4f7b2?mw=1920&mh=1080&q=70")',
              opacity: isVideoLoaded ? 0 : 1,
            }}
          />

          {/* Video Player - Priority loaded for fastest experience */}
          {showVideo && (
            <ReactPlayer
              ref={playerRef}
              url="https://vimeo.com/1087235904/3e675984bc"
              playing
              muted
              loop
              playsinline
              width="100vw"
              height="100vh"
              preload="auto"
              onReady={() => setIsVideoLoaded(true)}
              onError={(error) => {
                setIsVideoLoaded(true);
              }}
              config={{
                vimeo: {
                  playerOptions: {
                    loop: true,
                    muted: true,
                    controls: false,
                    background: true,
                    byline: false,
                    title: false,
                    portrait: false,
                    quality: 'auto', // Use highest available quality
                    autopause: false,
                    dnt: true, // Do not track for better performance
                    preload: 'auto' // Start loading immediately
                  }
                }
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100vw',
                height: 'calc(100vh - 80px)',
                transform: 'translate(-50%, -50%)',
                objectFit: 'cover',
                opacity: isVideoLoaded ? 1 : 0,
                transition: 'opacity 1s ease-in-out'
              }}
            />
          )}
      </motion.div>

      <motion.div 
        className="absolute inset-0 z-20 flex items-end justify-center px-4 pb-16"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        >
          <a 
            href="#portfolio" 
            className="group inline-flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="mr-2 text-lg group-hover:tracking-wide transition-all duration-300">Explore Portfolio</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </motion.div>
      </motion.div>
      </section>

      {/* Featured Works Title Section */}
      <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="text-center max-w-3xl mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-7xl font-bold tracking-tight mb-6 text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="block">Featured Works</span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl max-w-2xl mx-auto font-light text-gray-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Precision in post. Projects that move, persuade, and deliver.
          </motion.p>

          {/* Scrolling Text */}
          <motion.div
            className="my-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ScrollingText onFilterClick={onFilterClick} activeFilter={activeFilter} />
          </motion.div>

          {/* Integrated Client Logos */}
          <motion.div
            className="mt-16 pt-8 border-t border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-400 mb-6 tracking-wide">
              BRANDS WE'VE PROUDLY SERVED
            </p>
            <ClientLogos />
          </motion.div>
        </div>
      </section>
    </>
  );
}