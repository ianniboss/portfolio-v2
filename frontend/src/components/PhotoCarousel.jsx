import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { COMMUNITY_MOMENTS } from "../data/portfolio";
import { useI18n } from "../context/I18nContext";

const PhotoCarousel = () => {
  const { t, locale } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const thumbnailsRef = useRef(null);

  const images = COMMUNITY_MOMENTS;

  const navigate = useCallback(
    (newDirection) => {
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + newDirection;
        if (nextIndex < 0) nextIndex = images.length - 1;
        if (nextIndex >= images.length) nextIndex = 0;
        return nextIndex;
      });
    },
    [images.length]
  );

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      navigate(-1);
    } else if (e.key === "ArrowRight") {
      navigate(1);
    }
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x;
    if (swipe < -50) {
      navigate(1); // Swipe left goes to next
    } else if (swipe > 50) {
      navigate(-1); // Swipe right goes to prev
    }
  };

  // Scroll active thumbnail into view on mobile
  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.children[currentIndex];
      if (activeThumb) {
        const containerWidth = thumbnailsRef.current.offsetWidth;
        const thumbOffset = activeThumb.offsetLeft;
        const thumbWidth = activeThumb.offsetWidth;
        thumbnailsRef.current.scrollTo({
          left: thumbOffset - containerWidth / 2 + thumbWidth / 2,
          behavior: shouldReduceMotion ? "auto" : "smooth",
        });
      }
    }
  }, [currentIndex, shouldReduceMotion]);

  if (!images || images.length === 0) return null;

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const currentImage = images[currentIndex];
  const caption = locale === "fr" ? currentImage.captionFr : currentImage.captionEn;
  const alt = locale === "fr" ? currentImage.altFr : currentImage.altEn;

  return (
    <div 
      className="mt-16 w-full max-w-5xl mx-auto focus:outline-none" 
      onKeyDown={handleKeyDown} 
      tabIndex={0} 
      aria-label="Photo carousel"
    >
      <div className="eyebrow mb-4">/ {t.experience.communityMoments}</div>
      
      {/* Main Image Container */}
      <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden bg-[var(--bg-secondary)] focus-within:ring-2 focus-within:ring-[var(--amber)]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={currentImage.image}
            alt={alt}
            custom={direction}
            variants={variants}
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : "enter"}
            animate={shouldReduceMotion ? { opacity: 1, x: 0 } : "center"}
            exit={shouldReduceMotion ? { opacity: 0, x: 0 } : "exit"}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute top-0 left-0 w-full h-full object-cover touch-pan-y cursor-grab active:cursor-grabbing"
            style={{ objectPosition: currentImage.focus || "center" }}
            loading={currentIndex === 0 ? "eager" : "lazy"}
          />
        </AnimatePresence>

        {/* Gradient Overlay for Caption */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-[1]" />

        {/* Caption */}
        <div 
          className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white text-sm md:text-base font-display drop-shadow-md z-10"
          aria-live="polite"
        >
          {caption}
        </div>

        {/* Counter */}
        <div 
          className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white font-mono text-xs md:text-sm px-3 py-1 rounded-full z-10 tracking-widest"
          aria-live="polite"
        >
          {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--amber)]"
          aria-label="Previous photo"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => navigate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--amber)]"
          aria-label="Next photo"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div 
        ref={thumbnailsRef}
        className="flex gap-2 mt-4 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {images.map((img, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={img.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`relative flex-shrink-0 snap-center rounded-md overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--amber)] ${
                isActive ? 'w-24 md:w-32 ring-2 ring-[var(--amber)]' : 'w-16 md:w-20 opacity-60 hover:opacity-100'
              } aspect-[3/2]`}
              aria-label={`Go to photo ${idx + 1}`}
              aria-current={isActive ? 'true' : 'false'}
            >
              <img
                src={img.thumb}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PhotoCarousel;
