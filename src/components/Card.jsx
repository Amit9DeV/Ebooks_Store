import React, { useState } from "react";
import { ShoppingCart, Star, Heart, Share2, Info } from "lucide-react";

function Card({ book }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800/50 shadow-md hover:shadow-xl transition-all duration-300 h-[450px] animate-fade-in">
      {/* Quick Action Buttons */}
      <div className="absolute right-4 z-20 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-full group-hover:translate-x-0">
        <button 
          className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform ${isLiked ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
        <button className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform">
          <Share2 className="w-4 h-4" />
        </button>
        <button 
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute right-16 top-20 z-30 bg-black text-white text-sm rounded-lg py-2 px-4 max-w-[200px]">
          Click to view detailed information about this book
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-black"></div>
        </div>
      )}

      {/* New Badge */}
      <div className="absolute top-4 left-4 z-10 animate-fade-in-down">
        <div className="badge badge-primary shadow-lg">NEW</div>
      </div>

      {/* Price Badge */}
      <div className="absolute top-4 right-4 z-10 animate-fade-in-down">
        <div className="badge badge-secondary font-semibold shadow-lg">
          {book.price === 0 ? "FREE" : `₹${book.price}`}
        </div>
      </div>

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-900/50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          loading="lazy"
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
          src={book.image}
          alt={book.name}
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors duration-300">
          {book.name}
        </h2>

        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-4 h-4 fill-current text-yellow-400 transform hover:scale-125 transition-transform cursor-pointer"
                strokeWidth={0}
              />
            ))}
          </div>
          <span className="font-medium">(4.5)</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Available Now
          </div>
          <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform group">
            <ShoppingCart className="w-4 h-4 transform group-hover:rotate-12 transition-transform" />
            <span className="relative">
              {book.price === 0 ? "Get Now" : "Buy Now"}
              <span className="absolute inset-x-0 -bottom-px h-px bg-white/70 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Add these styles to your CSS */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out forwards;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Card;
