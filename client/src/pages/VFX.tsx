import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Player from "@vimeo/player";
import { motion } from "framer-motion";
import { X, Play } from "lucide-react";
import { vfxReelData, VFXSegment } from "@/lib/portfolio-data";

export default function VFX() {
  const [currentSegment, setCurrentSegment] = useState<VFXSegment | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [expandedSegmentId, setExpandedSegmentId] = useState<string | null>(null);
  const [manualClick, setManualClick] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [manualScrollOffset, setManualScrollOffset] = useState(0);
  const [useManualScroll, setUseManualScroll] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const playerRef = useRef<Player | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentSegmentRef = useRef<VFXSegment | null>(null);
  const previousTimeRef = useRef<number>(0);
  const playTriggeredGalleryRef = useRef<boolean>(false);
  const isInternalPlayRef = useRef<boolean>(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Calculate vertical offset to scroll current segment to top
  const autoScrollOffset = useMemo(() => {
    if (!currentSegment) {
      return 0;
    }
    
    const currentIndex = vfxReelData.segments.findIndex(seg => seg.id === currentSegment.id);
    if (currentIndex === -1) {
      return 0;
    }
    
    // Each item is approximately 76px tall (including gap)
    // Scroll up by the index * item height to bring current item to top
    return -(currentIndex * 76);
  }, [currentSegment]);

  // Use manual scroll offset when user is scrolling, otherwise use auto-scroll
  const scrollOffset = useManualScroll ? manualScrollOffset : autoScrollOffset;

  // Duplicate segments for circular queue effect (only during auto-scroll)
  const displaySegments = useMemo(() => {
    // Show segments twice to create circular effect during playback
    // But only show once during manual scroll
    if (useManualScroll) {
      return vfxReelData.segments;
    }
    return [...vfxReelData.segments, ...vfxReelData.segments];
  }, [useManualScroll]);

  // Set page title
  useEffect(() => {
    document.title = "VFX Reel | AC POST Portfolio";
  }, []);

  // Shared timeupdate handler for both views - memoized for stable reference
  const handleTimeUpdate = useCallback((data: { seconds: number }) => {
    setCurrentTime(data.seconds);
    
    // Detect video replay: if time jumps back significantly (from >10s to <5s)
    if (data.seconds < 5 && previousTimeRef.current > 10) {
      // Reset to first segment
      const firstSegment = vfxReelData.segments[0];
      currentSegmentRef.current = firstSegment;
      setCurrentSegment(firstSegment);
    }
    
    previousTimeRef.current = data.seconds;
    
    // Find which segment is currently playing
    const active = vfxReelData.segments.find(
      segment => data.seconds >= segment.startTime && data.seconds < segment.endTime
    );
    
    if (active && active.id !== currentSegmentRef.current?.id) {
      currentSegmentRef.current = active;
      setCurrentSegment(active);
      // When segment changes during playback, switch back to auto-scroll
      setUseManualScroll(false);
    }
  }, []);

  // Handle mouse wheel scrolling on timeline
  useEffect(() => {
    const timelineElement = timelineRef.current;
    if (!timelineElement) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Enable manual scroll mode
      setUseManualScroll(true);
      
      // Update manual scroll offset based on wheel delta
      setManualScrollOffset(prev => {
        const newOffset = prev - e.deltaY * 0.5;
        // Clamp to bounds: scroll from 0 (top) to the end of the list
        const maxScroll = 0;
        // Calculate minimum based on number of segments and container height
        // Container is 456px, each item is ~76px, show ~6 items at once
        const visibleItems = Math.floor(456 / 76);
        const totalItems = vfxReelData.segments.length;
        const scrollableItems = Math.max(0, totalItems - visibleItems);
        const minScroll = -(scrollableItems * 76);
        return Math.max(minScroll, Math.min(maxScroll, newOffset));
      });
    };

    timelineElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      timelineElement.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Initialize Vimeo player - runs when iframe mounts/changes
  useEffect(() => {
    if (!iframeRef.current) return;

    // Destroy existing player when iframe changes
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    // Create new player instance for current iframe
    playerRef.current = new Player(iframeRef.current);

    // Attach timeupdate listener
    playerRef.current.on('timeupdate', handleTimeUpdate);

    // Restore playback position if available, or auto-play if opening gallery from play button
    if (previousTimeRef.current > 0) {
      playerRef.current.setCurrentTime(previousTimeRef.current).then(() => {
        if (galleryOpen) {
          // In gallery view, auto-play after seeking
          playerRef.current?.play();
        } else {
          // In normal view, play briefly then pause to load the frame
          isInternalPlayRef.current = true;
          playerRef.current?.play().then(() => {
            setTimeout(() => {
              playerRef.current?.pause();
              isInternalPlayRef.current = false;
            }, 100);
          });
        }
      });
    } else if (galleryOpen) {
      // If opening gallery from play button (no previous time), start playing from beginning
      playerRef.current.play();
    }

    // Attach play listener only in normal view (after initial setup)
    if (!galleryOpen && hasStartedPlaying) {
      playerRef.current.on('play', () => {
        // Only open gallery if this is a user-initiated play, not internal
        if (!isInternalPlayRef.current) {
          setGalleryOpen(true);
        }
      });
    }

    return () => {
      // Cleanup on unmount or before re-initialization
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [galleryOpen, handleTimeUpdate, hasStartedPlaying]);

  const handleSegmentClick = (segment: VFXSegment) => {
    setManualClick(true);
    if (playerRef.current) {
      playerRef.current.setCurrentTime(segment.startTime);
    }
    setExpandedSegmentId(expandedSegmentId === segment.id ? null : segment.id);
    // Reset manual click flag after animation would have completed
    setTimeout(() => setManualClick(false), 100);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCloseGallery = async () => {
    if (playerRef.current) {
      // Save current playback position before closing
      try {
        const currentTime = await playerRef.current.getCurrentTime();
        previousTimeRef.current = currentTime;
      } catch (e) {
        // If getCurrentTime fails, keep existing previousTimeRef value
      }
      playerRef.current.pause();
    }
    setGalleryOpen(false);
  };

  const handlePlayButtonClick = () => {
    setHasStartedPlaying(true);
    setGalleryOpen(true);
  };

  return (
    <>
      {/* Gallery View */}
      {galleryOpen ? (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          {/* Close Button */}
          <button
            onClick={handleCloseGallery}
            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-colors"
            data-testid="button-close-gallery"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Video Section */}
          <div className="flex-1 flex items-center justify-center px-8 pt-16 pb-8">
            <div className="w-full max-w-6xl">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  ref={iframeRef}
                  src={`https://player.vimeo.com/video/1132843812?title=0&byline=0&portrait=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="px-8 pb-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Project Timeline</h2>
                
                <div ref={timelineRef} className="relative overflow-hidden" style={{ height: '456px' }}>
                  <motion.div 
                    className="space-y-3 pt-2"
                    animate={{ y: scrollOffset }}
                    transition={{
                      duration: useManualScroll ? 0 : (manualClick ? 0 : 0.7),
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                  >
                    {displaySegments.map((segment, index) => {
                      const isActive = currentSegment?.id === segment.id;
                      const isExpanded = expandedSegmentId === segment.id;
                      
                      return (
                        <div
                          key={`${segment.id}-${index}`}
                          className={`transition-all duration-300 rounded-lg overflow-hidden ${
                            isActive ? 'bg-accent/20 border-2 border-accent' : 'bg-gray-700/50 border border-gray-600'
                          }`}
                        >
                        <button
                          onClick={() => handleSegmentClick(segment)}
                          className="w-full text-left p-4 hover:bg-gray-700/70 transition-colors"
                          data-testid={`segment-${segment.id}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 flex-1">
                              <span className={`text-sm font-mono ${
                                isActive ? 'text-accent font-bold' : 'text-gray-400'
                              }`}>
                                {formatTime(segment.startTime)}–{formatTime(segment.endTime)}
                              </span>
                              <h3 className={`text-lg font-semibold ${
                                isActive ? 'text-white' : 'text-gray-200'
                              }`}>
                                {segment.title}
                              </h3>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              {isActive && (
                                <span className="flex items-center space-x-2 text-accent text-sm">
                                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                  <span className="hidden sm:inline">Playing</span>
                                </span>
                              )}
                              <svg
                                className={`w-5 h-5 text-gray-400 transition-transform ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </button>
                        
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-2 border-t border-gray-600">
                            <p className="text-gray-300 leading-relaxed">
                              {segment.description}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Normal Page View */
        <section className="relative bg-gray-900 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                VFX Reel
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A comprehensive showcase of visual effects work spanning compositing, rotoscoping, 
                beauty retouching, and advanced VFX across commercial and narrative projects.
              </p>
            </div>

            {/* Video Player Preview */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                {!hasStartedPlaying ? (
                  <>
                    {/* Vimeo Thumbnail */}
                    <img
                      src="https://vumbnail.com/1132843812.jpg"
                      alt="VFX Reel Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    {/* Play Button Overlay */}
                    <button
                      onClick={handlePlayButtonClick}
                      className="absolute inset-0 flex items-center justify-center group"
                      data-testid="button-play-video"
                    >
                      <div className="w-24 h-24 rounded-full bg-accent/90 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-accent shadow-2xl">
                        <Play className="w-12 h-12 text-white fill-white ml-1" />
                      </div>
                    </button>
                  </>
                ) : (
                  <iframe
                    ref={iframeRef}
                    src={`https://player.vimeo.com/video/1132843812?title=0&byline=0&portrait=0`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>

            {/* Interactive Timeline - Normal View (Scrollable List) */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Project Timeline</h2>
                
                <div className="relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 space-y-3 pr-2" style={{ height: '456px' }}>
                  {vfxReelData.segments.map((segment) => {
                    const isExpanded = expandedSegmentId === segment.id;
                    
                    return (
                      <div
                        key={segment.id}
                        className="transition-all duration-300 rounded-lg overflow-hidden bg-gray-700/50 border border-gray-600"
                      >
                      <button
                        onClick={() => setExpandedSegmentId(expandedSegmentId === segment.id ? null : segment.id)}
                        className="w-full text-left p-4 hover:bg-gray-700/70 transition-colors"
                        data-testid={`segment-${segment.id}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <span className="text-sm font-mono text-gray-400">
                              {formatTime(segment.startTime)}–{formatTime(segment.endTime)}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-200">
                              {segment.title}
                            </h3>
                          </div>
                          
                          <svg
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 border-t border-gray-600">
                          <p className="text-gray-300 leading-relaxed">
                            {segment.description}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}