import { useState, useEffect } from "react";
import { getCachedVimeoThumbnail } from "@/lib/vimeo-utils";

interface VideoThumbnailProps {
  videoUrl: string;
  thumbnailUrl: string;
  aspectRatio?: "video" | "square" | "portrait" | "ultrawide" | "wide";
  onExpand?: () => void;
  onThumbnailLoaded?: (thumbnailUrl: string) => void;
}

export default function VideoThumbnail({
  videoUrl,
  thumbnailUrl,
  aspectRatio = "video",
  onExpand,
  onThumbnailLoaded
}: VideoThumbnailProps) {
  const [dynamicThumbnail, setDynamicThumbnail] = useState<string | null>(thumbnailUrl || null);
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(!thumbnailUrl && !!videoUrl);
  const [videoError, setVideoError] = useState(false);

  // Fetch thumbnail if thumbnailUrl is empty but videoUrl exists
  useEffect(() => {
    async function fetchThumbnail() {
      if (!thumbnailUrl && videoUrl && videoUrl.trim() !== '') {
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
            // Try Vimeo
            thumbnail = await getCachedVimeoThumbnail(videoUrl);

          }
          
          if (thumbnail) {
            setDynamicThumbnail(thumbnail);
            onThumbnailLoaded?.(thumbnail);
          }
        } catch (error) {

        } finally {
          setIsLoadingThumbnail(false);
        }
      }
    }

    fetchThumbnail();
  }, [videoUrl, thumbnailUrl, onThumbnailLoaded]);

  // Calculate aspect ratio
  const getAspectRatio = (ratio: string) => {
    switch (ratio) {
      case "ultrawide": return "2.4/1";
      case "wide": return "1.55/1";
      case "portrait": return "4/5"; // Changed from 9/16 to 4/5 for 600x750 videos
      case "square": return "1/1";
      case "video": return "16/9";
      default: return "16/9";
    }
  };

  // Show loading state while fetching thumbnail
  if (isLoadingThumbnail) {
    return (
      <div 
        className="relative w-full overflow-hidden rounded-lg bg-gray-800 flex items-center justify-center" 
        style={{ aspectRatio: getAspectRatio(aspectRatio) }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/40"></div>
      </div>
    );
  }

  // If no videoUrl, render as static image
  if (!videoUrl || videoUrl.trim() === '') {
    return (
      <div 
        className="relative w-full overflow-hidden rounded-lg bg-black" 
        style={{ aspectRatio: getAspectRatio(aspectRatio) }}
      >
        {dynamicThumbnail ? (
          <img 
            src={dynamicThumbnail} 
            alt="Project asset" 
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: 'center center' }}
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white/60 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Handle video error state
  if (videoError) {
    return (
      <div 
        className="relative w-full overflow-hidden rounded-lg bg-gray-800 flex items-center justify-center" 
        style={{ aspectRatio: getAspectRatio(aspectRatio) }}
      >
        <div className="text-center text-white/60">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <p className="text-sm">Video temporarily unavailable</p>
        </div>
      </div>
    );
  }

  // Main video player with thumbnail - ALWAYS show thumbnail, never ReactPlayer
  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-black cursor-pointer" 
      style={{ aspectRatio: getAspectRatio(aspectRatio) }}
      onClick={() => {
        if (onExpand) {
          onExpand();
        }
      }}
    >
      {dynamicThumbnail ? (
        <img 
          src={dynamicThumbnail} 
          alt="Video thumbnail" 
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: 'center center' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="text-center text-white/60">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-sm">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}