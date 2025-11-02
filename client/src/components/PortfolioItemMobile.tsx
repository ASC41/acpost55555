import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import StaticThumbnailMobile from "./StaticThumbnailMobile";
import SimpleVideoPlayerMobile from "./SimpleVideoPlayerMobile";
import { portfolioData } from "@/lib/portfolio-data";

interface VideoAsset {
  videoUrl: string;
  thumbnailUrl: string;
  aspectRatio?: "video" | "square" | "portrait" | "ultrawide" | "wide";
  title?: string;
  subtitle?: string;
  description?: string | string[];
  role?: string;
  client?: string;
  clientUrl?: string;
  agency?: { name: string; url?: string };
  productionCompany?: { name: string; url?: string };
  additionalCredits?: Array<{ title: string; name: string; url?: string }>;
  externalLinks?: Array<{ title: string; url: string }>;
  tags?: string[];
}

interface PortfolioItemMobileProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PortfolioItemMobile({ id, isOpen, onClose }: PortfolioItemMobileProps) {
  const [isVideoLightboxOpen, setIsVideoLightboxOpen] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  
  const dialogRef = useRef<HTMLDivElement>(null);

  const item = portfolioData.find((item: any) => item.id === id);
  
  if (!item) return null;

  const { 
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
    tags, 
    additionalCredits, 
    externalLinks,
    assets 
  } = item;

  // Get video assets
  const videoAssets: VideoAsset[] = assets ? assets.filter(asset => asset.videoUrl) : [];
  if (loopVideoUrl && videoAssets.length === 0) {
    videoAssets.push({
      videoUrl: loopVideoUrl,
      thumbnailUrl: stillImageUrl || "",
      aspectRatio: "video"
    });
  }

  const handleVideoExpand = (index: number) => {
    setVideoIndex(index);
    setIsVideoLightboxOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsVideoLightboxOpen(false);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center p-4">
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full"
            data-testid="button-close-portfolio"
          >
            <X size={20} />
          </button>

          <div className="overflow-y-auto max-h-[90vh]">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-lg text-white/80">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                {client && (
                  <div>
                    <span className="text-sm font-medium text-white/70">Client:</span>
                    {clientUrl ? (
                      <a 
                        href={clientUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {client}
                      </a>
                    ) : (
                      <span className="ml-2 text-white">{client}</span>
                    )}
                  </div>
                )}
                
                {agency && (
                  <div>
                    <span className="text-sm font-medium text-white/70">Agency:</span>
                    {agency.url ? (
                      <a 
                        href={agency.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {agency.name}
                      </a>
                    ) : (
                      <span className="ml-2 text-white">{agency.name}</span>
                    )}
                  </div>
                )}

                {productionCompany && (
                  <div>
                    <span className="text-sm font-medium text-white/70">Production Company:</span>
                    {productionCompany.url ? (
                      <a 
                        href={productionCompany.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {productionCompany.name}
                      </a>
                    ) : (
                      <span className="ml-2 text-white">{productionCompany.name}</span>
                    )}
                  </div>
                )}

                {role && (
                  <div>
                    <span className="text-sm font-medium text-white/70">Role:</span>
                    <span className="ml-2 text-white">{role}</span>
                  </div>
                )}

                {description && (
                  <div>
                    <span className="text-sm font-medium text-white/70">Description:</span>
                    <p className="mt-2 text-white/90 leading-relaxed">{description}</p>
                  </div>
                )}

                {additionalCredits && additionalCredits.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-white/70">Additional Credits:</span>
                    <div className="mt-2 space-y-1">
                      {additionalCredits.map((credit, i) => (
                        <div key={i} className="text-sm">
                          <span className="text-white/60">{credit.title}:</span>
                          {credit.url ? (
                            <a 
                              href={credit.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              {credit.name}
                            </a>
                          ) : (
                            <span className="ml-2 text-white">{credit.name}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {externalLinks && externalLinks.length > 0 && (
                  <div className="flex flex-col space-y-3">
                    {externalLinks.map((link, i) => (
                      <a 
                        key={i}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 hover:text-white transition-all duration-300 text-sm font-medium"
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

              {/* Video Thumbnails - Mobile Optimized */}
              {videoAssets.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Videos</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {videoAssets.map((asset, index) => {
                      // Only show asset description if it's different from main description
                      const mainDesc = Array.isArray(description) ? description.join(' ') : description;
                      const assetDesc = Array.isArray(asset.description) ? asset.description.join(' ') : asset.description;
                      const showAssetDescription = assetDesc && assetDesc !== mainDesc;
                      
                      return (
                        <div key={index} className="space-y-4">
                          {/* Video Description - only if unique */}
                          {showAssetDescription && (
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <h4 className="text-lg font-semibold text-white mb-2">
                                {asset.subtitle || `Video ${index + 1}`}
                              </h4>
                              <p className="text-white/80 text-sm leading-relaxed">
                                {assetDesc}
                              </p>
                            </div>
                          )}
                        
                        {/* Video Thumbnail */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden">
                          <StaticThumbnailMobile
                            videoUrl={asset.videoUrl}
                            thumbnailUrl=""
                            aspectRatio={asset.aspectRatio}
                            onExpand={() => handleVideoExpand(index)}
                            title={asset.subtitle}
                          />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Simple Video Player - Mobile optimized */}
      <SimpleVideoPlayerMobile
        videos={videoAssets}
        initialIndex={videoIndex}
        isOpen={isVideoLightboxOpen}
        onClose={() => setIsVideoLightboxOpen(false)}
        onIndexChange={setVideoIndex}
      />
    </>
  );
}