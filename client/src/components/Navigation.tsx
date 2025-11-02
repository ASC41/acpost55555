import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { getPortfolioItemsByCategory } from "@/lib/portfolio-data";
import ReactPlayer from "react-player/lazy";

const navItems = [
  { name: "Featured Works", href: "/" },
  { name: "Short Films", href: "/short-films" },
  { name: "VFX", href: "/vfx" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function InteractiveACPost() {
  const [isHovering, setIsHovering] = useState(false);
  const text = "AC POST";

  return (
    <motion.div
      className="relative font-playfair text-2xl font-bold tracking-tight cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
      }}
    >
      <div className="flex">
        {text.split('').map((letter, index) => (
          <motion.span
            key={index}
            className="relative inline-block text-white"
            animate={{
              scaleY: isHovering ? 1.15 : 1,
              scaleX: isHovering ? 1.05 : 1,
            }}
            transition={{ 
              duration: 0.4, 
              delay: isHovering ? index * 0.03 : (text.length - index) * 0.02,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{
              transformOrigin: 'center bottom'
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>

      {/* Subtle underline effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-px bg-white/30"
        initial={{ width: 0, x: "-50%" }}
        animate={{
          width: isHovering ? "100%" : "0%",
        }}
        transition={{ 
          duration: 0.5, 
          delay: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      />
    </motion.div>
  );
}

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [preloadedVideos, setPreloadedVideos] = useState<Set<string>>(new Set());
  const preloadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const preloadVideosForCategory = (category: string) => {
    const items = getPortfolioItemsByCategory(category);
    
    const videoUrls = items.flatMap(item => [
      item.loopVideoUrl,
      ...item.assets.map(asset => asset.videoUrl).filter(Boolean)
    ]).filter(Boolean);
    
    setPreloadedVideos(prev => new Set([...Array.from(prev), ...videoUrls]));
  };

  const handleNavHover = (item: typeof navItems[0]) => {
    if (preloadTimeoutRef.current) {
      clearTimeout(preloadTimeoutRef.current);
    }
    
    preloadTimeoutRef.current = setTimeout(() => {
      let category = "";
      if (item.href === "/" || item.href === "/selected-works") {
        category = "Featured Works";
      } else if (item.href === "/short-films") {
        category = "Short Films";
      }
      
      if (category) {
        preloadVideosForCategory(category);
      }
    }, 200); // Small delay to avoid excessive preloading
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if the page has been scrolled
      if (currentScrollY > 100) {
        setScrolled(true);

        // Hide navbar on scroll down, show on scroll up
        if (currentScrollY > lastScrollY) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else {
        setScrolled(false);
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled ? "bg-gray-900/98 backdrop-blur-xl border-b border-gray-700/30 py-0" : "bg-transparent py-2",
        hidden ? "transform -translate-y-full" : "transform translate-y-0"
      )}
      style={{ boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex justify-between h-16 items-center gap-4">
          <div className="flex items-center flex-shrink-0 mr-8">
            <Link href="/" className="flex items-center">
              <InteractiveACPost />
            </Link>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                onMouseEnter={() => handleNavHover(item)}
                className={cn(
                "transition-all px-2 sm:px-3 py-1 text-xs sm:text-xs md:text-sm font-medium tracking-wider uppercase text-white whitespace-nowrap",
                location === item.href 
                  ? "font-semibold after:content-[''] after:block after:w-1/2 after:h-[1px] after:bg-white after:mt-1 after:mx-auto after:drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                  : "text-white/80 hover:text-white"
              )}
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
              }}
              >
                {item.name}
              </Link>
            ))}
          </div>


        </div>
      </div>

      {/* Hidden preload videos */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
        {Array.from(preloadedVideos).map((videoUrl, index) => (
          <ReactPlayer
            key={`preload-${index}`}
            url={videoUrl}
            playing={true}
            muted={true}
            width="1px"
            height="1px"
            config={{
              vimeo: {
                playerOptions: {
                  muted: true,
                  controls: false,
                  responsive: false,
                  dnt: true,
                  background: true,
                  autopause: false
                }
              },
              youtube: {
                playerVars: {
                  mute: 1,
                  controls: 0,
                  showinfo: 0,
                  rel: 0,
                  modestbranding: 1,
                  cc_load_policy: 0,
                  enablejsapi: 1,
                  autoplay: 1
                }
              }
            }}
          />
        ))}
      </div>
    </nav>
  );
}