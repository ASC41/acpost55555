import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Google Analytics type declaration
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Device detection utilities
function detectMobileDevice(): boolean {
  // Check URL parameter override first
  const urlParams = new URLSearchParams(window.location.search);
  const modeParam = urlParams.get('mode');
  if (modeParam === 'mobile') return true;
  if (modeParam === 'desktop') return false;

  // Multi-signal mobile detection with priority on user agent and screen size
  const userAgentMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const smallScreen = window.innerWidth < 1024; // Increased threshold to catch tablets
  const touchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  
  // Log detection signals for debugging
  console.log('🔍 Device Detection:', {
    userAgent: navigator.userAgent,
    userAgentMobile,
    screenWidth: window.innerWidth,
    smallScreen,
    touchDevice,
    maxTouchPoints: navigator.maxTouchPoints,
    coarsePointer,
  });
  
  // More aggressive mobile detection
  if (userAgentMobile) {
    console.log('✅ Detected as MOBILE (user agent)');
    return true;
  }
  if (smallScreen && touchDevice) {
    console.log('✅ Detected as MOBILE (small screen + touch)');
    return true;
  }
  if (touchDevice && coarsePointer) {
    console.log('✅ Detected as MOBILE (touch + coarse pointer)');
    return true;
  }
  if (navigator.maxTouchPoints > 1) {
    console.log('✅ Detected as MOBILE (multi-touch)');
    return true;
  }
  
  console.log('❌ Detected as DESKTOP');
  return false;
}

function AppBootstrap() {
  // Force fresh detection on every page load - don't use cache
  const getDeviceType = (): boolean => {
    // Clear any cached value to force re-detection
    sessionStorage.removeItem('deviceType');
    
    const mobile = detectMobileDevice();
    sessionStorage.setItem('deviceType', mobile ? 'mobile' : 'desktop');
    return mobile;
  };

  const [AppComponent, setAppComponent] = useState<React.ComponentType | null>(null);
  const [isMobile] = useState(getDeviceType());

  useEffect(() => {
    // Send device type to Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('set', 'user_properties', {
        device_version: isMobile ? 'mobile' : 'desktop'
      });
      window.gtag('event', 'page_view', {
        device_type: isMobile ? 'mobile' : 'desktop'
      });
    }

    // Load app component immediately without any loading UI
    const loadApp = async () => {
      if (isMobile) {
        const { default: AppMobile } = await import('./AppMobile');
        setAppComponent(() => AppMobile);
      } else {
        const { default: AppDesktop } = await import('./AppDesktop');
        setAppComponent(() => AppDesktop);
      }
    };
    loadApp();
  }, [isMobile]);

  // Return nothing until component loads - no loading screen
  return AppComponent ? <AppComponent /> : null;
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AppBootstrap />
  </QueryClientProvider>
);