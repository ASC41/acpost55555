import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ReactPlayer from "react-player/lazy";

interface VideoAsset {
  videoUrl: string;
  thumbnailUrl: string;
  aspectRatio?: "video" | "square" | "portrait" | "ultrawide" | "wide";
}

interface VideoLightboxMobileProps {
  videos: VideoAsset[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export default function VideoLightboxMobile({ videos, initialIndex, isOpen, onClose, onIndexChange }: VideoLightboxMobileProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

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

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  if (!isOpen || videos.length === 0) return null;

  const currentVideo = videos[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-white hover:text-gray-300 transition-colors"
        data-testid="button-close-lightbox"
      >
        <X size={24} />
      </button>

      {/* Navigation buttons - only show if multiple videos */}
      {videos.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full"
            data-testid="button-previous-video"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full"
            data-testid="button-next-video"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Video counter */}
      {videos.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
          {currentIndex + 1} / {videos.length}
        </div>
      )}

      {/* Single ReactPlayer instance - critical for mobile performance */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-full max-w-7xl h-full flex items-center justify-center">
          <ReactPlayer
            key={currentVideo.videoUrl}
            url={currentVideo.videoUrl}
            playing={false}
            controls={true}
            width="100%"
            height="100%"
            playsinline={true}
            config={{
              vimeo: {
                playerOptions: {
                  autoplay: false,
                  controls: true,
                  responsive: true,
                  dnt: true,
                  background: false,
                  byline: false,
                  portrait: false,
                  title: false,
                  muted: false
                }
              },
              youtube: {
                playerVars: {
                  autoplay: 0,
                  controls: 1,
                  mute: 0,
                  playsinline: 1
                }
              }
            }}
            style={{
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </div>
      </div>
    </div>
  );
}