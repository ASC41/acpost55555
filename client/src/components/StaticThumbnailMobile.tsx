import { useState, useEffect } from "react";
import { getCachedVimeoThumbnail } from "@/lib/vimeo-utils";

interface StaticThumbnailMobileProps {
  videoUrl: string;
  thumbnailUrl: string;
  aspectRatio?: "video" | "square" | "portrait" | "ultrawide" | "wide";
  onExpand?: () => void;
  title?: string;
}

export default function StaticThumbnailMobile({ 
  videoUrl,
  thumbnailUrl, 
  aspectRatio = "video", 
  onExpand,
  title 
}: StaticThumbnailMobileProps) {
  const [imageError, setImageError] = useState(false);
  const [dynamicThumbnail, setDynamicThumbnail] = useState<string | null>(null);
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(false);

  useEffect(() => {
    async function fetchThumbnail() {
      if (videoUrl && videoUrl.trim() !== '') {
        setIsLoadingThumbnail(true);
        try {
          let thumbnail = null;
          
          // Check if it's a Cloudinary video URL
          if (videoUrl.includes('cloudinary.com') && videoUrl.includes('video/upload')) {
            // Convert Cloudinary video URL to thumbnail image URL
            // Example: /video/upload/v1754878095/9-AutumnL_lfdwih.mp4 -> /image/upload/so_0,w_640,h_360,f_jpg/v1754878095/9-AutumnL_lfdwih.jpg
            thumbnail = videoUrl
              .replace('/video/upload/', '/image/upload/so_0,w_640,h_360,f_jpg/')
              .replace(/\.[^.]+$/, '.jpg'); // Replace file extension with .jpg
          }
          // Check if it's a YouTube URL
          else if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
            // Extract video ID and generate thumbnail URL
            const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
            const match = videoUrl.match(regex);
            if (match) {
              thumbnail = `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
            }
          } else {
            // Get Vimeo thumbnail
            thumbnail = await getCachedVimeoThumbnail(videoUrl);
          }
          
          if (thumbnail) {
            setDynamicThumbnail(thumbnail);
          }
        } catch (error) {
          // Must have a valid thumbnail - no fallbacks
        } finally {
          setIsLoadingThumbnail(false);
        }
      }
    }

    fetchThumbnail();
  }, [videoUrl, thumbnailUrl]);

  const getAspectRatio = (ratio: string) => {
    switch (ratio) {
      case "square":
        return "1/1";
      case "portrait":
        return "3/4";
      case "ultrawide":
        return "21/9";
      case "wide":
        return "4/3";
      default:
        return "16/9";
    }
  };

  // Determine which thumbnail to display - use thumbnailUrl first, then try generating from videoUrl
  const displayThumbnail = thumbnailUrl || dynamicThumbnail;

  return (
    <div 
      className="relative w-full bg-gray-800 rounded-lg overflow-hidden cursor-pointer group"
      style={{ aspectRatio: getAspectRatio(aspectRatio) }}
      onClick={() => {
        if (onExpand) {
          onExpand();
        }
      }}
    >
      {displayThumbnail && (
        <img 
          src={displayThumbnail} 
          alt={title || "Video thumbnail"} 
          className="w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      )}
      
      {isLoadingThumbnail && !displayThumbnail && (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/40"></div>
        </div>
      )}
      
      {!displayThumbnail && !isLoadingThumbnail && (
        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
          <div className="text-white/60 text-sm">Video</div>
        </div>
      )}
      
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}