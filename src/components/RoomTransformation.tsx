import { useEffect, useRef, useState } from "react";
import roomPlain from "@/assets/room-plain.jpg";
import roomGood from "@/assets/room-good.jpg";
import roomBetter from "@/assets/room-better.jpg";
import roomBest from "@/assets/room-best.jpg";

const transformationStages = [
  {
    image: roomPlain,
    title: "Your Space, Uninspired?",
    description: "Every great transformation starts somewhere"
  },
  {
    image: roomGood,
    title: "A Hint of Green...",
    description: "The first touch of nature makes all the difference"
  },
  {
    image: roomBetter,
    title: "Growing Vibrancy...",
    description: "Watch your space come alive with multiple ecosystems"
  },
  {
    image: roomBest,
    title: "Your Lush Sanctuary Awaits",
    description: "The complete transformation - your personal oasis"
  }
];

export const RoomTransformation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Calculate when the container enters the viewport with better bounds
      const startScroll = containerTop - windowHeight * 0.5;
      const endScroll = containerTop + containerHeight - windowHeight * 0.5;
      const scrollRange = endScroll - startScroll;

      // Ensure progress is calculated even outside bounds for smooth start/end
      const progress = Math.min(Math.max((scrollY - startScroll) / scrollRange, 0), 1);
      setScrollProgress(progress);

      // Determine current stage based on scroll progress
      const stageIndex = Math.min(Math.floor(progress * 4), 3);
      setCurrentStage(stageIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate opacity for each image based on scroll progress
  const getImageOpacity = (index: number) => {
    // Divide scroll progress into 4 segments: 0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1.0
    const segmentSize = 0.25;
    const currentSegment = Math.floor(scrollProgress / segmentSize);
    const segmentProgress = (scrollProgress % segmentSize) / segmentSize;
    
    if (index === 0) {
      // First image: fully visible at start, fades out during first transition
      if (scrollProgress <= segmentSize) {
        return 1 - segmentProgress;
      }
      return 0;
    } else if (index === 1) {
      // Second image: fades in during first transition, fades out during second
      if (scrollProgress <= segmentSize) {
        return segmentProgress;
      } else if (scrollProgress <= segmentSize * 2) {
        return 1 - segmentProgress;
      }
      return 0;
    } else if (index === 2) {
      // Third image: fades in during second transition, fades out during third
      if (scrollProgress <= segmentSize) {
        return 0;
      } else if (scrollProgress <= segmentSize * 2) {
        return segmentProgress;
      } else if (scrollProgress <= segmentSize * 3) {
        return 1 - segmentProgress;
      }
      return 0;
    } else if (index === 3) {
      // Fourth image: fades in during third transition, stays visible
      if (scrollProgress <= segmentSize * 2) {
        return 0;
      } else if (scrollProgress <= segmentSize * 3) {
        return segmentProgress;
      }
      return 1;
    }
    return 0;
  };

  // Calculate text opacity and determine current text
  const getTextOpacity = () => {
    return scrollProgress > 0.1 ? 1 : 0;
  };

  const getCurrentTextIndex = () => {
    if (scrollProgress <= 0.25) return 0;
    if (scrollProgress <= 0.5) return 1;
    if (scrollProgress <= 0.75) return 2;
    return 3;
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[300vh] bg-gradient-to-b from-background via-muted/20 to-background"
    >
      {/* Sticky Image Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-6xl mx-auto px-4">
          {/* Image Stack */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            {transformationStages.map((stage, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-all duration-1000 ease-out"
                style={{ opacity: getImageOpacity(index) }}
              >
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="w-full h-full object-cover transition-all duration-1000 ease-out"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              </div>
            ))}
          </div>

          {/* Text Overlay */}
          <div className="absolute bottom-8 left-8 right-8 text-center">
            <div 
              className="transition-all duration-700 ease-out transform"
              style={{ 
                opacity: getTextOpacity(),
                transform: `translateY(${getTextOpacity() === 1 ? 0 : 20}px)`
              }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl transition-all duration-700 ease-out">
                {transformationStages[getCurrentTextIndex()]?.title}
              </h2>
              <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-xl transition-all duration-700 ease-out">
                {transformationStages[getCurrentTextIndex()]?.description}
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute top-8 right-8">
            <div className="flex flex-col space-y-2">
              {transformationStages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-8 rounded-full transition-all duration-700 ease-out ${
                    index <= currentStage 
                      ? "bg-botanical shadow-lg scale-110" 
                      : "bg-white/40 scale-100"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};