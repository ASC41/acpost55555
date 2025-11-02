// Utility functions for working with Vimeo API
export interface VimeoThumbnail {
  base_link: string;
  default_picture: boolean;
  height: number;
  link: string;
  link_with_play_button: string;
  width: number;
}

export interface VimeoVideoData {
  name: string;
  description: string;
  pictures: {
    sizes: VimeoThumbnail[];
  };
}

// Extract video ID from various Vimeo URL formats
export function extractVimeoId(url: string): string | null {
  // For URLs with tokens, return the full path including token
  const tokenMatch = url.match(/vimeo\.com\/(\d+\/[a-zA-Z0-9]+)/);
  if (tokenMatch) {
    return tokenMatch[1];
  }

  // For public videos, just return the ID
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

// Extract just the numeric video ID 
export function extractVimeoNumericId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

// Fetch video data from Vimeo oEmbed API (no auth required)
export async function getVimeoThumbnail(videoUrl: string): Promise<string | null> {
  try {
    const numericId = extractVimeoNumericId(videoUrl);
    if (!numericId) return null;

    // Try oEmbed API using the original URL (works for both public and private videos)
    try {
      const encodedUrl = encodeURIComponent(videoUrl);
      const oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodedUrl}`;
      const response = await fetch(oembedUrl, { 
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.thumbnail_url) {
          return data.thumbnail_url;
        }
      }
    } catch (error) {
      // Continue to fallback
    }

    // Fallback: try basic direct thumbnail URL (works for public videos)
    const fallbackUrl = `https://i.vimeocdn.com/video/${numericId}_640x360.jpg`;
    
    // Test if fallback URL works
    try {
      const testResponse = await fetch(fallbackUrl, { method: 'HEAD' });
      if (testResponse.ok) {
        return fallbackUrl;
      }
    } catch {
      // Fallback failed
    }

    return null;
  } catch (error) {
    return null;
  }
}

// Cache thumbnails to avoid repeated API calls
const thumbnailCache = new Map<string, string | null>();

export async function getCachedVimeoThumbnail(videoUrl: string): Promise<string | null> {
  if (thumbnailCache.has(videoUrl)) {
    return thumbnailCache.get(videoUrl) || null;
  }

  const thumbnail = await getVimeoThumbnail(videoUrl);
  thumbnailCache.set(videoUrl, thumbnail);
  return thumbnail;
}