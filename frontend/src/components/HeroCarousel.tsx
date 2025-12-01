'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta?: {
    text: string;
    link: string;
  };
}

export default function HeroCarousel() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Define slides with images
  const slides: Slide[] = [
    {
      id: 1,
      image: '/images/hero/slide-1.jpg',
      title: t.home.slide1Title,
      subtitle: t.home.slide1Subtitle,
      cta: {
        text: t.home.getStarted,
        link: '/stores'
      }
    },
    {
      id: 2,
      image: '/images/hero/slide-2.jpg',
      title: t.home.slide2Title,
      subtitle: t.home.slide2Subtitle,
      cta: {
        text: t.home.exploreMedical,
        link: '/medical/plastic-surgery'
      }
    },
    {
      id: 3,
      image: '/images/hero/slide-3.jpg',
      title: t.home.slide3Title,
      subtitle: t.home.slide3Subtitle,
      cta: {
        text: t.home.viewPackages,
        link: '/sdm'
      }
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <div className={`relative h-full flex ${index === 0 ? 'items-start pt-16 md:pt-20' : 'items-end pb-16 md:pb-20'}`}>
            <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${index === 0 ? 'flex justify-end' : ''}`}>
              <div className={`flex flex-col ${index === 0 ? 'items-end text-right max-w-md' : 'items-start text-left max-w-2xl'}`}>
                <h1 className={`text-2xl md:text-3xl lg:text-5xl font-bold text-white drop-shadow-2xl animate-fade-in ${index === 0 ? 'mb-1.5 md:mb-2' : 'mb-3 md:mb-4'}`}>
                  {slide.title}
                </h1>
                {index === 0 && (
                  <p className="text-sm md:text-lg lg:text-xl text-white/95 drop-shadow-lg mb-2 md:mb-3">
                    {slide.subtitle}
                  </p>
                )}
                {slide.cta && (
                  <Link
                    href={slide.cta.link}
                    className="inline-flex items-center justify-center px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base lg:text-lg text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg"
                    style={{ backgroundColor: '#171b26' }}
                  >
                    {slide.cta.text} →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
