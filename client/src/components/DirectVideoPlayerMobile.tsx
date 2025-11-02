import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface VideoAsset {
  videoUrl: string;
  thumbnailUrl: string;
  aspectRatio?: "video" | "square" | "portrait" | "ultrawide" | "wide";
}

interface DirectVideoPlayerMobileProps {
  videos: VideoAsset[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export default function DirectVideoPlayerMobile({ 
  videos, 
  initialIndex, 
  isOpen, 
  onClose, 
  onIndexChange 
}: DirectVideoPlayerMobileProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

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

  if (!isOpen || videos.length === 0) return null;

  const currentVideo = videos[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
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

      {/* Direct video link - opens in new tab */}
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <div className="text-center text-white mb-8">
          <h3 className="text-xl font-semibold mb-2">Watch Video</h3>
          <p className="text-white/70 mb-6">Tap below to open the video in a new tab</p>
          
          <a
            href={currentVideo.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Open Video
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        
        {/* Thumbnail preview */}
        {currentVideo.thumbnailUrl && (
          <div className="w-full max-w-md aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src={currentVideo.thumbnailUrl} 
              alt="Video preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}