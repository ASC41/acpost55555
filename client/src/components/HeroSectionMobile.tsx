import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import ScrollingText from "./ScrollingText";

interface HeroSectionMobileProps {
  onFilterClick?: (filter: string) => void;
  activeFilter?: string | null;
}

export default function HeroSectionMobile({ onFilterClick, activeFilter }: HeroSectionMobileProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Start video loading immediately for mobile
    setShowVideo(true);
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative h-[60vh] w-full overflow-hidden" 
        id="hero-section"
      >
        {/* Hero Poster Image - Shows while video loads */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url("https://i.vimeocdn.com/video/1912113135-d1f28f27b93e1c2d89d6ad09b32c9f2e8f9e1be1f1c4f7b2b1c4f7b2b1c4f7b2?mw=1920&mh=1080&q=70")',
            opacity: isVideoLoaded ? 0 : 1,
          }}
        />

        {/* Hero Video - Mobile optimized */}
        {showVideo && (
          <ReactPlayer
            ref={playerRef}
            url="https://vimeo.com/1087235904/3e675984bc"
            playing
            muted
            loop
            playsinline
            width="100%"
            height="60vh"
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
                  quality: 'auto',
                  autopause: false,
                  dnt: true,
                  preload: 'auto'
                }
              }
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '60vh',
              transform: 'translate(-50%, -50%)',
              objectFit: 'cover',
              opacity: isVideoLoaded ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
          />
        )}

        <div className="absolute inset-0 z-20 flex items-end justify-center px-4 pb-16">
          <div>
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
          </div>
        </div>
      </section>

      {/* Featured Works Title Section */}
      <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            <span className="block">Featured Works</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto font-light text-gray-300 mb-8">
            Precision in post. Projects that move, persuade, and deliver.
          </p>

          {/* Simplified Scrolling Text - reduced animations for mobile */}
          <div className="my-16">
            <ScrollingText onFilterClick={onFilterClick} activeFilter={activeFilter} />
          </div>

        </div>
      </section>
    </>
  );
}