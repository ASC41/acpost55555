import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { vfxReelData } from "@/lib/portfolio-data";

export default function VFXMobile() {
  const [expandedSegmentId, setExpandedSegmentId] = useState<string | null>(null);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = "VFX Reel | AC POST Portfolio";
  }, []);

  const handlePlayButtonClick = () => {
    setHasStartedPlaying(true);
  };

  const handleSegmentToggle = (segmentId: string) => {
    setExpandedSegmentId(expandedSegmentId === segmentId ? null : segmentId);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-800 to-gray-900 pt-20 pb-8 px-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            VFX Reel
          </h1>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Visual effects work spanning compositing, rotoscoping, beauty retouching, and advanced VFX
          </p>
        </div>
      </section>

      {/* Video Player */}
      <section className="px-4 pb-6">
        <div className="max-w-4xl mx-auto">
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
                  data-testid="button-play-video-mobile"
                >
                  <div className="w-20 h-20 rounded-full bg-accent/90 flex items-center justify-center transition-transform group-active:scale-95 shadow-2xl">
                    <Play className="w-10 h-10 text-white fill-white ml-1" />
                  </div>
                </button>
              </>
            ) : (
              <iframe
                src={`https://player.vimeo.com/video/1132843812?title=0&byline=0&portrait=0&autoplay=1`}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </section>

      {/* Project Timeline */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Project Timeline</h2>
            
            <div className="space-y-2">
              {vfxReelData.segments.map((segment) => {
                const isExpanded = expandedSegmentId === segment.id;
                
                return (
                  <div
                    key={segment.id}
                    className="transition-all duration-300 rounded-lg overflow-hidden bg-gray-700/50 border border-gray-600"
                  >
                    <button
                      onClick={() => handleSegmentToggle(segment.id)}
                      className="w-full text-left p-3 active:bg-gray-700/70 transition-colors"
                      data-testid={`segment-${segment.id}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono flex-shrink-0 text-gray-400">
                              {formatTime(segment.startTime)}–{formatTime(segment.endTime)}
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-gray-200">
                            {segment.title}
                          </h3>
                        </div>
                        
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
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
                      <div className="px-3 pb-3 pt-1 border-t border-gray-600">
                        <p className="text-sm text-gray-300 leading-relaxed">
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
      </section>
    </div>
  );
}
