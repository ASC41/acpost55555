"use client";

import * as React from "react";
import ReactPlayerLib from "react-player/lazy";

interface ReactPlayerProps {
  url: string;
  className?: string;
  playing?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  light?: boolean | string;
  width?: string | number;
  height?: string | number;
  onEnded?: () => void;
  onReady?: () => void;
  onStart?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onProgress?: (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => void;
  progressInterval?: number;
  style?: React.CSSProperties;
  playsinline?: boolean;
  config?: {
    file?: {
      attributes?: Record<string, boolean | string>;
      tracks?: any[];
      forceVideo?: boolean;
      forceAudio?: boolean;
      forceHLS?: boolean;
      forceDASH?: boolean;
      hlsOptions?: object;
      dashOptions?: object;
      flvOptions?: object;
    };
    youtube?: {
      playerVars?: Record<string, any>;
      embedOptions?: Record<string, any>;
      onUnstarted?: () => void;
    };
    vimeo?: {
      playerOptions?: Record<string, any>;
    };
  };
}

const ReactPlayer = React.forwardRef<ReactPlayerLib, ReactPlayerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={className}>
        <ReactPlayerLib
          ref={ref}
          width="100%"
          height="100%"
          playsinline
          {...props}
        />
      </div>
    );
  }
);

ReactPlayer.displayName = "ReactPlayer";

export { ReactPlayer };
export type { ReactPlayerProps };
