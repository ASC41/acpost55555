import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import VideoThumbnail from './VideoThumbnail';
import VideoLightbox from './VideoLightbox';

interface ProjectAsset {
  videoUrl: string;
  thumbnailUrl: string;
  aspectRatio?: "video" | "square" | "portrait" | "ultrawide" | "wide";
}

interface Gallery3DProps {
  assets: ProjectAsset[];
  projectId: string;
  scrollDirection?: 'vertical' | 'horizontal';
}

export default function Gallery3D({ assets, projectId, scrollDirection = 'vertical' }: Gallery3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoLightboxOpen, setIsVideoLightboxOpen] = useState(false);
  const [videoLightboxIndex, setVideoLightboxIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [accumulatedDelta, setAccumulatedDelta] = useState(0);

  const videoAssets = assets.filter(asset => asset.videoUrl && asset.videoUrl.trim() !== '');

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();

    if (scrollDirection === 'horizontal') {
      // For horizontal scrolling, use deltaY (normal scroll) and make it much more responsive
      const deltaValue = e.deltaY;
      
      setAccumulatedDelta(prev => {
        const newDelta = prev + deltaValue * 0.8; // Increased sensitivity for horizontal
        const threshold = 15; // Much lower threshold for easier triggering

        if (Math.abs(newDelta) >= threshold) {
          const direction = newDelta > 0 ? 1 : -1;
          setCurrentIndex(current => {
            const newIndex = current + direction;
            return Math.max(0, Math.min(videoAssets.length - 1, newIndex));
          });
          return 0;
        }
        return newDelta;
      });
    } else {
      // Original vertical scrolling logic
      setAccumulatedDelta(prev => {
        const newDelta = prev + e.deltaY * 0.3;
        const threshold = 30;

        if (Math.abs(newDelta) >= threshold) {
          const direction = newDelta > 0 ? 1 : -1;
          setCurrentIndex(current => {
            const newIndex = current + direction;
            return Math.max(0, Math.min(videoAssets.length - 1, newIndex));
          });
          return 0;
        }
        return newDelta;
      });
    }
  }, [videoAssets.length, scrollDirection]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const prevKey = scrollDirection === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = scrollDirection === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    
    if (e.key === prevKey) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    } else if (e.key === nextKey) {
      setCurrentIndex(prev => Math.min(videoAssets.length - 1, prev + 1));
    }
  }, [videoAssets.length, scrollDirection]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        container.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleWheel, handleKeyDown]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(scrollDirection === 'horizontal' ? e.pageX : e.pageY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const currentPos = scrollDirection === 'horizontal' ? e.pageX : e.pageY;
    const walk = currentPos - startY;

    if (scrollDirection === 'horizontal') {
      // For horizontal: much smaller threshold and correct direction
      if (Math.abs(walk) > 20) {
        const direction = walk < 0 ? 1 : -1; // Reversed logic for intuitive horizontal dragging
        setCurrentIndex(prev => {
          const newIndex = prev + direction;
          return Math.max(0, Math.min(videoAssets.length - 1, newIndex));
        });
        setStartY(currentPos);
      }
    } else {
      // Original vertical logic
      if (Math.abs(walk * 2) > 50) {
        const direction = walk > 0 ? 1 : -1;
        setCurrentIndex(prev => {
          const newIndex = prev + direction;
          return Math.max(0, Math.min(videoAssets.length - 1, newIndex));
        });
        setStartY(currentPos);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCardClick = (index: number) => {
    if (index === currentIndex) {
      setVideoLightboxIndex(index);
      setIsVideoLightboxOpen(true);
    } else {
      setCurrentIndex(index);
    }
  };

  const getCardStyle = (index: number) => {
    const distance = Math.abs(index - currentIndex);
    const direction = index - currentIndex;

    let scale = 1;
    let opacity = 1;
    let translateX = 0;
    let translateY = 0;
    let translateZ = 0;

    if (scrollDirection === 'horizontal') {
      translateX = direction * 40; // Horizontal spacing
      
      if (distance === 0) {
        scale = 1;
        opacity = 1;
        translateX = 0;
        translateZ = 0;
      } else if (distance === 1) {
        scale = 0.9;
        opacity = 0.85;
        translateX = direction * 50;
        translateZ = -20;
      } else if (distance === 2) {
        scale = 0.8;
        opacity = 0.7;
        translateX = direction * 75;
        translateZ = -40;
      } else if (distance === 3) {
        scale = 0.7;
        opacity = 0.5;
        translateX = direction * 95;
        translateZ = -60;
      } else {
        scale = 0.6;
        opacity = 0.3;
        translateX = direction * 110;
        translateZ = -80;
      }

      // Clamp translateX to prevent viewport overflow
      const maxTranslate = 120;
      translateX = Math.max(-maxTranslate, Math.min(maxTranslate, translateX));

      return {
        transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
        opacity,
        zIndex: 100 - distance,
        willChange: 'transform, opacity',
      };
    } else {
      // Vertical scrolling (original behavior)
      translateY = direction * 40;
      
      if (distance === 0) {
        scale = 1;
        opacity = 1;
        translateY = 0;
        translateZ = 0;
      } else if (distance === 1) {
        scale = 0.9;
        opacity = 0.85;
        translateY = direction * 50;
        translateZ = -20;
      } else if (distance === 2) {
        scale = 0.8;
        opacity = 0.7;
        translateY = direction * 75;
        translateZ = -40;
      } else if (distance === 3) {
        scale = 0.7;
        opacity = 0.5;
        translateY = direction * 95;
        translateZ = -60;
      } else {
        scale = 0.6;
        opacity = 0.3;
        translateY = direction * 110;
        translateZ = -80;
      }

      // Clamp translateY to prevent viewport overflow
      const maxTranslate = 120;
      translateY = Math.max(-maxTranslate, Math.min(maxTranslate, translateY));

      return {
        transform: `translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
        opacity,
        zIndex: 100 - distance,
        willChange: 'transform, opacity',
      };
    }
  };

  if (videoAssets.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold text-white">Videos</h4>
        <div className="text-sm text-white/60">
          Scroll to navigate
        </div>
      </div>

      <div className="relative w-full h-[750px] bg-gradient-to-b from-transparent via-black/5 to-transparent rounded-xl" style={{ overflow: 'hidden' }}>
        <div 
          ref={containerRef}
          className="gallery-3d-container"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            height: '100%',
            width: '100%',
            position: 'relative',
            cursor: isDragging ? 'grabbing' : 'grab',
            overflow: 'hidden'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="gallery-3d-track"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '800px',
              height: '500px',
              transformStyle: 'preserve-3d',
              transform: 'translate(-50%, -50%)',
              maxWidth: '95vw',
              maxHeight: '70vh'
            }}
          >
            {videoAssets.map((asset, index) => (
              <div
                key={`gallery-card-${index}`}
                className="gallery-3d-card"
                style={{
                  position: 'absolute',
                  width: '720px',
                  height: '405px',
                  maxWidth: '90vw',
                  maxHeight: '65vh',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transformOrigin: 'center center',
                  backgroundColor: '#1f2937',
                  border: index === currentIndex ? '2px solid #60a5fa' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: index === currentIndex 
                    ? '0 15px 30px rgba(96, 165, 250, 0.25), 0 0 0 1px rgba(96, 165, 250, 0.2)' 
                    : '0 6px 12px rgba(0,0,0,0.3)',
                  contain: 'strict',
                  clipPath: 'inset(0)',
                  ...getCardStyle(index),
                }}
                onClick={() => handleCardClick(index)}
              >
                <div className="relative w-full h-full">
                  <VideoThumbnail
                    videoUrl={asset.videoUrl}
                    thumbnailUrl={asset.thumbnailUrl}
                    aspectRatio={asset.aspectRatio || "video"}
                    onExpand={() => handleCardClick(index)}
                  />

                  {index === currentIndex && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 bg-black/20">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )}

                  <div className={`absolute top-3 right-3 bg-black/70 text-white rounded-full ${
                    index === currentIndex ? 'text-sm px-3 py-1' : 'text-xs px-2 py-1'
                  }`}>
                    {index + 1}
                  </div>

                  {index === currentIndex && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-500/90 text-white text-sm px-4 py-2 rounded-full font-medium shadow-lg backdrop-blur-sm">
                      ▶ Click to Play
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {scrollDirection === 'horizontal' ? (
          <>
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronUp size={20} className="-rotate-90" />
            </button>

            <button
              onClick={() => setCurrentIndex(Math.min(videoAssets.length - 1, currentIndex + 1))}
              disabled={currentIndex === videoAssets.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronUp size={20} className="rotate-90" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="absolute left-1/2 -translate-x-1/2 top-4 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronUp size={20} />
            </button>

            <button
              onClick={() => setCurrentIndex(Math.min(videoAssets.length - 1, currentIndex + 1))}
              disabled={currentIndex === videoAssets.length - 1}
              className="absolute left-1/2 -translate-x-1/2 bottom-4 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronDown size={20} />
            </button>
          </>
        )}

        {/* Fixed Counter - Positioned just below the video */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-50">
          <div className="text-white/80 text-sm bg-black/70 rounded-full px-3 py-1 backdrop-blur-sm">
            {currentIndex + 1} of {videoAssets.length}
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="text-white/50 text-sm flex items-center justify-center space-x-2">
          {scrollDirection === 'horizontal' ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16l13-8z" />
              </svg>
              <span>Scroll horizontally to explore {videoAssets.length} videos</span>
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16l13-8z" />
              </svg>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16l13-8z" />
              </svg>
              <span>Scroll to explore {videoAssets.length} videos</span>
              <svg className="w-4 h-4 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16l13-8z" />
              </svg>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        {videoAssets.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      <VideoLightbox
        videos={videoAssets}
        initialIndex={videoLightboxIndex}
        isOpen={isVideoLightboxOpen}
        onClose={() => setIsVideoLightboxOpen(false)}
      />
    </div>
  );
}