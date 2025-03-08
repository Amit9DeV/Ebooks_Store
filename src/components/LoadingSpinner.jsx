import React, { useState, useEffect } from 'react';
import { BookOpen, BookOpenCheck, BookCopy, BookUp, BookMarked } from 'lucide-react';

export default function LoadingSpinner() {
  const [loadingMessage, setLoadingMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingMessages = [
    "Preparing your literary journey...",
    "Dusting off the book covers...",
    "Organizing the shelves...",
    "Bookmarking the best stories...",
    "Almost ready for your reading adventure..."
  ];

  const bookIcons = [
    <BookOpen className="w-full h-full text-primary" />,
    <BookOpenCheck className="w-full h-full text-primary" />,
    <BookCopy className="w-full h-full text-primary" />,
    <BookUp className="w-full h-full text-primary" />,
    <BookMarked className="w-full h-full text-primary" />
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setLoadingMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center max-w-md px-4">
        {/* Book Icon Carousel */}
        <div className="relative mb-8">
          <div className="w-24 h-24 relative animate-float mx-auto">
            {bookIcons[loadingMessage]}
            {/* Ripple Effects */}
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-ping"></div>
            <div className="absolute inset-0 border-4 border-primary/10 rounded-full animate-ping-slow"></div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-pulse">
          Loading amazing books...
        </h2>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4 relative">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
          </div>
          <div className="absolute -top-6 right-0 text-sm text-primary font-medium">
            {progress}%
          </div>
        </div>

        {/* Loading Messages */}
        <div className="h-6"> {/* Fixed height to prevent layout shift */}
          <p className="text-gray-600 dark:text-gray-300 animate-fade-up">
            {loadingMessages[loadingMessage]}
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-1 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-fade-up {
          animation: fade-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 