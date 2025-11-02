import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ReactPlayer from "react-player/lazy";

interface VideoAsset {
  videoUrl: string;
  thumbnailUrl: string;
  aspectRatio?: "video" | "square" | "portrait" | "ultrawide" | "wide";
}

interface VideoLightboxProps {
  videos: VideoAsset[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export default function VideoLightbox({ videos, initialIndex, isOpen, onClose, onIndexChange }: VideoLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [wheelThrottle, setWheelThrottle] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Call onIndexChange whenever currentIndex changes
  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex);
    }
  }, [currentIndex, onIndexChange]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
  }, [videos.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
  }, [videos.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (videos.length <= 1 || wheelThrottle) return;
      
      // Throttle wheel events to prevent rapid navigation
      setWheelThrottle(true);
      setTimeout(() => setWheelThrottle(false), 150);
      
      if (e.deltaX > 0 || e.deltaY > 0) {
        handleNext();
      } else if (e.deltaX < 0 || e.deltaY < 0) {
        handlePrevious();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe && videos.length > 1) {
        handleNext();
      }
      if (isRightSwipe && videos.length > 1) {
        handlePrevious();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, handlePrevious, handleNext, videos.length]);

  if (!isOpen || videos.length === 0) return null;

  const currentVideo = videos[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: 'black'
      }}
      onClick={onClose}
    >
      <div 
        className="relative w-full h-full max-w-7xl max-h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 10000 }}
        >
          <X size={24} />
        </button>

        {/* Navigation Buttons */}
        {videos.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-4 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
              style={{ position: 'fixed', left: '24px', zIndex: 10000 }}
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-4 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
              style={{ position: 'fixed', right: '24px', zIndex: 10000 }}
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        {/* Video Player Container */}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div 
            className="relative bg-black rounded-lg overflow-hidden shadow-2xl"
            style={(() => {
              const currentVideo = videos[currentIndex];
              const aspectRatio = currentVideo?.aspectRatio;
              
              // Calculate optimal dimensions based on aspect ratio
              const viewportWidth = window.innerWidth;
              const viewportHeight = window.innerHeight;
              const containerPadding = 64; // 32px on each side
              const maxWidth = viewportWidth - containerPadding;
              const maxHeight = viewportHeight - containerPadding;
              
              let width, height;
              
              if (aspectRatio === 'portrait') {
                // 9:16 aspect ratio - prioritize showing full height
                const targetAspectRatio = 9 / 16;
                height = Math.min(maxHeight, 900);
                width = height * targetAspectRatio;
                
                // If width exceeds max, scale down proportionally
                if (width > maxWidth) {
                  width = maxWidth;
                  height = width / targetAspectRatio;
                }
              } else if (aspectRatio === 'square') {
                // 4:5 aspect ratio - balance width and height
                const targetAspectRatio = 4 / 5;
                // Start with height-based calculation
                height = Math.min(maxHeight, 720);
                width = height * targetAspectRatio;
                
                // If width exceeds max, scale down proportionally
                if (width > maxWidth) {
                  width = maxWidth;
                  height = width / targetAspectRatio;
                }
              } else {
                // Default for landscape videos
                width = Math.min(maxWidth, 1400);
                height = Math.min(maxHeight, 900);
              }
              
              return {
                width: `${width}px`,
                height: `${height}px`,
              };
            })()}
          >
            <ReactPlayer
              key={`lightbox-${currentVideo.videoUrl}-${currentIndex}`}
              url={currentVideo.videoUrl}
              playing={true}
              controls={true}
              width="100%"
              height="100%"
              light={false}
              config={{
                vimeo: {
                  playerOptions: {
                    autoplay: true,
                    controls: true,
                    responsive: true,
                    dnt: true,
                    background: false,
                    byline: false,
                    portrait: false,
                    title: false,
                    transparent: false,
                    muted: false,
                    sidedock: false, // Hide social sharing elements and related content
                    pip: false // Disable picture-in-picture which can trigger end screen elements
                  }
                },
                youtube: {
                  playerVars: {
                    autoplay: 1,
                    controls: 1,
                    mute: 0
                  }
                }
              }}
              onError={() => {}}
              onReady={() => {}}
              onStart={() => {}}
              onPlay={() => {
                setIsPlaying(true);
                setHasStartedPlaying(true);
              }}
              onPause={() => setIsPlaying(false)}
              style={{
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            />


          </div>
        </div>

        {/* Video Counter */}
        {videos.length > 1 && (
          <div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
            style={{ position: 'fixed', bottom: '32px', zIndex: 10000 }}
          >
            {currentIndex + 1} of {videos.length}
          </div>
        )}

        {/* Navigation Dots */}
        {videos.length > 1 && videos.length <= 10 && (
          <div 
            className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2"
            style={{ position: 'fixed', bottom: '80px', zIndex: 10000 }}
          >
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}