import { useState, useRef, useEffect, useMemo } from "react";
import { ReactPlayer } from "@/components/ui/react-player";
import VideoThumbnail from "./VideoThumbnail";
import ImageLightbox from "./ImageLightbox";
import VideoLightbox from "./VideoLightbox";
import RollodexCarousel from "./RollodexCarousel";
import Gallery3D from "./Gallery3D";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface ProjectAsset {
  videoUrl: string;
  thumbnailUrl: string;
  aspectRatio?: "video" | "square" | "portrait" | "ultrawide" | "wide";
  // Optional metadata overrides for multi-video portfolios
  title?: string;
  subtitle?: string;
  description?: string[] | string;
  role?: string;
  client?: string;
  clientUrl?: string;
  agency?: {
    name: string;
    url?: string;
  };
  productionCompany?: {
    name: string;
    url?: string;
  };
  additionalCredits?: Array<{
    title: string;
    name: string;
    url?: string;
  }>;
  externalLinks?: Array<{
    title: string;
    url: string;
  }>;
  tags?: string[];
}

interface PortfolioItemProps {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  stillImageUrl: string;
  loopVideoUrl: string;
  client?: string;
  clientUrl?: string;
  agency?: {
    name: string;
    url?: string;
  };
  productionCompany?: {
    name: string;
    url?: string;
  };
  role: string;
  description: string[] | string;
  additionalCredits?: Array<{
    title: string;
    name: string;
    url?: string;
  }>;
  externalLinks?: Array<{
    title: string;
    url: string;
  }>;
  assets: ProjectAsset[];
  isExpanded?: boolean;
  onToggleExpand: (id: string) => void;
  expandedItemId?: string | null;
  overlayImageUrl?: string;
  stackedLayout?: boolean;
  category?: string;
}

