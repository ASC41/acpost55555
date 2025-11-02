import { useState } from "react";
import { useLocation } from "wouter";

interface ScrollingTextProps {
  onFilterClick?: (filter: string) => void;
  activeFilter?: string | null;
}

export default function ScrollingText({ onFilterClick, activeFilter }: ScrollingTextProps) {
  const [, setLocation] = useLocation();
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const words = [
    { text: "EDITING", filter: "editing", page: null },
    { text: "VFX", filter: "vfx", page: null },
    { text: "MO GFX", filter: "motion-graphics", page: null },
    { text: "COLOR", filter: "color", page: null },
    { text: "SOUND DESIGN", filter: "sound-design", page: null },
    { text: "DIRECTING", filter: "directing", page: null },
    { text: "SHORTS", filter: "shorts", page: null },
    { text: "MUSIC VIDEOS", filter: "music-videos", page: null }
  ];

  // Create seamless repeating text for each line
  const createRepeatingText = (startOffset: number = 0) => {
    const rotatedWords = [...words.slice(startOffset), ...words.slice(0, startOffset)];
    const textWithDots = rotatedWords.map(w => w.text).join(" • ");
    // Create seamless loop - repeat exactly 3 times for smooth transitions
    const repeatedText = textWithDots + " • " + textWithDots + " • " + textWithDots + " • ";
    return { 
      text: repeatedText,
      words: [...rotatedWords, ...rotatedWords, ...rotatedWords]
    };
  };

  const lines = [
    { ...createRepeatingText(0), direction: "left" },
    { ...createRepeatingText(2), direction: "right" },
    { ...createRepeatingText(4), direction: "left" },
    { ...createRepeatingText(6), direction: "right" }
  ];

  const handleWordClick = (wordObj: { text: string; filter: string; page: string | null }) => {
    if (wordObj.page) {
      // Navigate to dedicated page
      setLocation(wordObj.page);
    } else if (onFilterClick && wordObj.filter) {
      // Apply inline filter
      onFilterClick(wordObj.filter);
    }
  };

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-8 overflow-hidden">
      <style>{`
        @keyframes scrollLeft {
          from { transform: translateX(0%); }
          to { transform: translateX(-33.333333%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-33.333333%); }
          to { transform: translateX(0%); }
        }
        .scroll-left {
          animation: scrollLeft 90s linear infinite;
        }
        .scroll-right {
          animation: scrollRight 90s linear infinite;
        }
        .scroll-left-delayed-1 {
          animation: scrollLeft 90s linear infinite;
          animation-delay: -22.5s;
        }
        .scroll-left-delayed-2 {
          animation: scrollLeft 90s linear infinite;
          animation-delay: -45s;
        }
        .scroll-right-delayed-1 {
          animation: scrollRight 90s linear infinite;
          animation-delay: -22.5s;
        }
        .scroll-right-delayed-2 {
          animation: scrollRight 90s linear infinite;
          animation-delay: -67.5s;
        }
        .scroll-paused {
          animation-play-state: paused;
        }
        .outline-text {
          -webkit-text-stroke: 2px white;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .filled-text {
          -webkit-text-stroke: none;
          -webkit-text-fill-color: white;
          color: white;
        }
        .dot-separator {
          display: inline-flex;
          align-items: center;
          height: 1em;
          vertical-align: middle;
        }
      `}</style>

      {lines.map((line, lineIndex) => {
        let animationClass;
        if (line.direction === 'left') {
          animationClass = lineIndex === 0 ? 'scroll-left' : 'scroll-left-delayed-2';
        } else {
          animationClass = lineIndex === 1 ? 'scroll-right-delayed-1' : 'scroll-right-delayed-2';
        }

        return (
          <div 
            key={lineIndex} 
            className="w-full mb-4 last:mb-0 overflow-hidden"
            onMouseEnter={() => setHoveredLine(lineIndex)}
            onMouseLeave={() => {
              setHoveredLine(null);
              setHoveredWord(null);
            }}
          >
            <div 
              className={`whitespace-nowrap ${animationClass} ${hoveredLine === lineIndex || activeFilter ? 'scroll-paused' : ''}`}
              style={{ 
                width: '300%',
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: '900',
                letterSpacing: '-0.02em',
                lineHeight: '0.9',
                fontFamily: 'Arial, Helvetica, sans-serif'
              }}
            >
            {line.words.map((wordObj, wordIndex) => {
              const wordKey = `${lineIndex}-${wordIndex}`;
              const isHovered = hoveredWord === wordKey;
              const isActiveFilter = activeFilter === wordObj.filter;

              return (
                <span key={wordKey} className="inline-block">
                  <span
                    className={`cursor-pointer transition-all duration-300 mr-6 ${
                      isActiveFilter ? 'filled-text bg-[#00FFFF] text-black px-2 py-1 rounded' : isHovered ? 'filled-text' : 'outline-text'
                    }`}
                    onMouseEnter={() => setHoveredWord(wordKey)}
                    onMouseLeave={() => setHoveredWord(null)}
                    onClick={() => handleWordClick(wordObj)}
                  >
                    {wordObj.text}
                  </span>
                  <span className="outline-text mr-6 dot-separator" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>•</span>
                </span>
              );
            })}
            </div>
          </div>
        );
      })}
    </div>
  );
}