import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface VideoAsset {
  videoUrl: string;
  thumbnailUrl: string;
  aspectRatio?: "video" | "square" | "portrait" | "ultrawide" | "wide";
}

interface SimpleVideoPlayerMobileProps {
  videos: VideoAsset[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

function getEmbedUrl(url: string): string {
  // Handle direct MP4 files (Cloudinary, etc.)
  if (url.includes('.mp4') || url.includes('cloudinary.com')) {
    return url; // Return direct URL for video element
  }
  
  // Convert Vimeo URLs to embed format - handle private videos with keys
  if (url.includes('vimeo.com')) {
    // Extract video ID and private key from various Vimeo URL formats
    // Handles: vimeo.com/ID/KEY, vimeo.com/ID/KEY?share=copy, vimeo.com/ID?h=KEY
    let videoId = '';
    let privateKey = '';
    
    // Check for ?h= format first (standard private video format)
    const hashMatch = url.match(/vimeo\.com\/(\d+).*[\?&]h=([a-zA-Z0-9]+)/);
    if (hashMatch) {
      videoId = hashMatch[1];
      privateKey = hashMatch[2];
    } else {
      // Check for /KEY format (alternative private video format)
      const pathMatch = url.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/);
      if (pathMatch) {
        videoId = pathMatch[1];
        privateKey = pathMatch[2] || '';
      }
    }
    
    if (videoId) {
      // Build embed URL with proper hash parameter for private videos
      const embedUrl = `https://player.vimeo.com/video/${videoId}`;
      let finalUrl;
      
      if (privateKey) {
        // Private video: use ?h= parameter format (required for mobile)
        finalUrl = `${embedUrl}?h=${privateKey}&autoplay=0&muted=0&playsinline=1&title=0&byline=0&portrait=0&dnt=1`;
      } else {
        // Public video: standard parameters
        finalUrl = `${embedUrl}?autoplay=0&muted=0&playsinline=1&title=0&byline=0&portrait=0&dnt=1`;
      }
      
      return finalUrl;
    }
  }
  
  // Convert YouTube URLs to embed format - support all patterns
  if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('m.youtube.com')) {
    let videoId = '';
    
    // youtube.com/watch?v=ID
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    }
    // youtu.be/ID
    else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    // youtube.com/shorts/ID
    else if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('shorts/')[1]?.split('?')[0];
    }
    // m.youtube.com/watch?v=ID
    else if (url.includes('m.youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    }
    
    if (videoId) {
      return `https://www.youtube-nocookie.com/embed/${videoId}?playsinline=1&controls=1&rel=0&modestbranding=1&mute=0`;
    }
  }
  
  // Return original URL if no conversion needed
  return url;
}

export default function SimpleVideoPlayerMobile({ 
  videos, 
  initialIndex, 
  isOpen, 
  onClose, 
  onIndexChange 
}: SimpleVideoPlayerMobileProps) {
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

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
  };

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
  const embedUrl = getEmbedUrl(currentVideo.videoUrl);
  const isDirectVideo = embedUrl.includes('.mp4') || embedUrl.includes('cloudinary.com');

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

      {/* Native iframe video player - much more reliable on mobile */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-full max-w-7xl aspect-video max-h-[80vh] flex items-center justify-center">
          {isDirectVideo ? (
            <video
              key={currentVideo.videoUrl}
              src={embedUrl}
              controls
              playsInline
              className="w-full h-full rounded-lg"
              style={{ backgroundColor: '#000' }}
            />
          ) : (
            <iframe
              key={currentVideo.videoUrl}
              src={embedUrl}
              title="Video Player"
              className="w-full h-full rounded-lg"
              style={{ border: 'none' }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; gyroscope; web-share"
              allowFullScreen
              {...({ webkitallowfullscreen: "true", mozallowfullscreen: "true" } as any)}
              referrerPolicy="strict-origin"
            />
          )}
        </div>
      </div>
    </div>
  );
}