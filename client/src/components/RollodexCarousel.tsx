import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from "react-player/lazy";
import { getCachedVimeoThumbnail } from "@/lib/vimeo-utils";
import { useIsMobile } from "@/hooks/use-mobile";
import VideoThumbnail from "./VideoThumbnail";

interface RollodexCarouselProps {
  videos: Array<{
    videoUrl: string;
    thumbnailUrl: string;
  }>;
  projectId?: string;
}

export default function RollodexCarousel({ videos, projectId }: RollodexCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToVideo = (index: number) => {
    // Clear existing auto-advance timer
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    setCurrentIndex(index);
  };

  // Auto-advance to next video when current video ends
  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const [thumbnails, setThumbnails] = useState<Map<string, string>>(new Map());

  // Load thumbnails for all videos
  useEffect(() => {
    const loadThumbnails = async () => {
      const newThumbnails = new Map<string, string>();
      
      for (const video of videos) {
        try {
          const thumbnail = await getCachedVimeoThumbnail(video.videoUrl);
          if (thumbnail) {
            newThumbnails.set(video.videoUrl, thumbnail);
          }
        } catch (error) {
          console.warn('Failed to load thumbnail for:', video.videoUrl);
        }
      }
      
      setThumbnails(newThumbnails);
    };

    if (videos.length > 0) {
      loadThumbnails();
    }
  }, [videos]);

  // Mobile: Simple stacked layout
  if (isMobile) {
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-white/90 mb-4">Demo Assets</h4>
        <div className="grid grid-cols-1 gap-4">
          {videos.map((video, index) => (
            <div key={index} className="w-full">
              <VideoThumbnail
                videoUrl={video.videoUrl}
                thumbnailUrl={video.thumbnailUrl}
                aspectRatio="video"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop: Carousel layout
  const isPortrait = projectId === 'fortnite-travis-scott';
  const aspectRatio = isPortrait ? '9/16' : '16/9';
  const maxWidth = isPortrait ? 'max-w-md' : 'max-w-4xl';
  
  return (
    <div className="space-y-8">
      {/* Main Video Display */}
      <div className={`relative bg-black rounded-lg overflow-hidden w-full ${maxWidth} mx-auto`} style={{ aspectRatio }}>
        <ReactPlayer
          url={videos[currentIndex]?.videoUrl}
          playing={isPlaying}
          muted={isMuted}
          loop={false}
          width="100%"
          height="100%"
          volume={isMuted ? 0 : 1}
          config={{
            vimeo: {
              playerOptions: {
                responsive: true,
                dnt: true,
                muted: isMuted,
                autoplay: true,
                loop: false
              }
            }
          }}
          onReady={() => {
            // Ensure video starts playing immediately when ready
            setIsPlaying(true);
          }}
          onEnded={handleVideoEnd}
          style={{ objectFit: 'contain' }}
        />
        
        {/* Audio Toggle Button - Top Right */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-4 right-4 p-3 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-200 backdrop-blur-sm z-10"
          data-testid="button-audio-toggle"
          aria-label={isMuted ? "Turn audio on" : "Turn audio off"}
        >
          {isMuted ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center space-x-6">
        <button
          onClick={prevVideo}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-white/80 font-medium text-sm">
          {currentIndex + 1} of {videos.length}
        </div>

        <button
          onClick={nextVideo}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Video Grid Gallery with Thumbnails */}
      <div className="grid grid-cols-5 gap-3">
        {videos.map((video, index) => (
          <motion.div
            key={index}
            className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
              currentIndex === index 
                ? 'ring-3 ring-cyan-400 scale-105 shadow-lg shadow-cyan-400/30' 
                : 'hover:scale-102 hover:ring-2 hover:ring-white/30'
            }`}
            style={{ aspectRatio }}
            onClick={() => goToVideo(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {thumbnails.get(video.videoUrl) ? (
              <img
                src={thumbnails.get(video.videoUrl)}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
                style={{ pointerEvents: 'none' }}
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Overlay */}
            <div className={`absolute inset-0 transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-cyan-400/20' 
                : 'bg-black/40 hover:bg-black/20'
            }`} />
            
            {/* Play indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              {currentIndex === index ? (
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
              ) : (
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Number */}
            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-bold">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Play/Pause Control */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
          data-testid="button-carousel-playpause"
        >
          {isPlaying ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
              <span>Pause Carousel</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Play Carousel</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}