export default function PortfolioItem({
  id,
  index,
  title,
  subtitle,
  stillImageUrl,
  loopVideoUrl,
  client,
  clientUrl,
  agency,
  productionCompany,
  role,
  description,
  additionalCredits,
  externalLinks,
  assets,
  isExpanded,
  onToggleExpand,
  expandedItemId,
  overlayImageUrl,
  stackedLayout,
  category = 'Portfolio',
}: PortfolioItemProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [secondBatchReady, setSecondBatchReady] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const isMobileDevice = window.innerWidth < 768 || 'ontouchstart' in window;
        setIsMobile(isMobileDevice);
      }, 100);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, [id]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPhotoGalleryExpanded, setIsPhotoGalleryExpanded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isVideoLightboxOpen, setIsVideoLightboxOpen] = useState(false);
  const [videoLightboxVideos, setVideoLightboxVideos] = useState<ProjectAsset[]>([]);
  const [videoLightboxIndex, setVideoLightboxIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [mariposasDuration, setMariposasDuration] = useState(0);
  // Function to disable YouTube captions programmatically
  const handleYouTubeReady = () => {
    try {
      // Find the YouTube iframe in this portfolio item
      const iframe = containerRef.current?.querySelector('iframe');
      if (iframe && iframe.src.includes('youtube.com')) {
        // Use the YouTube Player API to disable captions
        const ytPlayer = (iframe as any).contentWindow;
        if (ytPlayer && ytPlayer.postMessage) {
          // Disable captions via YouTube API commands
          ytPlayer.postMessage('{"event":"command","func":"unloadModule","args":["captions"]}', '*');
          ytPlayer.postMessage('{"event":"command","func":"setOption","args":["captions","track",{}]}', '*');
        }
      }
    } catch (error) {
      // Silently handle any errors with caption disabling
    }
  };

  // Define video assets first before using them
  const videoAssets = assets.filter(asset => asset.videoUrl && asset.videoUrl.trim() !== '');
  const photoAssets = assets.filter(asset => !asset.videoUrl && asset.thumbnailUrl);

  // Compute effective metadata based on current video index
  const getEffectiveMetadata = () => {
    const currentAsset = videoAssets[currentVideoIndex];
    if (!currentAsset) {
      return {
        effectiveTitle: title,
        effectiveSubtitle: subtitle,
        effectiveDescription: description,
        effectiveRole: role,
        effectiveClient: client,
        effectiveAgency: agency,
        effectiveProductionCompany: productionCompany,
        effectiveAdditionalCredits: additionalCredits,
        effectiveExternalLinks: externalLinks
      };
    }
    
    return {
      effectiveTitle: currentAsset.title || title,
      effectiveSubtitle: currentAsset.subtitle || subtitle,
      effectiveDescription: currentAsset.description || description,
      effectiveRole: currentAsset.role || role,
      effectiveClient: currentAsset.client || client,
      effectiveAgency: currentAsset.agency || agency,
      effectiveProductionCompany: currentAsset.productionCompany || productionCompany,
      effectiveAdditionalCredits: currentAsset.additionalCredits || additionalCredits,
      effectiveExternalLinks: currentAsset.externalLinks || externalLinks
    };
  };

  // Custom variant switching for slack-combined panel
  const [variantIndex, setVariantIndex] = useState(0);
  
  // Reset variant index when panel is closed/opened
  useEffect(() => {
    if (!isExpanded) {
      setVariantIndex(0);
    }
  }, [isExpanded]);

  // Get effective metadata based on current video index or variant
  const getMetadataForDisplay = () => {
    if ((id === 'slack-combined' || id === 'nintendo') && videoAssets[variantIndex]) {
      const currentAsset = videoAssets[variantIndex];
      return {
        effectiveTitle: currentAsset.title || title,
        effectiveSubtitle: currentAsset.subtitle || subtitle,
        effectiveDescription: currentAsset.description || description,
        effectiveRole: currentAsset.role || role,
        effectiveClient: currentAsset.client || client,
        effectiveAgency: currentAsset.agency || agency,
        effectiveProductionCompany: currentAsset.productionCompany || productionCompany,
        effectiveAdditionalCredits: currentAsset.additionalCredits || additionalCredits,
        effectiveExternalLinks: currentAsset.externalLinks || externalLinks
      };
    } else {
      return getEffectiveMetadata();
    }
  };

  const {
    effectiveTitle,
    effectiveSubtitle,
    effectiveDescription,
    effectiveRole,
    effectiveClient,
    effectiveAgency,
    effectiveProductionCompany,
    effectiveAdditionalCredits,
    effectiveExternalLinks
  } = getMetadataForDisplay();

  // Compute preview subtitle for cards with multiple videos
  const getPreviewSubtitle = () => {
    if (videoAssets.length === 2) {
      const secondAsset = videoAssets[1];
      if (secondAsset && secondAsset.subtitle && secondAsset.subtitle !== subtitle) {
        return `${subtitle} & ${secondAsset.subtitle}`;
      }
    }
    return subtitle;
  };

  const previewSubtitle = getPreviewSubtitle();

  // Handle video expansion for Royal Canin
  const handleVideoExpand = (index: number) => {
    setVideoLightboxVideos(videoAssets);
    setVideoLightboxIndex(index);
    setCurrentVideoIndex(index);
    setIsVideoLightboxOpen(true);
  };

  // Handle ESC key when modal is open
  useEffect(() => {
    if (isExpanded) {
      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onToggleExpand(id);
        }
      };
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [isExpanded, id, onToggleExpand]);

  const entry = useIntersectionObserver(containerRef, { 
    threshold: 0, 
    rootMargin: "250px 0px" 
  });
  
  // Desktop: Staggered loading - first 4 videos load immediately, next 4 load when #3 comes into view
  // Mobile: Videos only play when in viewport to save bandwidth
  const isInViewport = !!entry?.isIntersecting;
  
  // Trigger second batch loading when video #3 comes into viewport
  useEffect(() => {
    if (index === 3 && isInViewport && !isMobile) {
      setSecondBatchReady(true);
    }
  }, [index, isInViewport, isMobile]);
  
  // Determine if this video should play based on staggered loading
  const shouldPlayVideo = () => {
    if (isMobile) return isInViewport; // Mobile: viewport-based
    if (index <= 4) return true; // Desktop: first 4 videos load immediately
    return secondBatchReady || isInViewport; // Desktop: next 4 wait for trigger or viewport
  };
  
  const videoShouldPlay = shouldPlayVideo();

  const descriptionParagraphs = Array.isArray(effectiveDescription) ? effectiveDescription : [effectiveDescription];

  // Helper function to determine if this panel should be hidden
  const shouldHidePanel = () => {
    if (!expandedItemId || expandedItemId === id) return false;

    const panelOrder = [
      'pmg', 'lowes-foods', 'pge', 'royal-canin', 'advil', 'olaplex', 
      'tractor-supply', 'marriott', 'nike-soccer', 'hhgregg', 'subway'
    ];

    const expandedIndex = panelOrder.indexOf(expandedItemId);
    const currentIndex = panelOrder.indexOf(id);

    if (expandedIndex === -1 || currentIndex === -1) return false;
    return currentIndex > expandedIndex;
  };

  if (shouldHidePanel()) return null;

  const renderHeroVideo = () => {
    // Special case: SyFy on mobile should show thumbnail instead of video
    if (id === "syfy-magicians" && isMobile) {
      return (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <img 
            src="https://i.vimeocdn.com/video/1122520400_640x360.jpg"
            alt="SyFy Channel - The Magicians preview"
            className="w-full h-full object-cover"
          />
        </div>
      );
    }



    // Handle AT&T Social Media special case - double the 1x1 video to fill 16:9
    if (id === "att-social") {
      return (
        <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
          <div className="flex h-full max-h-full" style={{ aspectRatio: '2/1', maxHeight: '100%' }}>
            <div className="w-1/2 h-full relative">
              <ReactPlayer
                url={loopVideoUrl}
                playing={videoShouldPlay}
                muted={true}
                loop
                playsinline
                width="100%"
                height="100%"
                config={{
                  vimeo: {
                    playerOptions: {
                      muted: true,
                      controls: false,
                      responsive: true,
                      dnt: true,
                      background: true,
                      autoplay: videoShouldPlay
                    }
                  }
                }}
                onReady={() => setVideoReady(true)}
                className="absolute inset-0"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="w-1/2 h-full relative">
              <ReactPlayer
                url={loopVideoUrl}
                playing={videoShouldPlay}
                muted={true}
                loop
                playsinline
                width="100%"
                height="100%"
                config={{
                  vimeo: {
                    playerOptions: {
                      muted: true,
                      controls: false,
                      responsive: true,
                      dnt: true,
                      background: true,
                      autoplay: videoShouldPlay
                    }
                  }
                }}
                className="absolute inset-0"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      );
    }

    if (id === "thermacare") {
      return (
        <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
          <div className="flex h-full max-h-full" style={{ aspectRatio: '2/1', maxHeight: '100%' }}>
            <div className="w-1/2 h-full relative">
              <ReactPlayer
                url={loopVideoUrl}
                playing={(videoShouldPlay || isExpanded)}
                muted={true}
                loop
                playsinline
                width="100%"
                height="100%"
                config={{
                  vimeo: {
                    playerOptions: {
                      muted: true,
                      controls: false,
                      responsive: true,
                      dnt: true,
                      background: true,
                      autoplay: (videoShouldPlay || isExpanded)
                    }
                  }
                }}
                onReady={() => setVideoReady(true)}
                className="absolute inset-0"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="w-1/2 h-full relative">
              <ReactPlayer
                url={loopVideoUrl}
                playing={(videoShouldPlay || isExpanded)}
                muted={true}
                loop
                playsinline
                width="100%"
                height="100%"
                config={{
                  vimeo: {
                    playerOptions: {
                      muted: true,
                      controls: false,
                      responsive: true,
                      dnt: true,
                      background: true,
                      autoplay: (videoShouldPlay || isExpanded)
                    }
                  }
                }}
                className="absolute inset-0"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      );
    }

    if (id === "adidas") {
      // Check if we have a 16x9 video (new format) or 9x16 videos (old triptych format)
      const isWideVideo = loopVideoUrl.includes('358919780'); // The new 16x9 video
      
      if (isWideVideo) {
        // Show single 16x9 video properly sized
        return (
          <div className="flex w-full h-full items-center justify-center bg-black overflow-hidden">
            <div className="w-full h-full relative" style={{ aspectRatio: '16/9' }}>
              <ReactPlayer
                url={loopVideoUrl}
                playing={videoShouldPlay}
                muted={true}
                loop
                playsinline
                width="100%"
                height="100%"
                config={{
                  vimeo: {
                    playerOptions: {
                      muted: true,
                      controls: false,
                      responsive: true,
                      dnt: true,
                      autoplay: videoShouldPlay
                    }
                  }
                }}
                onReady={() => setVideoReady(true)}
                className="absolute inset-0"
                style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
              />
            </div>
          </div>
        );
      } else {
        // Show triptych layout for 9x16 videos
        return (
          <div className="flex w-full h-full items-center justify-center bg-black overflow-hidden">
            <div className="flex h-full max-h-full" style={{ aspectRatio: '27/16', maxHeight: '100%' }}>
              {[0, 1, 2].map((index) => (
                <div key={index} className="relative bg-black flex-1" style={{ aspectRatio: '9/16', height: '100%', maxHeight: '100%' }}>
                  <ReactPlayer
                    url={loopVideoUrl}
                    playing={videoShouldPlay}
                    muted={true}
                    loop
                    playsinline
                    width="100%"
                    height="100%"
                    config={{
                      vimeo: {
                        playerOptions: {
                          muted: true,
                          controls: false,
                          responsive: true,
                          dnt: true,
                          autoplay: videoShouldPlay
                        }
                      }
                    }}
                    onReady={() => setVideoReady(true)}
                    className="absolute inset-0"
                    style={{ objectFit: isMobile ? 'contain' : 'cover', position: 'absolute', top: 0, left: 0 }}
                  />
                  {index < 2 && <div className="absolute top-0 right-0 w-px h-full bg-black/20 z-10" />}
                </div>
              ))}
            </div>
          </div>
        );
      }
    }



    // For mobile 16:9 videos, create dual layer: background (cropped) + foreground (contained)
    if (isMobile) {
      return (
        <>
          {/* Background layer - 16:9 video cropped to fill screen */}
          <ReactPlayer
            url={loopVideoUrl}
            playing={isInViewport}
            muted={true}
            loop
            playsinline
            width="100%"
            height="100%"
            config={{
              vimeo: {
                playerOptions: {
                  muted: true,
                  controls: false,
                  responsive: true,
                  dnt: true,
                  background: true,
                  autoplay: isInViewport
                }
              },
              youtube: {
                playerVars: {
                  mute: 1,
                  controls: 0,
                  showinfo: 0,
                  rel: 0,
                  loop: 1,
                  modestbranding: 1,
                  cc_load_policy: 0,
                  enablejsapi: 1,
                  iv_load_policy: 3,
                  disablekb: 1,
                  fs: 0
                }
              }
            }}
            onReady={() => {
              handleYouTubeReady();
              setVideoReady(true);
            }}
            className="absolute inset-0"
            style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
          />
          {/* Foreground layer - 16:9 video properly contained */}
          <ReactPlayer
            url={loopVideoUrl}
            playing={isInViewport}
            muted={true}
            loop
            playsinline
            width="100%"
            height="100%"
            config={{
              vimeo: {
                playerOptions: {
                  muted: true,
                  controls: false,
                  responsive: true,
                  dnt: true,
                  background: true,
                  autoplay: isInViewport
                }
              },
              youtube: {
                playerVars: {
                  mute: 1,
                  controls: 0,
                  showinfo: 0,
                  rel: 0,
                  loop: 1,
                  modestbranding: 1,
                  cc_load_policy: 0,
                  enablejsapi: 1,
                  iv_load_policy: 3,
                  disablekb: 1,
                  fs: 0
                }
              }
            }}
            onReady={handleYouTubeReady}
            className="absolute inset-0"
            style={{ objectFit: 'contain', position: 'absolute', top: 0, left: 0, zIndex: 2 }}
          />
        </>
      );
    }

    // Special handling for Mariposas - loop after 1 minute to avoid credits
    if (id === "mariposas") {
      return (
        <ReactPlayer
          url={loopVideoUrl}
          playing={videoShouldPlay}
          muted={true}
          loop={false} // Disable default loop to handle manually
          playsinline
          width="100%"
          height="100%"
          onProgress={(state) => {
            // Restart video after 60 seconds to avoid credits
            if (state.playedSeconds >= 60) {
              // Use the internal player method to seek back to start
              const playerElement = document.querySelector(`[data-testid="portfolio-item-${id}"] iframe`);
              if (playerElement && (playerElement as any).contentWindow) {
                try {
                  // For Vimeo, we can use postMessage to seek to beginning
                  (playerElement as any).contentWindow.postMessage('{"method":"setCurrentTime","value":0}', '*');
                } catch (e) {
                  // Fallback - reload the component by toggling visibility
                  setTimeout(() => {
                    const videoElement = document.querySelector(`[data-testid="portfolio-item-${id}"] video`);
                    if (videoElement) {
                      (videoElement as HTMLVideoElement).currentTime = 0;
                    }
                  }, 100);
                }
              }
            }
          }}
          config={{
            vimeo: {
              playerOptions: {
                muted: true,
                controls: false,
                responsive: true,
                dnt: true,
                background: true,
                autoplay: videoShouldPlay
              }
            },
            youtube: {
              playerVars: {
                mute: 1,
                controls: 0,
                showinfo: 0,
                rel: 0,
                loop: 0, // Disable YouTube loop to handle manually
                modestbranding: 1,
                cc_load_policy: 0,
                enablejsapi: 1
              }
            }
          }}
          onReady={() => {
            handleYouTubeReady();
            setVideoReady(true);
          }}
          className="absolute inset-0"
          style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
        />
      );
    }

    // Show fallback for missing or invalid video URLs
    if (!loopVideoUrl || loopVideoUrl === "" || loopVideoUrl.includes('placeholder')) {
      return (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          {stillImageUrl && stillImageUrl !== "" && !stillImageUrl.includes('f.io') ? (
            <img 
              src={stillImageUrl} 
              alt={`${effectiveTitle} preview`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-white/60">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-lg font-medium">{effectiveTitle}</p>
              <p className="text-sm opacity-80">Click to explore</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <ReactPlayer
        url={loopVideoUrl}
        playing={videoShouldPlay}
        muted={true}
        loop
        playsinline
        width="100%"
        height="100%"
        config={{
          vimeo: {
            playerOptions: {
              muted: true,
              controls: false,
              responsive: true,
              dnt: true,
              autoplay: videoShouldPlay
            }
          },
          youtube: {
            playerVars: {
              mute: 1,
              controls: 0,
              showinfo: 0,
              rel: 0,
              loop: 1,
              modestbranding: 1,
              cc_load_policy: 0,
              enablejsapi: 1
            }
          }
        }}
        onReady={() => {
          handleYouTubeReady();
          setVideoReady(true);
        }}
        className="absolute inset-0"
        style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      />
    );
  };

  const renderAssetGrid = (aspectRatio: string, assets: ProjectAsset[], title: string, gridCols: string = "grid-cols-1") => (
    <div className="space-y-4">
      <h5 className="text-lg font-medium text-white/90 border-b border-white/20 pb-2">{effectiveTitle}</h5>
      <div className={`grid ${gridCols} gap-4`}>
        {assets.map((asset, index) => {
          const actualIndex = asset.videoUrl ? videoAssets.findIndex(video => video.videoUrl === asset.videoUrl) : index;
          const isImage = !asset.videoUrl && asset.thumbnailUrl;
          
          return (
            <div 
              key={`${aspectRatio}-${isImage ? 'img' : 'vid'}-${index}`} 
              className="cursor-pointer group"
              onClick={() => {
                if (isImage) {
                  // Handle image lightbox
                  const imageAssets = assets.filter(a => !a.videoUrl && a.thumbnailUrl);
                  const imageUrls = imageAssets.map(a => a.thumbnailUrl);
                  const currentImageIndex = imageAssets.findIndex(a => a.thumbnailUrl === asset.thumbnailUrl);
                  setLightboxImages(imageUrls);
                  setLightboxIndex(currentImageIndex);
                  setIsLightboxOpen(true);
                } else {
                  // Handle video lightbox
                  setVideoLightboxVideos([asset]);
                  setVideoLightboxIndex(0);
                  setIsVideoLightboxOpen(true);
                }
              }}
            >
              <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl" 
                   style={{ aspectRatio: 
                     aspectRatio === 'ultrawide' ? '2.4/1' : 
                     aspectRatio === 'wide' ? '16/9' : 
                     aspectRatio === 'portrait' ? (
                       asset.videoUrl ? '4/5' : // Portrait videos use 4:5 (600x750)
                       asset.thumbnailUrl?.includes('9x16') ? '9/16' : // Images with 9x16 in filename stay 9:16
                       '4/5' // Other portrait images use 4:5
                     ) : 
                     aspectRatio === 'multilanguage' ? (
                       asset.aspectRatio === 'square' ? '1/1' : 
                       asset.thumbnailUrl?.includes('9x16') ? '9/16' : 
                       '4/5'
                     ) : 
                     asset.aspectRatio === 'video' || aspectRatio === 'video' ? '16/9' : 
                     '1/1' }}>
                {isImage ? (
                  <img
                    src={asset.thumbnailUrl}
                    alt=""
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: 'center center' }}
                  />
                ) : (
                  <VideoThumbnail
                    videoUrl={asset.videoUrl}
                    thumbnailUrl={asset.thumbnailUrl}
                    aspectRatio={asset.aspectRatio}
                    onExpand={() => {
                      setVideoLightboxVideos([asset]);
                      setVideoLightboxIndex(0);
                      setIsVideoLightboxOpen(true);
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <div className={`${(aspectRatio === 'portrait' || aspectRatio === 'multilanguage') ? 'w-8 h-8' : 'w-12 h-12'} bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center`}>
                      <svg className={`${(aspectRatio === 'portrait' || aspectRatio === 'multilanguage') ? 'w-4 h-4' : 'w-6 h-6'} text-white ml-0.5`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderVideoSection = () => {
    if (videoAssets.length === 0) return null;

    // Use Gallery3D for specific projects with multiple videos
    if (["pmg", "lowes-foods", "advil", "enigma-labs", "mtv-champs", "adidas", "thermacare"].includes(id) && videoAssets.length > 1) {
      // Use horizontal scrolling for Enigma Labs, MTV, Lowe's Foods, PMG, Adidas, Advil, and Thermacare; vertical for others
      const scrollDirection = (id === "enigma-labs" || id === "mtv-champs" || id === "lowes-foods" || id === "pmg" || id === "adidas" || id === "advil" || id === "thermacare") ? "horizontal" : "vertical";
      return <Gallery3D assets={videoAssets} projectId={id} scrollDirection={scrollDirection} />;
    }

    // Special layouts for Olaplex and Royal Canin
    if (id === "olaplex") {
      const ultrawideVideos = videoAssets.filter(asset => asset.aspectRatio === 'ultrawide');
      const wideVideos = videoAssets.filter(asset => asset.aspectRatio === 'wide');
      const portraitVideos = videoAssets.filter(asset => asset.aspectRatio === 'portrait');
      
      // Get ALL square and portrait still images (non-video assets) for multilanguage section
      const multilanguageStills = assets.filter(asset => 
        !asset.videoUrl && 
        asset.thumbnailUrl && 
        (asset.aspectRatio === 'square' || asset.aspectRatio === 'portrait')
      );

      return (
        <div className="space-y-8">
          <div className="space-y-6">
            {ultrawideVideos.length > 0 && renderAssetGrid('ultrawide', ultrawideVideos, 'Ultra-Wide Videos (2880x1200)')}
            {wideVideos.length > 0 && renderAssetGrid('wide', wideVideos, 'Wide Videos', 'grid-cols-1 lg:grid-cols-2')}
            {portraitVideos.length > 0 && renderAssetGrid('portrait', portraitVideos, 'Portrait Videos', 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4')}
            {multilanguageStills.length > 0 && renderAssetGrid('multilanguage', multilanguageStills, 'Multilanguage DOOH Stills', 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4')}
          </div>
        </div>
      );
    }

    if (id === "att-social") {
      const wideVideos = videoAssets.filter(asset => asset.aspectRatio === 'video');
      const squareVideos = videoAssets.filter(asset => asset.aspectRatio === 'square');

      return (
        <div className="space-y-8">
          <h4 className="text-xl font-semibold text-white mb-6">Safe Driving Campaign Videos</h4>
          <div className="space-y-8">
            {/* 16:9 Videos */}
            {wideVideos.length > 0 && (
              <div>
                <h5 className="text-lg font-medium text-white/80 mb-4">Wide Format Videos (16:9)</h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {wideVideos.map((asset, index) => {
                    const actualIndex = videoAssets.indexOf(asset);
                    return (
                      <div 
                        key={`wide-${actualIndex}`} 
                        className="group cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleVideoExpand(actualIndex);
                        }}
                      >
                        <VideoThumbnail
                          videoUrl={asset.videoUrl}
                          thumbnailUrl={asset.thumbnailUrl}
                          aspectRatio={asset.aspectRatio}
                          onExpand={() => handleVideoExpand(actualIndex)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Square Videos */}
            {squareVideos.length > 0 && (
              <div>
                <h5 className="text-lg font-medium text-white/80 mb-4">Social Media Posts (1:1)</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {squareVideos.map((asset, index) => {
                    const actualIndex = videoAssets.indexOf(asset);
                    return (
                      <div 
                        key={`square-${actualIndex}`} 
                        className="group cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleVideoExpand(actualIndex);
                        }}
                      >
                        <VideoThumbnail
                          videoUrl={asset.videoUrl}
                          thumbnailUrl={asset.thumbnailUrl}
                          aspectRatio={asset.aspectRatio}
                          onExpand={() => handleVideoExpand(actualIndex)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (id === "royal-canin") {
      const wideVideos = videoAssets.filter(asset => asset.aspectRatio === 'video');
      const squareVideos = videoAssets.filter(asset => asset.aspectRatio === 'square');
      const portraitVideos = videoAssets.filter(asset => asset.aspectRatio === 'portrait');

      return (
        <div className="space-y-8">
          <h4 className="text-xl font-semibold text-white mb-6">Campaign Videos</h4>
          <div className="space-y-8">
            {/* TVC Videos */}
            {wideVideos.length > 0 && (
              <div>
                <h5 className="text-lg font-medium text-white/80 mb-4">TVC & Wide Format Videos (16:9)</h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {wideVideos.map((asset, index) => {
                    const actualIndex = videoAssets.indexOf(asset);
                    return (
                      <div 
                        key={`tvc-${actualIndex}`} 
                        className="group cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleVideoExpand(actualIndex);
                        }}
                      >
                        <VideoThumbnail
                          videoUrl={asset.videoUrl}
                          thumbnailUrl={asset.thumbnailUrl}
                          aspectRatio={asset.aspectRatio}
                          onExpand={() => handleVideoExpand(actualIndex)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Square Videos */}
            {squareVideos.length > 0 && (
              <div>
                <h5 className="text-lg font-medium text-white/80 mb-4">Social Media Posts (4:5)</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {squareVideos.map((asset, index) => {
                    const actualIndex = videoAssets.indexOf(asset);
                    return (
                      <div 
                        key={`square-${actualIndex}`} 
                        className="group cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleVideoExpand(actualIndex);
                        }}
                      >
                        <VideoThumbnail
                          videoUrl={asset.videoUrl}
                          thumbnailUrl={asset.thumbnailUrl}
                          aspectRatio={asset.aspectRatio}
                          onExpand={() => handleVideoExpand(actualIndex)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Portrait Videos */}
            {portraitVideos.length > 0 && (
              <div>
                <h5 className="text-lg font-medium text-white/80 mb-4">Stories & Reels (9:16)</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {portraitVideos.map((asset, index) => {
                    const actualIndex = videoAssets.indexOf(asset);
                    return (
                      <div 
                        key={`portrait-${actualIndex}`} 
                        className="group cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleVideoExpand(actualIndex);
                        }}
                      >
                        <VideoThumbnail
                          videoUrl={asset.videoUrl}
                          thumbnailUrl={asset.thumbnailUrl}
                          aspectRatio={asset.aspectRatio}
                          onExpand={() => handleVideoExpand(actualIndex)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (id === "pge") {
      const wideVideos = videoAssets.filter(asset => asset.aspectRatio === 'video');
      const squareVideos = videoAssets.filter(asset => asset.aspectRatio === 'square');
      const portraitVideos = videoAssets.filter(asset => asset.aspectRatio === 'portrait');

      return (
        <div className="space-y-8">
          <h4 className="text-xl font-semibold text-white mb-6">Campaign Videos</h4>
          <div className="space-y-8">
            {/* Wide Videos */}
            {wideVideos.length > 0 && (
              <div>
                <h5 className="text-lg font-medium text-white/80 mb-4">TVC & Awareness Videos (16:9)</h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {wideVideos.map((asset, index) => {
                    const actualIndex = videoAssets.indexOf(asset);
                    return (
                      <div 
                        key={`wide-${actualIndex}`} 
                        className="group cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleVideoExpand(actualIndex);
                        }}
                      >
                        <VideoThumbnail
                          videoUrl={asset.videoUrl}
                          thumbnailUrl={asset.thumbnailUrl}
                          aspectRatio={asset.aspectRatio}
                          onExpand={() => handleVideoExpand(actualIndex)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Square Videos */}
            {squareVideos.length > 0 && (
              <div>
                <h5 className="text-lg font-medium text-white/80 mb-4">Social Media Posts (1:1)</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {squareVideos.map((asset, index) => {
                    const actualIndex = videoAssets.indexOf(asset);
                    return (
                      <div 
                        key={`square-${actualIndex}`} 
                        className="group cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleVideoExpand(actualIndex);
                        }}
                      >
                        <VideoThumbnail
                          videoUrl={asset.videoUrl}
                          thumbnailUrl={asset.thumbnailUrl}
                          aspectRatio={asset.aspectRatio}
                          onExpand={() => handleVideoExpand(actualIndex)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Portrait Videos */}
            {portraitVideos.length > 0 && (
              <div>
                <h5 className="text-lg font-medium text-white/80 mb-4">Stories & Reels (9:16)</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {portraitVideos.map((asset, index) => {
                    const actualIndex = videoAssets.indexOf(asset);
                    return (
                      <div 
                        key={`portrait-${actualIndex}`} 
                        className="group cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleVideoExpand(actualIndex);
                        }}
                      >
                        <VideoThumbnail
                          videoUrl={asset.videoUrl}
                          thumbnailUrl={asset.thumbnailUrl}
                          aspectRatio={asset.aspectRatio}
                          onExpand={() => handleVideoExpand(actualIndex)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Standard video carousel
    return (
      <div className="space-y-6">
        <div className="relative w-full max-w-4xl mx-auto">
          <div 
            className="relative overflow-hidden rounded-lg bg-gray-800 shadow-2xl cursor-pointer group"
            style={{ aspectRatio: '16/9' }}
            onClick={() => {
              setVideoLightboxVideos(videoAssets);
              setVideoLightboxIndex(currentVideoIndex);
              setIsVideoLightboxOpen(true);
            }}
          >
            <VideoThumbnail
              videoUrl={videoAssets[currentVideoIndex]?.videoUrl}
              thumbnailUrl={videoAssets[currentVideoIndex]?.thumbnailUrl}
              aspectRatio="video"
              onExpand={() => {
                setVideoLightboxVideos(videoAssets);
                setVideoLightboxIndex(currentVideoIndex);
                setIsVideoLightboxOpen(true);
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {videoAssets.length > 1 && (
          <div className="flex flex-col items-center space-y-4 mt-6">
            <div className="flex space-x-2">
              {videoAssets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentVideoIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setCurrentVideoIndex(Math.max(0, currentVideoIndex - 1))}
                disabled={currentVideoIndex === 0}
                className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center space-x-2 text-white/80 font-medium">
                <span>{currentVideoIndex + 1}</span>
                <span>/</span>
                <span>{videoAssets.length}</span>
              </div>
              <button
                onClick={() => setCurrentVideoIndex(Math.min(videoAssets.length - 1, currentVideoIndex + 1))}
                disabled={currentVideoIndex === videoAssets.length - 1}
                className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Mobile-only stacked video layout
  if (isMobile) {
    const isMobileVisible = !!entry?.isIntersecting; // Separate mobile visibility logic
    return (
      <>
        <div className="relative bg-gray-900" data-index={index} data-testid={`portfolio-item-${id}`}>
          {/* Video Stack - Dynamic aspect ratio based on content */}
          <div className={`relative w-full bg-black overflow-hidden ${(id === 'advil' || id === 'adidas') ? 'aspect-[9/16]' : 'aspect-[16/9]'}`}>
            {loopVideoUrl && loopVideoUrl !== "" && !loopVideoUrl.includes('placeholder') ? (
              <ReactPlayer
                url={loopVideoUrl}
                playing={isMobileVisible}
                muted
                loop
                playsinline
                width="100%"
                height="100%"
                config={{
                  vimeo: {
                    playerOptions: {
                      muted: true,
                      controls: false,
                      responsive: true,
                      dnt: true,
                      background: true,
                      quality: 'auto'
                    }
                  },
                  youtube: {
                    playerVars: {
                      mute: 1,
                      controls: 0,
                      showinfo: 0,
                      rel: 0,
                      loop: 1,
                      modestbranding: 1,
                      cc_load_policy: 0,
                      iv_load_policy: 3,
                      disablekb: 1,
                      fs: 0,
                      playsinline: 1
                    }
                  }
                }}
                className="w-full h-full"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                {stillImageUrl && stillImageUrl !== "" && !stillImageUrl.includes('f.io') ? (
                  <img 
                    src={stillImageUrl} 
                    alt={`${effectiveTitle} preview`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-white/60">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-lg font-medium">{effectiveTitle}</p>
                    <p className="text-sm opacity-80">Tap to explore</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Lower Third Navigation Bar */}
            <div className="absolute bottom-0 left-0 right-0">
              <button 
                className="w-full px-6 py-4 bg-black/70 backdrop-blur-sm text-white text-left transition-all duration-300 hover:bg-black/90"
                onClick={() => onToggleExpand(id)}
              >
                <div className="text-lg font-playfair font-bold" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{effectiveTitle}</div>
                <div className="text-sm text-white/90 mt-1" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>{effectiveSubtitle}</div>
                <div className="text-xs text-white/70 mt-1" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>Tap to explore</div>
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Modal (unchanged) */}
        {isExpanded && (
          <div 
            className="fixed inset-0 z-50 bg-black overflow-y-auto"
            onClick={() => onToggleExpand(id)}
          >
            <div 
              className="relative min-h-screen bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="fixed top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                onClick={() => onToggleExpand(id)}
                aria-label="Close project details"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <div className="px-8 py-16">
                <div className="grid grid-cols-1 gap-12 max-w-7xl mx-auto">
                  {/* Project Details */}
                  <div className="space-y-8">
                    <h3 className="font-playfair text-3xl font-bold mb-6 text-white">{effectiveTitle}</h3>

                    <div className="mb-8">
                      {effectiveAgency && (
                        <div className="mb-4">
                          <p className="text-sm uppercase tracking-wider text-white/70 mb-1">Creative Agency</p>
                          <p>
                            {effectiveAgency.url ? (
                              <a href={effectiveAgency.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                                {effectiveAgency.name}
                              </a>
                            ) : (
                              <span className="portfolio-text-white font-medium">{effectiveAgency.name}</span>
                            )}
                          </p>
                        </div>
                      )}

                      {effectiveProductionCompany && (
                        <div className="mb-4">
                          <p className="text-sm uppercase tracking-wider text-white/70 mb-1">Production Company</p>
                          <p>
                            {effectiveProductionCompany.url ? (
                              <a href={effectiveProductionCompany.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                                {effectiveProductionCompany.name}
                              </a>
                            ) : (
                              <span className="portfolio-text-white font-medium">{effectiveProductionCompany.name}</span>
                            )}
                          </p>
                        </div>
                      )}

                      <div className="mb-4">
                        <p className="text-sm uppercase tracking-wider text-white/70 mb-1">Role</p>
                        <p className="portfolio-text-white font-medium">{effectiveRole}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {descriptionParagraphs.map((paragraph, index) => (
                        <p key={index} className="portfolio-text-white leading-relaxed text-base">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {effectiveAdditionalCredits && effectiveAdditionalCredits.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-white/90 text-lg">Additional Credits</h4>
                        {effectiveAdditionalCredits.map((credit, index) => (
                          <div key={index}>
                            <p className="text-sm uppercase tracking-wider text-white/70">{credit.title}</p>
                            <p>
                              {credit.url ? (
                                <a href={credit.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                                  {credit.name}
                                </a>
                              ) : (
                                <span className="portfolio-text-white">{credit.name}</span>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {effectiveExternalLinks && effectiveExternalLinks.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-white/90 text-lg">Links</h4>
                        {effectiveExternalLinks.map((link, index) => (
                          <div key={index}>
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-accent hover:text-accent/80 transition-colors inline-flex items-center"
                            >
                              {link.title}
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Video Gallery Section */}
                  <div className="space-y-8">
                    {(id === "syfy-magicians" || id === "fortnite-travis-scott") ? (
                      <RollodexCarousel videos={assets} projectId={id} />
                    ) : (
                      renderVideoSection()
                    )}

                    {/* Photo Gallery Section */}
                    {photoAssets.length > 0 && (
                      <div className={`space-y-6 ${videoAssets.length > 0 ? 'mt-12' : ''}`}>
                        <div className="grid grid-cols-2 gap-4">
                          {photoAssets.map((asset, index) => (
                            <div
                              key={index}
                              className="cursor-pointer group"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const allPhotoUrls = photoAssets.map(photo => photo.thumbnailUrl);
                                setLightboxImages(allPhotoUrls);
                                setLightboxIndex(index);
                                setIsLightboxOpen(true);
                              }}
                            >
                              <img
                                src={asset.thumbnailUrl}
                                alt=""
                                className="w-full h-full object-cover object-center rounded-lg"
                                style={{ aspectRatio: '1/1' }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop layout (unchanged)
  return (
    <>
      <div className="relative bg-gray-900 portfolio-panel overflow-hidden" data-index={index} data-testid={`portfolio-item-${id}`}>
        <div 
          ref={containerRef}
          className="relative aspect-[16/9] overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => onToggleExpand(id)}
        >
          {stillImageUrl && !stillImageUrl.includes('f.io/WcTfKP9H') && (
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${videoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <img 
                src={stillImageUrl} 
                alt={effectiveTitle} 
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center center' }}
              />
            </div>
          )}

          <div className={`absolute inset-0 h-full overflow-hidden ${id === 'syfy-magicians' ? 'w-screen -left-8' : 'w-full'}`}>
            {renderHeroVideo()}
            
            {/* Festival Laurel Overlay */}
            {overlayImageUrl && (
              <div className="absolute top-4 right-4 z-20">
                <img 
                  src={overlayImageUrl} 
                  alt="Festival Laurel"
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
                />
              </div>
            )}

            <div className="absolute bottom-0 left-0 w-full p-4 pb-8 sm:p-6 lg:p-10 lg:pb-10">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold tracking-tight mb-2 text-white" 
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  {effectiveTitle}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl font-light text-white/90" 
                   style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                  {previewSubtitle}
                </p>

                <div className={`transition-all duration-500 transform mt-4 sm:mt-6 lg:mt-8 ${isMobile || isHovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex items-center space-x-4 sm:space-x-6 text-white">
                    <button 
                      className="group/btn px-6 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl transform transition-all duration-500 hover:bg-white/25 hover:scale-105 hover:shadow-3xl cursor-pointer touch-manipulation"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleExpand(id);
                      }}
                      aria-label="Explore project details"
                    >
                      <span className="mr-2 sm:mr-3 text-sm sm:text-base lg:text-lg font-medium tracking-wide transition-all duration-300 group-hover/btn:tracking-wider text-white" 
                            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Explore Now</span>
                      <svg className="w-5 h-5 inline-block transform transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24"
                           style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>

                    {id === 'walmart' && (
                      <div className="flex items-center">
                        <img 
                          src="https://clios.com/wp-content/themes/cliotheme/theme/assets/images/winner_badge_bronze.png"
                          alt="Clio Bronze Award Winner"
                          className="w-16 h-16 object-contain"
                          style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div 
                className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent 
                           transition-opacity duration-700 ease-out pointer-events-none
                           ${isMobile || isHovering ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 bg-black overflow-y-auto"
          onClick={() => onToggleExpand(id)}
        >
          <div 
            className="relative min-h-screen sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-screen bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="fixed top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={() => onToggleExpand(id)}
              aria-label="Close project details"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="px-8 py-16">
              <div className={`${stackedLayout ? "max-w-4xl mx-auto space-y-12" : "grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto"}`}>
                {/* Project Details */}
                <div className={`space-y-8 ${stackedLayout ? "text-center" : ""}`}>
                  <h3 className={`font-playfair font-bold mb-6 text-white ${stackedLayout ? "text-4xl lg:text-5xl" : "text-3xl"}`}>{effectiveTitle}</h3>
                  {stackedLayout && (
                    <p className="text-xl lg:text-2xl text-white/90 mb-8">{subtitle}</p>
                  )}

                  <div className="mb-8">
                    {stackedLayout ? (
                      (() => {
                        const creditsCount = [effectiveClient, effectiveAgency, effectiveProductionCompany, true].filter(Boolean).length;
                        const gridCols = creditsCount === 1 ? "grid-cols-1" : creditsCount === 2 ? "grid-cols-2" : "grid-cols-3";
                        
                        return (
                          <div className={`grid ${gridCols} gap-8 max-w-3xl mx-auto justify-items-center`}>
                            {effectiveClient && (
                              <div className="text-center">
                                <p className="text-sm uppercase tracking-wider text-white/70 mb-2">Client</p>
                                <p>
                                  {clientUrl ? (
                                    <a href={clientUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors font-medium">
                                      {effectiveClient}
                                    </a>
                                  ) : (
                                    <span className="text-white font-medium">{effectiveClient}</span>
                                  )}
                                </p>
                              </div>
                            )}

                            {effectiveAgency && (
                              <div className="text-center">
                                <p className="text-sm uppercase tracking-wider text-white/70 mb-2">Creative Agency</p>
                                <p>
                                  {effectiveAgency.url ? (
                                    <a href={effectiveAgency.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors font-medium">
                                      {effectiveAgency.name}
                                    </a>
                                  ) : (
                                    <span className="text-white font-medium">{effectiveAgency.name}</span>
                                  )}
                                </p>
                              </div>
                            )}

                            {effectiveProductionCompany && (
                              <div className="text-center">
                                <p className="text-sm uppercase tracking-wider text-white/70 mb-2">Production Company</p>
                                <p>
                                  {effectiveProductionCompany.url ? (
                                    <a href={effectiveProductionCompany.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors font-medium">
                                      {effectiveProductionCompany.name}
                                    </a>
                                  ) : (
                                    <span className="text-white font-medium">{effectiveProductionCompany.name}</span>
                                  )}
                                </p>
                              </div>
                            )}

                            <div className="text-center">
                              <p className="text-sm uppercase tracking-wider text-white/70 mb-2">Role</p>
                              <p className="text-white font-medium">{effectiveRole}</p>
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <>
                        {effectiveClient && (
                          <div className="mb-4">
                            <p className="text-sm uppercase tracking-wider text-white/70 mb-1">Client</p>
                            <p>
                              {clientUrl ? (
                                <a href={clientUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                                  {effectiveClient}
                                </a>
                              ) : (
                                <span className="text-white font-medium">{effectiveClient}</span>
                              )}
                            </p>
                          </div>
                        )}

                        {effectiveAgency && (
                          <div className="mb-4">
                            <p className="text-sm uppercase tracking-wider text-white/70 mb-1">Creative Agency</p>
                            <p>
                              {effectiveAgency.url ? (
                                <a href={effectiveAgency.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                                  {effectiveAgency.name}
                                </a>
                              ) : (
                                <span className="portfolio-text-white font-medium">{effectiveAgency.name}</span>
                              )}
                            </p>
                          </div>
                        )}

                        {effectiveProductionCompany && (
                          <div className="mb-4">
                            <p className="text-sm uppercase tracking-wider text-white/70 mb-1">Production Company</p>
                            <p>
                              {effectiveProductionCompany.url ? (
                                <a href={effectiveProductionCompany.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                                  {effectiveProductionCompany.name}
                                </a>
                              ) : (
                                <span className="portfolio-text-white font-medium">{effectiveProductionCompany.name}</span>
                              )}
                            </p>
                          </div>
                        )}

                        <div className="mb-4">
                          <p className="text-sm uppercase tracking-wider text-white/70 mb-1">Role</p>
                          <p className="text-white">{effectiveRole}</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className={`mb-8 ${stackedLayout ? "max-w-3xl mx-auto" : ""}`}>
                    {descriptionParagraphs.map((paragraph, i) => (
                      <p key={i} className={`text-white/80 leading-relaxed mb-4 ${stackedLayout ? "text-lg" : ""}`}>
                        {paragraph}
                      </p>
                    ))}

                    {effectiveAdditionalCredits && effectiveAdditionalCredits.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {effectiveAdditionalCredits.map((credit, i) => (
                          <p key={i} className="text-white/80">
                            {credit.title}:{' '}
                            {credit.url ? (
                              <a href={credit.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                                {credit.name}
                              </a>
                            ) : (
                              <span className="text-white font-medium">{credit.name}</span>
                            )}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {effectiveExternalLinks && effectiveExternalLinks.length > 0 && (
                    <div className="flex flex-col space-y-3">
                      {effectiveExternalLinks.map((link, i) => (
                        <a 
                          key={i}
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 hover:text-white transition-all duration-300 text-sm font-medium shadow-lg backdrop-blur-sm"
                        >
                          {link.title}
                          <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Media Section */}
                <div className="space-y-8">
                  {(id === "syfy-magicians" || id === "fortnite-travis-scott") ? (
                    <RollodexCarousel videos={assets} projectId={id} />
                  ) : (
                    renderVideoSection()
                  )}

                  {/* Photo Gallery Section */}
                  {photoAssets.length > 0 && (
                    <div className={`space-y-6 ${videoAssets.length > 0 ? 'mt-12' : ''}`}>
                      {id === "olaplex" ? (
                        <>
                          {/* Olaplex special photo grid implementation would go here */}
                          {(() => {
                            const ultraWideAssets = photoAssets.filter(asset => asset.aspectRatio === 'ultrawide');
                            if (ultraWideAssets.length === 0) return null;

                            return (
                              <div className="space-y-4">
                                <h5 className="text-lg font-medium text-white/90 border-b border-white/20 pb-2">Ultra-Wide Banners (2880x1200)</h5>
                                <div className="grid grid-cols-1 gap-4">
                                  {ultraWideAssets.map((asset, index) => {
                                    const actualIndex = photoAssets.findIndex(photo => photo.thumbnailUrl === asset.thumbnailUrl);
                                    return (
                                      <div
                                        key={`ultrawide-${actualIndex}`}
                                        className="cursor-pointer group"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          const allPhotoUrls = photoAssets.map(photo => photo.thumbnailUrl);
                                          setLightboxImages(allPhotoUrls);
                                          setLightboxIndex(actualIndex);
                                          setIsLightboxOpen(true);
                                        }}
                                      >
                                        <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl" style={{ aspectRatio: '2.4/1' }}>
                                          <img
                                            src={asset.thumbnailUrl}
                                            alt={`Ultra-wide banner ${index + 1}`}
                                            className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                                            loading="lazy"
                                          />
                                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                                              <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                              </svg>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })()}

                          {(() => {
                            const wideAssets = photoAssets.filter(asset => asset.aspectRatio === 'wide' || asset.aspectRatio === 'video');
                            if (wideAssets.length === 0) return null;

                            return (
                              <div className="space-y-4">
                                <h5 className="text-lg font-medium text-white/90 border-b border-white/20 pb-2">Wide Banners</h5>
                                <div className="grid grid-cols-1 gap-4">
                                  {wideAssets.map((asset, index) => {
                                    const actualIndex = photoAssets.findIndex(photo => photo.thumbnailUrl === asset.thumbnailUrl);
                                    return (
                                      <div
                                        key={`wide-${actualIndex}`}
                                        className="cursor-pointer group"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          const allPhotoUrls = photoAssets.map(photo => photo.thumbnailUrl);
                                          setLightboxImages(allPhotoUrls);
                                          setLightboxIndex(actualIndex);
                                          setIsLightboxOpen(true);
                                        }}
                                      >
                                        <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl" style={{ aspectRatio: '16/9' }}>
                                          <img
                                            src={asset.thumbnailUrl}
                                            alt={`Wide banner ${index + 1}`}
                                            className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                                            loading="lazy"
                                          />
                                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                                              <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                              </svg>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })()}


                        </>
                      ) : (
                        <>
                          <div className="masonry-grid gap-3">
                            {(isPhotoGalleryExpanded ? photoAssets : photoAssets.slice(0, 8)).map((asset, displayIndex) => {
                              const actualIndex = photoAssets.findIndex(photo => photo.thumbnailUrl === asset.thumbnailUrl);
                              return (
                                <div 
                                  key={`photo-${actualIndex}`} 
                                  className="masonry-item cursor-pointer group"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const allPhotoUrls = photoAssets.map(photo => photo.thumbnailUrl);
                                    setLightboxImages(allPhotoUrls);
                                    setLightboxIndex(actualIndex);
                                    setIsLightboxOpen(true);
                                  }}
                                >
                                  <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
                                    <img
                                      src={asset.thumbnailUrl}
                                      alt={`Portfolio image ${actualIndex + 1}`}
                                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                                      loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                                        <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {photoAssets.length > 8 && (
                            <div className="flex justify-center mt-8">
                              <button 
                                onClick={() => setIsPhotoGalleryExpanded(!isPhotoGalleryExpanded)}
                                className="px-8 py-4 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 hover:text-white transition-colors font-medium"
                              >
                                {isPhotoGalleryExpanded ? 'Show Less' : `View All ${photoAssets.length} Photos`}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center pt-8 pb-8">
                <button 
                  className="inline-flex items-center px-8 py-4 rounded-full bg-white hover:bg-gray-100 transition-colors font-medium shadow-lg"
                  onClick={() => onToggleExpand(id)}
                  style={{ color: 'black' }}
                >
                  <span style={{ color: 'black' }}>Close Project</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ImageLightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />

      <VideoLightbox
        videos={videoLightboxVideos}
        initialIndex={videoLightboxIndex}
        isOpen={isVideoLightboxOpen}
        onClose={() => setIsVideoLightboxOpen(false)}
        onIndexChange={(index) => setCurrentVideoIndex(index)}
      />
    </>
  );
}